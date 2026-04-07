type Props = {
  wordCount: number;
  charCount: number;
  pasteCount: number;
  pastedLength: number;
  warning: string;
};

export default function PasteStats({
  wordCount,
  charCount,
  pasteCount,
  pastedLength,
  warning,
}: Props) {
  return (
    <div className="stats">
      <h3>Words: {wordCount}</h3>
      <h3>Characters: {charCount}</h3>
      <h3>Paste Count: {pasteCount}</h3>
      <h3>Last Pasted Length: {pastedLength}</h3>

      {warning && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          ⚠️ {warning}
        </p>
      )}
    </div>
  );
}