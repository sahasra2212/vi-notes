import React, { useEffect, useRef, useState } from "react";
import AuthForm from "./components/AuthForm";
import TempEditor from "./components/TempEditor";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("viUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  //const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [pasteCount, setPasteCount] = useState(0);
  const [pastedLength, setPastedLength] = useState(0);
  const [warning, setWarning] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);

  const updateForm = (key: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  useEffect(() => {
    if (registeredUser) {
      localStorage.setItem("viUser", JSON.stringify(registeredUser));
    }
  }, [registeredUser]);

  const handleAuth = () => {
    if (!form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    if (isRegisterMode) {
      if (!form.name) {
        setError("Name is required for registration");
        return;
      }

      if (registeredUser && registeredUser.email === form.email) {
        setError("Account already exists. Please login.");
        return;
      }

      setRegisteredUser(form);
      setIsLoggedIn(true);
      return;
    }

    if (!registeredUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      form.email !== registeredUser.email ||
      form.password !== registeredUser.password
    ) {
      setError("Invalid email or password");
      return;
    }

    setIsLoggedIn(true);
  };

  const updateEditorStats = () => {
  const value = editorRef.current?.innerText || "";
  setWordCount(value.trim() ? value.trim().split(/\s+/).length : 0);
  setCharCount(value.length);
};

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedText = e.clipboardData.getData("text");
    setPasteCount((prev) => prev + 1);
    setPastedLength(pastedText.length);
    setWarning(`⚠ Pasted ${pastedText.length} characters`);
  };

  const formatText = (command: string, value?: string) => {
  editorRef.current?.focus(); // important
  document.execCommand(command, false, value);
  updateEditorStats();
};

  const resetEditor = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
   
    setWordCount(0);
    setCharCount(0);
    setPasteCount(0);
    setPastedLength(0);
    setWarning("");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setForm({ name: "", email: "", password: "" });
    setError("");
  };

  return !isLoggedIn ? (
    <AuthForm
      form={form}
      isRegisterMode={isRegisterMode}
      error={error}
      updateForm={updateForm}
      handleAuth={handleAuth}
      toggleMode={() => {
        setIsRegisterMode(!isRegisterMode);
        setError("");
      }}
    />
  ) : (
    <TempEditor
      userName={registeredUser?.name || registeredUser?.email || "User"}
      editorRef={editorRef}
      handlePaste={handlePaste}
      updateEditorStats={updateEditorStats}
      formatText={formatText}
      resetEditor={resetEditor}
      logout={logout}
      wordCount={wordCount}
      charCount={charCount}
      pasteCount={pasteCount}
      pastedLength={pastedLength}
      warning={warning}
    />
  );
}