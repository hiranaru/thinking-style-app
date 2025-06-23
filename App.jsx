import { useState } from "react";

const typeMap = {
  A: "📢 話し合い重視タイプ",
  B: "💨 サクッと直感タイプ",
  C: "🧠 きっちり理屈タイプ",
  D: "💞 やさしさ共感タイプ",
};

function App() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const analyze = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const ch of answer.toUpperCase()) {
      if (counts.hasOwnProperty(ch)) counts[ch]++;
    }
    const max = Math.max(...Object.values(counts));
    const mainTypes = Object.entries(counts)
      .filter(([_, v]) => v === max)
      .map(([k]) => typeMap[k]);

    const second = [...new Set(Object.values(counts))].sort((a, b) => b - a)[1];
    const subTypes = second
      ? Object.entries(counts)
          .filter(([_, v]) => v === second)
          .map(([k]) => typeMap[k])
      : [];

    setResult({
      counts,
      main: mainTypes.join(" × "),
      sub: subTypes.length ? subTypes.join("・") : "なし",
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }}>
      <h1>🧠 思考スタイル診断</h1>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="例：AACCACD"
        maxLength={7}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button
        onClick={analyze}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        診断する
      </button>
      {result && (
        <div style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <p><strong>📢 話し合い重視タイプ:</strong> {result.counts.A}票</p>
          <p><strong>💨 サクッと直感タイプ:</strong> {result.counts.B}票</p>
          <p><strong>🧠 きっちり理屈タイプ:</strong> {result.counts.C}票</p>
          <p><strong>💞 やさしさ共感タイプ:</strong> {result.counts.D}票</p>
          <p><strong>メインタイプ:</strong> {result.main}</p>
          <p><strong>サブタイプ候補:</strong> {result.sub}</p>
        </div>
      )}
    </div>
  );
}

export default App;
