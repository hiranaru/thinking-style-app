import { useEffect, useState } from "react";
import { db, ref, get, runTransaction } from "../../firebase";
import thinkingStyles from "../data/thinkingStyles.json";
import "../index.css";

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
  const [page, setPage] = useState(-1);
  const [result, setResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countRef = ref(db, "diagnosisCount");
    get(countRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCount(snapshot.val());
      }
    });
  }, []);

  const handleNext = (choice) => {
    setSelectedIndex(choice);
    setTimeout(() => {
      const updated = [...answers];
      updated[page] = choice;
      setAnswers(updated);

      if (page < questions.length - 1) {
        setPage(page + 1);
        setSelectedIndex(null);
      } else {
        analyze(updated);
      }
    }, 150);
  };

  const analyze = (finalAnswers) => {
    const answerId = finalAnswers.join("");
    const matchedResult = thinkingStyles.find((item) => item.id === answerId);
    setResult(matchedResult || { error: true });

    // 🔼 Firebaseのカウントを+1する
    runTransaction(ref(db, "diagnosisCount"), (current) => {
      return (current || 0) + 1;
    });
  };

  if (result) {
    if (result.error) {
      return (
        <div className="max-w-[460px] w-[90%] h-[900px] mx-auto bg-white rounded-3xl shadow-xl border-4 border-pink-200 p-6 flex flex-col justify-center items-center text-center fade-in">
          <h1 className="text-2xl font-bold text-red-600">診断結果が見つかりませんでした</h1>
          <p className="mt-4 text-gray-700 text-base">入力に誤りがあった可能性があります。もう一度お試しください。</p>
          <button
            onClick={() => {
              setAnswers([]);
              setPage(-1);
              setResult(null);
            }}
            className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
          >
            🔄 最初からやり直す
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-[460px] w-[90%] h-[900px] mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 flex flex-col justify-center space-y-6 fade-in text-left">
        <h1 className="text-2xl font-extrabold text-pink-600 text-center">🌟 あなたの診断結果</h1>
        <div className="result-section">
          <h2 className="result-title">🧠 タイプ：{result.mainType}</h2>
          <p className="text-sm text-gray-600 mb-2">（{result.subType}）</p>
          <div>
            <h3 className="font-semibold">💡 一言まとめ</h3>
            <p>{result.title}</p>
          </div>
          <div>
            <h3 className="font-semibold">📌 特徴</h3>
            <p>{result.description}</p>
          </div>
        </div>
        <div className="text-center mt-6 flex flex-col gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=私の思考スタイルは「${result.mainType}」でした！%0A#思考スタイル診断%0Ahttps://thinking-style-app.vercel.app/`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-button"
          >
            🐦 診断結果をシェアする
          </a>
          <button
            onClick={() => {
              setAnswers([]);
              setPage(-1);
              setResult(null);
            }}
            className="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition"
          >
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  if (page === -1) {
    return (
      <div className="max-w-[460px] w-[90%] h-[900px] mx-auto flex flex-col justify-center items-center bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 text-center fade-in space-y-6">
        <h1 className="text-2xl font-extrabold text-pink-600 leading-snug">
          🧠 察してほしい派？言葉にしてほしい派？<br />
          あなたの思考クセを探る診断！
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          🔄 <strong>{count}</strong>人が診断しています！
        </p>
        <p className="text-base text-gray-700">あなたの思考のクセを7問で診断します！</p>
        <button
          onClick={() => setPage(0)}
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
        >
          ▶ スタート
        </button>
      </div>
    );
  }

  const current = questions[page];

  return (
    <div className="max-w-[460px] w-[90%] h-[900px] mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 flex flex-col justify-between fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-pink-600 text-center mb-4">
          🧠 思考スタイル診断（Q{page + 1}/{questions.length}）
        </h1>
        <div className="min-h-[80px] flex items-center justify-center mb-4">
          <p className="text-base md:text-lg font-semibold text-center fade-in">{current.text}</p>
        </div>
        <div className="flex justify-center mb-4">
          <img src="/26462751.jpg" alt="sun" className="w-24 h-24 object-contain" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(current.options).map(([key, label], index) => (
          <button
            key={key}
            onClick={() => handleNext(key)}
            className={`answer-button ${selectedIndex === key ? "selected" : ""}`}
          >
            <strong>{key}.</strong> {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-pink-400 h-full transition-all duration-300"
            style={{ width: `${((page + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
