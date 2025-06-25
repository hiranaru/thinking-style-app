import React from "react";

export default function StartScreen({ onStart }) {
  return (
    <div className="max-w-[460px] w-[90%] mx-auto my-16 flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl border-4 border-yellow-300 p-6 text-center fade-in space-y-6">
      {/* タイトル（ロゴ風） */}
      <h1 className="text-3xl font-extrabold text-blue-600 font-logo leading-snug">
        察してほしい？<br />
        言葉にしてほしい？<br />
        思考スタイル診断！
      </h1>

      {/* キャラクターイラスト */}
      <img
        src="/character.png"
        alt="キャラクター"
        className="w-32 h-auto mt-2 mb-4"
      />

      {/* 説明文 */}
      <p className="text-gray-700 text-base leading-relaxed">
        あなたは「察してほしい派」？<br />
        それとも「言葉にしてほしい派」？<br />
        7問であなたの思考のクセを診断します。
      </p>

      {/* スタートボタン */}
      <button
        onClick={onStart}
        className="bg-yellow-400 text-blue-800 font-bold text-lg px-6 py-4 rounded-full hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 w-4/5"
      >
        ▶ スタート
      </button>

      {/* フッター */}
      <p className="text-sm text-gray-400 mt-4">presented by 株式会社SBH</p>
    </div>
  );
}
