# hridaynarang.com

A personal site that is one sheet of crumpled paper, one screen, no scrolling.

```bash
npm install
npm run dev
```

## How the paper works

The paper isn't a picture of paper — it's lit in real time.

**`public/paper-normal.jpg`** is a scan of real crumpled paper ([ambientCG
Paper003](https://ambientcg.com/view?id=Paper003), CC0 public domain). It stores
surface *normals* rather than baked-in shading, which is what makes the light a
live variable.

**`components/crumple-light.tsx`** runs a WebGL2 fragment shader over the whole
viewport, doing the Lambert term per pixel against a point light that follows the
cursor (or the gyroscope on a phone). It adds a cheap ambient-occlusion term so
creases stay dark regardless of where the light is — without that, paper reads as
plastic. The texture is sampled in page space and lit in viewport space, so the
sheet scrolls under a fixed lamp.

This was originally generated procedurally, with a Voronoi cell structure
approximating the crease network. It's a dead end worth recording: real crumpled
paper is **faceted** — flat planes meeting at sharp straight creases — and
Voronoi `f1` height is *distance to a seed*, so every cell comes out as a cone
and bulges. It read as molded plastic. SVG's `feTurbulence` is worse: it only
ever makes rounded organic ridges, which look like stucco or leather at any
setting. A photograph of the real thing is both more convincing and smaller than
the generated normal map it replaced.

**`components/uncrumple.tsx`** runs the whole content block through an SVG
displacement map on load, falling from scale 46 to 0 while the shader's crease
depth relaxes on the same easing curve and duration. The writing is *on* the
paper, so it has to deform with it. The filter is attached on mount, not
server-rendered — with JS off you get flat readable text rather than a page
frozen mid-crumple — and it's removed entirely when the animation ends, since a
displacement map at scale 0 still costs a full filter pass on every repaint.

## Type

Two voices, matching the two things on a real sheet:

- **Caveat** — the name only. The signature.
- **Courier Prime** — everything else. It's a typed note.
- **Geist Mono** — one exception, the tagline under the name.

Text carries `.ink`, which is `mix-blend-mode: multiply`, so creases run *through*
the letters. The photo deliberately doesn't: ink soaks into paper, but a
photograph is an object lying on top of it, so it gets a real drop shadow instead.

## Content

All of it is in **`lib/content.ts`** — roles, dates, links, and the pen notes.
Nothing to hunt for in the markup.

## Gotcha

Turbopack repeatedly served **stale CSS** after edits to `globals.css` during
development. If a change doesn't show up, `rm -rf .next` and restart.
