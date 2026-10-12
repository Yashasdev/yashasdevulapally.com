import { ImageResponse } from "next/og";

export const alt = "Yashas Devulapally — I like making things happen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4f0e8", color: "#081b42", padding: 44 }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "3px solid #081b42", padding: 54, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.12em" }}>
          <span>YASHAS DEVULAPALLY / PORTFOLIO</span><span>GEORGIA TECH / WORLDWIDE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 79, lineHeight: 0.96, fontWeight: 700, letterSpacing: "-0.06em" }}>
          <span>Hey, I&rsquo;m Yashas.</span><span style={{ color: "#245bff" }}>I like making</span><span style={{ color: "#245bff" }}>things happen.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#44516c" }}>
          <span>BIOMEDICAL ENGINEERING + EVERYTHING ELSE</span><span>YD®</span>
        </div>
        <div style={{ position: "absolute", right: 65, top: 95, width: 164, height: 164, borderRadius: 999, border: "2px solid #245bff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 84, height: 84, borderRadius: 999, background: "#245bff", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 28 }}>YD</div>
        </div>
      </div>
    </div>,
    size,
  );
}
