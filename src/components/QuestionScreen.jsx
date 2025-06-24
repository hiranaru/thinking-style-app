import React from "react";
import "../index.css";

export default function QuestionScreen({ page, questions, onAnswer }) {
  const current = questions[page];

  return (
    <div className="max-w-[460px] w-[90%] h-[900px] mx-auto bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200 p-6 flex flex-col justify-between fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-pink-600 text-center mb-4">
          🧠 察してほしい？言葉にしてほしい？（Q{page + 1}/{questions.length}）
        </h1>
        <div className="min-h-[80px] flex items-center justify-center mb-4">
          <p className="text-base md:text-lg font-semibold text-center fade-in">{current.text}</p>
        </div>
        <div className="flex justify-center mb-4">
          <img src="/26462751.jpg" alt="sun" className="w-24 h-24 object-contain" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(current.options).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="answer-button"
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
