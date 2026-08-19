import { ImageResponse } from "next/og";

export const alt =
  "GitHub Profile Stats Card Generator — Create customizable GitHub README stats cards";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "linear-gradient(135deg, #09090b 0%, #111827 55%, #172554 100%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "28px",
          color: "#a1a1aa",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            background: "#818cf8",
          }}
        />
        GitHub Profile Stats Card
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: "-3px",
            maxWidth: "1000px",
          }}
        >
          Make Your GitHub Profile Stand Out
        </div>

        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.4,
            color: "#cbd5e1",
            maxWidth: "900px",
          }}
        >
          Generate customizable GitHub stats cards and embed them into your
          Profile README with one line of Markdown.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
          color: "#94a3b8",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          <span>Dynamic SVG</span>
          <span>•</span>
          <span>Multiple Themes</span>
          <span>•</span>
          <span>Free</span>
        </div>

        <div>kgnio-profile-card.vercel.app</div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
