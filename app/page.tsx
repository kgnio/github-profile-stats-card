export default function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const u = "kgnio";

  const examples = [
    `${base}/api/card?user=${u}`,
    `${base}/api/card?user=${u}&theme=midnight`,
    `${base}/api/card?user=${u}&theme=slate`,
    `${base}/api/card?user=${u}&theme=light`,
  ];

  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        GitHub Profile Stats Card
      </h1>
      <p style={{ color: "#6B7280", marginTop: 8 }}>
        Hosted SVG stats card for any GitHub username.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 14, maxWidth: 1100 }}>
        <img
          src={`${base}/api/card?user=${u}`}
          alt="Preview"
          style={{
            width: "100%",
            borderRadius: 14,
            border: "1px solid #1F2937",
          }}
        />

        <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>
          Examples
        </h2>

        <ul style={{ display: "grid", gap: 10, margin: 0, paddingLeft: 18 }}>
          {examples.map((x) => (
            <li key={x}>
              <a href={x} target="_blank" rel="noreferrer">
                {x}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
