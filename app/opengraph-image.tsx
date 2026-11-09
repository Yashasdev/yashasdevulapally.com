import { ImageResponse } from "next/og";

export const alt =
  "Yashas Devulapally — Biomedical Engineering at Georgia Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#fcfcfa",
        color: "#182e48",
        padding: 44,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 54,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ color: "#245bd0" }}>yd.</span>
          <span>COLUMBUS → ATLANTA</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 79,
            lineHeight: 0.96,
            fontWeight: 700,
            letterSpacing: "-0.06em",
          }}
        >
          <span>Yashas</span>
          <span style={{ color: "#245bd0" }}>Devulapally.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 19,
            color: "#44516c",
          }}
        >
          <span>BIOMEDICAL ENGINEERING · GEORGIA TECH</span>
          <span>STAMPS SCHOLAR</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 65,
            top: 180,
            width: 164,
            height: 164,
            borderRadius: 999,
            border: "1px solid #dfe5eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#245bd0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
            }}
          >
            YD
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
