import React from "react";
import "../index.css";

export default function QuestionScreen({ page, questions, onAnswer }) {
  const current = questions[page];

  return (
    <div className="flex flex-col min-h-screen max-h-[100dvh] overflow-hidden bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-200">
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        <h1 className="text-2xl font-extrabold text-pink-600 text-center">
          🧠 察してほしい？言葉にしてほしい？（Q{page + 1}/{questions.length}）
        </h1>
        <p className="text-base md:text-lg font-semibold text-center fade-in">
          {current.text}
        </p>
        <div className="flex justify-center">
          <img src="/26462751.jpg" alt="sun" className="w-24 h-24 object-contain" />
        </div>
      </main>

      <footer className="p-4 space-y-4 bg-white">
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

        <div className="mt-4">
          <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-pink-400 h-full transition-all duration-300"
              style={{ width: `${((page + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
