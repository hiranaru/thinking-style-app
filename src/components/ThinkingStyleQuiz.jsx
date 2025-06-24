// ✖️ 以下の2行を削除
// import { db, ref, get, runTransaction } from "../firebase";
// const [count, setCount] = useState(0);
// useEffect(() => { ... }) ← これも削除

// ✅ このように変更
import { useState } from "react";
import thinkingStyles from "../data/thinkingStyles.json";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";


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
  const [page, setPage] = useState(-1); // -1 = start screen
  const [result, setResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countRef = ref(db, "diagnosisCount");
    get(countRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCount(snapshot.val());
        }
      })
      .catch((err) => console.error("Firebase count read error:", err));
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

    const countRef = ref(db, "diagnosisCount");
    runTransaction(countRef, (n) => (n || 0) + 1).catch((err) => {
      console.error("Firebase count update error:", err);
    });
  };

  if (result) {
    return (
      <ResultScreen
        result={result}
        onRetry={() => {
          setAnswers([]);
          setPage(-1);
          setResult(null);
        }}
      />
    );
  }

  if (page === -1) {
    return <StartScreen onStart={() => setPage(0)} />;
  }

  return (
    <QuestionScreen
      page={page}
      questions={questions}
      current={questions[page]}
      onSelect={handleNext}
      selectedIndex={selectedIndex}
    />
  );
}
