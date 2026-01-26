export default function getWordCount(text?: string) {
  return (
    text
      ?.trim()
      .split(/\s+/)
      .filter((value) => value !== "").length || 0
  );
}
