// ResultScreen.jsx
import React from "react";

export default function ResultScreen({ result, onRetry }) {
  if (result.error) {
    return (
      <div className="max-w-[460px] w-[90%] h-[700px] mx-auto bg-blue-50 rounded-3xl shadow-xl border-4 border-yellow-300 p-6 text-center space-y-6">
        <h2 className="text-xl font-bold text-blue-600">診断結果が見つかりませんでした</h2>
        <p className="text-sm text-gray-600">入力に誤りがあった可能性があります。もう一度お試しください。</p>
        <button
          onClick={onRetry}
          className="bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          🔄 最初からやり直す
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[460px] w-[90%] mx-auto bg-white rounded-3xl shadow-xl border-4 border-yellow-200 p-6 text-left space-y-4 result-section fade-in">
      {/* メインタイプとサブタイプ */}
      <p className="text-sm text-gray-500">{result.mainType} ／ {result.subType}</p>

      {/* タイトル */}
      <h2 className="text-2xl font-bold result-title">{result.title}</h2>

      {/* 説明 */}
      <p className="text-gray-700">{result.description}</p>

      {/* 強み */}
      <div>
        <h3 className="font-semibold text-blue-600">🌟 強み</h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {result.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* 注意点（weaknesses） */}
      <div>
        <h3 className="font-semibold text-blue-600">⚠ 注意点</h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {result.weaknesses.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      {/* アドバイス */}
      <div>
        <h3 className="font-semibold text-blue-600">💡 アドバイス</h3>
        <p className="text-sm text-gray-800">{result.advice}</p>
      </div>

      {/* 相性 */}
      <div>
        <h3 className="font-semibold text-blue-600">🔗 相性</h3>
        <p className="text-sm text-gray-800">
          <strong>◎ 相性が良いタイプ：</strong>{result.compatibility?.good}<br />
          <strong>△ 注意が必要なタイプ：</strong>{result.compatibility?.caution}
        </p>
      </div>

      {/* 補足コメント */}
      <div>
        <h3 className="font-semibold text-blue-600">📌 補足</h3>
        <p className="text-sm text-gray-800">{result.supplementary}</p>
      </div>

      {/* やり直しボタン */}
      <button
        onClick={onRetry}
        className="share-button block mx-auto mt-4"
      >
        🔄 最初からやり直す
      </button>
    </div>
  );
}
