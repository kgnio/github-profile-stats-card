import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
          background:
            "linear-gradient(135deg, #18181b 0%, #312e81 100%)",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "-0.5px",
        }}
      >
        GH
      </div>
    ),
    {
      ...size,
    }
  );
}