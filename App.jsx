import { useState } from "react";

const questions = [
  {
    text: "友達とちょっとした行き違いがあったとき、まずどう思う？",
    options: {
      A: "話せば分かると思うからちゃんと話したい",
      B: "面倒ごとは避けたいし、自然に戻ればいい",
      C: "どこにズレがあったのか考えたくなる",
      D: "相手を傷つけたかもしれない…と気になる"
    }
  },
  {
    text: "予定の相談をしていたら相手の返信が止まりました。どう感じる？",
    options: {
      A: "何かあったのかな？確認の連絡を入れよう",
      B: "自由にしてもらっていいかな、と思う",
      C: "スケジュールの把握ミスかな？と想定する",
      D: "嫌われたのかな？と不安になる"
    }
  },
  {
    text: "自分の気持ちがうまく伝わらなかった時は？",
    options: {
      A: "どうすれば伝わるか、改めて話そうとする",
      B: "伝わらないなら仕方ないと割り切る",
      C: "表現の仕方を修正したくなる",
      D: "伝えたことで相手がどう感じたかが気になる"
    }
  },
  {
    text: "仕事や作業の分担を決めるとき、どう進める？",
    options: {
      A: "一緒に話して、希望をすり合わせて決めたい",
      B: "誰かがスパッと決めてくれる方がラク",
      C: "能力・効率を踏まえて合理的に割り振りたい",
      D: "みんなが無理なくできそうな形を優先したい"
    }
  },
  {
    text: "「察してよ」と言われたらどう思う？",
    options: {
      A: "言わなきゃ分からないって！",
      B: "まあ…ある程度は察するのが礼儀かも",
      C: "言葉にしないから誤解が生まれるんだよ",
      D: "たしかに察する努力はしたいけど、ちょっとしんどい…"
    }
  },
  {
    text: "誰かの意見に違和感を感じた時、どうする？",
    options: {
      A: "そのまま伝えて話し合う",
      B: "自分の中で処理して流す",
      C: "どこに食い違いがあるのか分析する",
      D: "あえて波風立てずにスルーする"
    }
  },
  {
    text: "あなたが「わかってもらえた」と感じる瞬間は？",
    options: {
      A: "話してて気持ちがすれ違ってないと感じたとき",
      B: "あえて言わなくても通じたとき",
      C: "自分の意図を正確に理解してもらえたとき",
      D: "相手が自分の気持ちに共感してくれたとき"
    }
  }
];

const typeMap = {
  A: "\ud83d\udce2 話し合い重視タイプ",
  B: "\ud83d\udca8 サクッと直感タイプ",
  C: "\ud83e\udde0 きっちり理屈タイプ",
  D: "\ud83d\udc96 やさしさ共感タイプ",
};

export default function ThinkingStyleQuiz() {
  const [answers, setAnswers] = useState(Array(7).fill(""));
  const [result, setResult] = useState(null);

  const analyze = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(ch => {
      if (counts.hasOwnProperty(ch)) counts[ch]++;
    });

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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">\uD83E\uDDE0 改訂版：あなたの思考スタイル診断【全7問】</h1>
      {questions.map((q, idx) => (
        <div key={idx} className="space-y-2">
          <p className="font-semibold">【Q{idx + 1}】{q.text}</p>
          <div className="space-y-1">
            {Object.entries(q.options).map(([key, label]) => (
              <label key={key} className="block">
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={key}
                  checked={answers[idx] === key}
                  onChange={() => {
                    const copy = [...answers];
                    copy[idx] = key;
                    setAnswers(copy);
                  }}
                  className="mr-2"
                />
                {key}. {label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        診断する
      </button>

      {result && (
        <div className="mt-6 space-y-2">
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
