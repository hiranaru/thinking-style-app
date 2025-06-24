// StartScreen.jsx
import React from "react";

export default function StartScreen({ onStart }) {
  return (
    <div className="max-w-[460px] w-[90%] h-[900px] mx-auto flex flex-col justify-center items-center bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 text-center fade-in space-y-6">
      <h1 className="text-2xl font-extrabold text-pink-600">
        🧠 察してほしい？言葉にしてほしい？思考スタイル診断！
      </h1>
      <p className="text-gray-700 text-base">
        あなたは「察してほしい派」？それとも「言葉にしてほしい派」？
        7問であなたの思考のクセを診断します！
      </p>
      <button
        onClick={onStart}
        className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
      >
        ▶ スタート
      </button>
    </div>
  );
}
