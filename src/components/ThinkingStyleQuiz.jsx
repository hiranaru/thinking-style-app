import { useState } from "react";
import thinkingStyles from "../data/thinkingStyles.json";
import "../index.css"; // fade-in や answer-button を使うために必要

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

export default function ThinkingStyleQuiz() {
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(null);

  const handleNext = (choice) => {
    const updated = [...answers];
    updated[page] = choice;
    setAnswers(updated);

    if (page < questions.length - 1) {
      setPage(page + 1);
    } else {
      analyze(updated);
    }
  };

  const analyze = (finalAnswers) => {
    const answerId = finalAnswers.join("");
    const matchedResult = thinkingStyles.find((item) => item.id === answerId);

    if (!matchedResult) {
      setResult({ error: true });
    } else {
      setResult(matchedResult);
    }
  };

  if (result) {
    if (result.error) {
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center fade-in">
          <h1 className="text-2xl font-bold text-red-600">診断結果が見つかりませんでした</h1>
          <p className="mt-4">入力に誤りがあった可能性があります。もう一度お試しください。</p>
          <button
            onClick={() => {
              setAnswers([]);
              setPage(0);
              setResult(null);
            }}
            className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
          >
            🔄 やり直す
          </button>
        </div>
      );
    }

    return (
      <div className="fade-in p-6 max-w-md mx-auto bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-xl border-4 border-pink-200 text-left space-y-4">
        <h1 className="text-2xl font-extrabold text-pink-600 text-center">🌟 あなたの診断結果</h1>
        <div>
          <h2 className="text-xl font-bold text-pink-700">🧠 タイプ：{result.mainType}</h2>
          <p className="text-sm text-gray-700 mb-2">（{result.subType}）</p>
        </div>
        <div>
          <h3 className="font-semibold">💡 一言まとめ</h3>
          <p>{result.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">📌 特徴</h3>
          <p>{result.description}</p>
        </div>
        <div className="text-center mt-6 flex flex-col gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=私の思考スタイルは「${result.mainType}」でした！%0A#思考スタイル診断%0Ahttps://thinking-style-app.vercel.app/`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            🐦 診断結果をシェアする
          </a>
          <button
            onClick={() => {
              setAnswers([]);
              setPage(0);
              setResult(null);
            }}
            className="bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
          >
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  const current = questions[page];

  return (
    <div className="p-6 max-w-md mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 space-y-6 fade-in">
      <h1 className="text-2xl font-extrabold text-pink-600 text-center">
        🧠 思考スタイル診断（Q{page + 1}/{questions.length}）
      </h1>

      {/* 🔽 ここが進捗バーの追加部分 */}
      <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden mb-4">
        <div
          className="bg-pink-400 h-full transition-all duration-300"
          style={{ width: `${((page + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {page === 0 && (
        <p className="text-center text-gray-600 text-sm fade-in">
          あなたの思考のクセを7問で診断！直感で答えてみてね♪
        </p>
      )}
      <p className="text-lg font-semibold text-center fade-in">{current.text}</p>
      <div className="flex flex-col gap-4">
        {Object.entries(current.options).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleNext(key)}
            className="answer-button"
          >
            <strong>{key}.</strong> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
