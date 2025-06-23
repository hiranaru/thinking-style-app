// 最新版：全タイプとバランス型対応の診断アプリ
import { useState } from "react";

const questions = [
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

];

const typeMap = {
  A: "📢 話し合い重視タイプ",
  B: "💨 サクッと直感タイプ",
  C: "🧠 きっちり理屈タイプ",
  D: "💞 やさしさ共感タイプ",
};

const commentMap = {
  "📢 話し合い重視タイプ": {
    nickname: "対話のバランサー",
    traits: [
      "誠実に向き合い、話し合いで解決しようとする姿勢が強い",
      "相手を理解するために丁寧な言葉を選びがち",
      "自分の意見より、全体の納得感を重視する"
    ],
    strengths: [
      "人間関係の調整役に向いている",
      "話すことで安心感を与えられる",
      "聞き手としても優秀"
    ],
    weaknesses: [
      "言葉に頼りすぎて感覚派とズレがち",
      "本音を隠して我慢してしまうことも",
      "話すことでしか解決できないと思いがち"
    ],
    advice: "ときには沈黙や感覚も“対話の一部”と捉えてみよう。言葉以外にも信頼は育ちます。",
    match: {
      good: "💞 やさしさ共感タイプ",
      bad: "💨 サクッと直感タイプ"
    }
  },
  "💨 サクッと直感タイプ": {
    nickname: "空気を読むスナイパー",
    traits: [
      "感覚的な判断が得意で、即断即決タイプ",
      "相手の気持ちや場の空気を読む力が鋭い",
      "論理より直感で動く"
    ],
    strengths: [
      "判断が早くテンポが良い",
      "初対面でも空気に合わせられる柔軟さ",
      "曖昧さに強い"
    ],
    weaknesses: [
      "考えるより先に動きがち",
      "論理派とは噛み合いづらい",
      "説明を省きすぎる傾向あり"
    ],
    advice: "ときには相手の“わからなさ”に寄り添う一言を添えてみて。共感＋言葉で安心感を与えられるようになります。",
    match: {
      good: "💞 やさしさ共感タイプ",
      bad: "🧠 きっちり理屈タイプ"
    }
  },
  "🧠 きっちり理屈タイプ": {
    nickname: "ロジカルな整頓屋さん",
    traits: [
      "物事を構造的に考え、論理的な理解を好む",
      "自分の意見や理由を丁寧に整理して伝えたい",
      "感情論にはやや不器用"
    ],
    strengths: [
      "複雑な話でも筋道立てて考えられる",
      "説明・解説が丁寧",
      "情報処理能力が高い"
    ],
    weaknesses: [
      "感情表現が苦手",
      "曖昧さや感覚的な話にストレスを感じやすい",
      "完璧を求めすぎて疲れることも"
    ],
    advice: "「正しさ」より「心地よさ」が大事な場面もあります。まずは共感から入ると、伝わり方が変わります。",
    match: {
      good: "📢 話し合い重視タイプ",
      bad: "💨 サクッと直感タイプ"
    }
  },
  "💞 やさしさ共感タイプ": {
    nickname: "ふんわり平和主義者",
    traits: [
      "場の空気や他人の感情にとても敏感",
      "波風を立てないように気を配る",
      "自分より相手の気持ちを優先しがち"
    ],
    strengths: [
      "人への共感力が高い",
      "穏やかで安心感を与える",
      "気配りが自然にできる"
    ],
    weaknesses: [
      "気を遣いすぎて疲れやすい",
      "本音を我慢しがち",
      "感情的に巻き込まれやすい"
    ],
    advice: "“自分の感情”も大切に。たまには主語を“私”にして話してみよう。",
    match: {
      good: "📢 話し合い重視タイプ",
      bad: "🧠 きっちり理屈タイプ"
    }
  },
  "バランス型": {
    nickname: "柔軟なオールラウンダー",
    traits: [
      "どの思考スタイルも状況に応じて使い分けられる",
      "人によって対応を自然に変えられる適応力の持ち主",
      "突出した癖がなく、協調性が高い"
    ],
    strengths: [
      "誰とでも馴染みやすい",
      "チームプレイに向いている",
      "どんな環境でも順応できる"
    ],
    weaknesses: [
      "自分の軸が曖昧になりやすい",
      "決断が遅くなることも",
      "周囲に合わせすぎて疲れる"
    ],
    advice: "“あなた自身の考え”も発信してOK。柔軟さは強さですが、芯もあるとさらに魅力が増します。",
    match: {
      good: "全タイプと柔軟に相性良し",
      bad: "相手次第で変わる（自分の芯がないと振り回されやすい）"
    }
  }
};

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
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    finalAnswers.forEach(ch => {
      if (counts.hasOwnProperty(ch)) counts[ch]++;
    });

    const max = Math.max(...Object.values(counts));
    const maxTypes = Object.entries(counts).filter(([_, v]) => v === max).map(([k]) => typeMap[k]);

    const isBalanced = Object.values(counts).filter(v => v === max).length > 1;
    const mainTypeKey = isBalanced ? "バランス型" : maxTypes[0];

    const second = [...new Set(Object.values(counts))].sort((a, b) => b - a)[1];
    const subTypes = second
      ? Object.entries(counts)
          .filter(([_, v]) => v === second)
          .map(([k]) => typeMap[k])
      : [];

    setResult({
      counts,
      main: mainTypeKey,
      sub: subTypes.length ? subTypes.join("・") : "なし",
    });
  };

  if (result) {
    const comment = commentMap[result.main] || commentMap["バランス型"];
    return (
      <div className="p-6 max-w-xl mx-auto text-center bg-pink-50 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-pink-700">🌟 診断結果</h1>
        <p>📢 話し合い重視タイプ: {result.counts.A}票</p>
        <p>💨 サクッと直感タイプ: {result.counts.B}票</p>
        <p>🧠 きっちり理屈タイプ: {result.counts.C}票</p>
        <p>💞 やさしさ共感タイプ: {result.counts.D}票</p>
        <p className="text-xl font-semibold mt-4">🎯 メインタイプ: {result.main}</p>
        <p className="text-sm text-gray-700">サブタイプ候補: {result.sub}</p>

        {comment && (
          <div className="text-left mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">💡 タイプ名：{comment.nickname}</h2>
            <h3 className="mt-2 font-semibold">🔍 特徴まとめ：</h3>
            <ul className="list-disc list-inside">
              {comment.traits.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            <h3 className="mt-2 font-semibold">✅ 強み：</h3>
            <ul className="list-disc list-inside">
              {comment.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <h3 className="mt-2 font-semibold">⚠️ 弱み：</h3>
            <ul className="list-disc list-inside">
              {comment.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
            <h3 className="mt-2 font-semibold">🛎 アドバイス：</h3>
            <p>{comment.advice}</p>
            <h3 className="mt-2 font-semibold">🤝 相性：</h3>
            <p>◎ 相性が良い：{comment.match.good}</p>
            <p>△ 相性に注意：{comment.match.bad}</p>
          </div>
        )}
      </div>
    );
  }

  const current = questions[page];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold text-pink-600 text-center">🧠 思考スタイル診断（Q{page + 1}/{questions.length}）</h1>
      {page === 0 && (
        <p className="text-center text-gray-600 text-sm">あなたの思考のクセを7問で診断！気軽に直感で答えてみてください。</p>
      )}
      <p className="text-lg font-semibold">{current.text}</p>
      <div className="grid gap-2">
        {Object.entries(current.options).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleNext(key)}
            className="border border-pink-400 rounded-xl px-4 py-2 text-left hover:bg-pink-100 transition"
          >
            <strong>{key}.</strong> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
