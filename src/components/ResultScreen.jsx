// ResultScreen.jsx
import React from "react";

export default function ResultScreen({ result, onRetry }) {
  if (result.error) {
    return (
      <div className="max-w-[460px] w-[90%] h-[700px] mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 text-center space-y-6">
        <h2 className="text-xl font-bold text-pink-600">診断結果が見つかりませんでした</h2>
        <p className="text-sm text-gray-600">入力に誤りがあった可能性があります。もう一度お試しください。</p>
        <button
          onClick={onRetry}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          🔄 最初からやり直す
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[460px] w-[90%] mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 text-left space-y-4">
      <h2 className="text-2xl font-bold text-pink-600">{result.title}</h2>
      <p className="text-gray-700">{result.description}</p>

      <div>
        <h3 className="font-semibold text-pink-500">強み</h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {result.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-pink-500">注意点</h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {result.cautions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRetry}
        className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition block mx-auto"
      >
        🔄 最初からやり直す
      </button>
    </div>
  );
}
