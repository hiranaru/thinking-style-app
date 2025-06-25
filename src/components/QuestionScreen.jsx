import React from "react";
import "../index.css";

export default function QuestionScreen({ page, questions, onAnswer }) {
  const current = questions[page];

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      {/* コンテンツエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h1 className="text-2xl font-extrabold text-pink-600 text-center mb-4">
          🧠 察してほしい？言葉にしてほしい？（Q{page + 1}/{questions.length}）
        </h1>

        <p className="text-base md:text-lg font-semibold text-center mb-4">
          {current.text}
        </p>

        <div className="flex justify-center mb-4">
          <img src="/Q01.jpg" alt="sun" className="w-24 h-24 object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(current.options).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onAnswer(key)}
              className="answer-button"
            >
              <strong>{key}.</strong> {label}
            </button>
          ))}
        </div>
      </div>

      {/* 固定表示の進捗バー */}
      <div className="sticky bottom-0 bg-pink-50 px-4 pt-2 pb-4 shadow-inner">
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
