"use client";

import { useEffect, useRef, useState } from "react";

import { RECRUMPLE_EVENT } from "./crumple-button";

/**
 * Relights the paper every frame from a light that follows the cursor.
 *
 * The normal map is a scan of real crumpled paper (ambientCG Paper003, CC0), so
 * the geometry is genuinely a photograph of flat facets meeting at sharp
 * creases. An earlier procedural Voronoi version read as CGI: its cells were
 * cone sections, which bulge, where real crumple is piecewise flat.
 *
 * Because the map stores normals rather than baked shading, light direction
 * stays a live variable. This does the Lambert term per pixel against a point
 * light hovering over the sheet: directly under the light the facets face it and
 * stay bright, further out the light rakes across the creases and they throw
 * shadow. A cheap ambient-occlusion term darkens the creases regardless of the
 * light — surfaces that fold in on themselves are always a little in shadow, and
 * without it the paper reads as plastic.
 *
 * The canvas multiplies over the paper layers beneath it. If WebGL2 is missing
 * we render nothing and the baked JPEG underneath stays visible.
 */
const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uTexSize;
uniform vec3 uLight;
uniform float uScroll;
uniform float uAmbient;
uniform float uAO;
uniform float uStrength;
uniform sampler2D uMap;
out vec4 outColor;

void main() {
  // Flip to y-down so this matches both the normal map and the DOM above it.
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  // Sampled in page space so the sheet scrolls with the content; lit in
  // viewport space so the lamp stays with the cursor.
  vec3 n = texture(uMap, (frag + vec2(0.0, uScroll)) / uTexSize).xyz * 2.0 - 1.0;
  // Exaggerate the tilt without inventing geometry: scaling xy against a fixed
  // z deepens every real crease instead of adding fake ones.
  n = normalize(vec3(n.xy * uStrength, n.z));
  vec3 L = normalize(uLight - vec3(frag, 0.0));
  float lam = max(dot(n, L), 0.0);

  // Steep normals are creases; darken them regardless of where the light is.
  // Paper folded in on itself never catches full light, and skipping this is
  // most of what makes CG surfaces look like plastic.
  float ao = mix(1.0 - uAO, 1.0, pow(clamp(n.z, 0.0, 1.0), 1.5));

  float v = (uAmbient + (1.0 - uAmbient) * lam) * ao;
  outColor = vec4(vec3(v), 1.0);
}`;

// The scan is 1024², tileable. Shown smaller than native so the facets read at
// the scale of real paper rather than a wall-sized sheet.
const TEX_PX = 720;
const AMBIENT = 0.62;
const AO = 0.3;
// How hard the creases read. 1 is the scan as measured. The sheet arrives balled
// up and relaxes to REST on the same curve and duration as the text un-warping
// in Uncrumple, so the two read as one physical event.
const STRENGTH_START = 3.6;
const STRENGTH_REST = 1.7;
const RELAX_MS = 1500;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export function CrumpleLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // no WebGL2 — the baked texture stays

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // One full-screen triangle.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTexSize = gl.getUniformLocation(prog, "uTexSize");
    const uLight = gl.getUniformLocation(prog, "uLight");
    gl.uniform1f(gl.getUniformLocation(prog, "uAmbient"), AMBIENT);
    gl.uniform1f(gl.getUniformLocation(prog, "uAO"), AO);
    const uStrength = gl.getUniformLocation(prog, "uStrength");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const relaxed = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // Placeholder flat normal (pointing straight up) until the map decodes.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      1,
      1,
      0,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      new Uint8Array([128, 128, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let dpr = 1;
    let t0 = 0;
    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      t0 = performance.now();
      setLive(true);
    };
    img.src = "/paper-normal.jpg";

    // Light target and current, in device px. Lerped so it trails the cursor
    // slightly instead of snapping.
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let height = 300;
    let started = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uTexSize, TEX_PX * dpr, TEX_PX * dpr);
      // A lamp held a little above the sheet; scale with the viewport so the
      // falloff looks the same on any screen.
      height = Math.min(w, h) * 0.55;
      if (!started) {
        // Rest position: upper left, matching the CSS key light.
        tx = cx = w * 0.2;
        ty = cy = h * 0.1;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      started = true;
      tx = e.clientX * dpr;
      ty = e.clientY * dpr;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // On a phone there's no cursor: tilt the light with the device instead.
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      started = true;
      const w = canvas.width;
      const h = canvas.height;
      tx = w * 0.5 + (Math.max(-45, Math.min(45, e.gamma)) / 45) * w * 0.6;
      ty = h * 0.5 + (Math.max(-45, Math.min(45, e.beta - 40)) / 45) * h * 0.6;
    };
    window.addEventListener("deviceorientation", onTilt);

    // Deepen the creases back to STRENGTH_START and let them relax again, on
    // the same clock as the text warp above. Restarting t0 is the whole of it.
    const onRecrumple = () => {
      if (!relaxed && t0) t0 = performance.now();
    };
    window.addEventListener(RECRUMPLE_EVENT, onRecrumple);

    let raf = 0;
    const frame = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;

      // Relax from balled-up to rest, matching Uncrumple's curve exactly.
      let s = STRENGTH_REST;
      if (!relaxed && t0) {
        const e = Math.min(1, (performance.now() - t0) / RELAX_MS);
        const eased = 1 - Math.pow(1 - e, 3);
        s = STRENGTH_START + (STRENGTH_REST - STRENGTH_START) * eased;
      }
      gl.uniform1f(uStrength, s);

      // The sheet scrolls with the page; the lamp stays with the cursor. So the
      // texture is sampled in page space while the light stays in viewport
      // space — physically, sliding the paper under a fixed lamp.
      gl.uniform1f(uScroll, window.scrollY * dpr);

      gl.uniform3f(uLight, cx, cy, height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      window.removeEventListener(RECRUMPLE_EVENT, onRecrumple);
    };
  }, []);

  return (
    <>
      {/* Baked fallback, hidden once the shader has its texture. */}
      {!live && <div aria-hidden className="paper-crumple" />}
      <canvas ref={canvasRef} aria-hidden className="paper-canvas" />
    </>
  );
}
