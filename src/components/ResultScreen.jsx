// ResultScreen.jsx
import React from "react";

export default function ResultScreen({ result, onRestart }) {
  if (result.error) {
    return (
      <div className="max-w-[460px] w-[90%] h-[900px] mx-auto bg-white rounded-3xl shadow-xl border-4 border-pink-200 p-6 flex flex-col justify-center items-center text-center fade-in">
        <h1 className="text-2xl font-bold text-red-600">診断結果が見つかりませんでした</h1>
        <p className="mt-4 text-gray-700 text-base">入力に誤りがあった可能性があります。もう一度お試しください。</p>
        <button
          onClick={onRestart}
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
      <div>
        <h2 className="text-lg font-bold text-pink-700">🧠 タイプ：{result.mainType}</h2>
        <p className="text-sm text-gray-600 mb-2">（{result.subType}）</p>
        <h3 className="font-semibold">💡 一言まとめ</h3>
        <p>{result.title}</p>
        <h3 className="font-semibold mt-2">📌 特徴</h3>
        <p>{result.description}</p>
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
          onClick={onRestart}
          className="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition"
        >
          🔄 もう一度診断する
        </button>
      </div>
    </div>
  );
}
