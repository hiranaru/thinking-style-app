import thinkingStyles from "../data/thinkingStyles.json";
const analyze = (finalAnswers) => {
  const answerId = finalAnswers.join(""); // 例: "AAACCCD"
  const matchedResult = thinkingStyles.find((item) => item.id === answerId);

  if (!matchedResult) {
    setResult({ error: true }); // 該当なし
  } else {
    setResult(matchedResult); // JSONのデータをそのまま出力
  }
};
