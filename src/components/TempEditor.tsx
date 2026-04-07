import React from "react";
import PasteStats from "./PasteStats";

type Props = {
  userName: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  updateEditorStats: () => void;
  formatText: (command: string, value?: string) => void;
  resetEditor: () => void;
  logout: () => void;
  wordCount: number;
  charCount: number;
  pasteCount: number;
  pastedLength: number;
  warning: string;
};

export default function TempEditor({
  userName,
  editorRef,
  handlePaste,
  updateEditorStats,
  formatText,
  resetEditor,
  logout,
  wordCount,
  charCount,
  pasteCount,
  pastedLength,
  warning,
}: Props) {
  return (
    <div className="app-container">
      <h1 className="title">Vi-Notes Editor</h1>
      <p>Welcome, {userName}</p>
      <p
  style={{
    color: "orange",
    marginBottom: "15px",
    fontSize: "14px",
    fontStyle: "italic",
    
  }}
>
  NOTE : Please select the text first, then click formatting options like Bold,
  Italic, Underline, or Alignment.
</p>

      {/* Toolbar */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => formatText("bold")}>Bold</button>
        <button onClick={() => formatText("italic")}>Italic</button>
        <button onClick={() => formatText("underline")}>Underline</button>
        <button onClick={() => formatText("justifyLeft")}>Left</button>
        <button onClick={() => formatText("justifyCenter")}>Center</button>
        <button onClick={() => formatText("justifyRight")}>Right</button>
        <button onClick={() => formatText("removeFormat")}>Clear</button>

        <select onChange={(e) => formatText("fontSize", e.target.value)}>
          <option value="">Font Size</option>
          <option value="1">Small</option>
          <option value="3">Medium</option>
          <option value="5">Large</option>
          <option value="7">XL</option>
        </select>
      </div>

      {/* Rich Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateEditorStats}
        onPaste={handlePaste}
        style={{
          minHeight: "250px",
          border: "3px solid #ccc",
          padding: "15px",
          borderRadius: "11px",
          background: "white",
          color: "black",
          outline: "none",
          textAlign: "left",
        }}
      ></div>

      <PasteStats
        wordCount={wordCount}
        charCount={charCount}
        pasteCount={pasteCount}
        pastedLength={pastedLength}
        warning={warning}
      />

      <div style={{ marginTop: "15px" }}>
        <button onClick={resetEditor}>Reset Editor</button>
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}