type User = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  form: User;
  isRegisterMode: boolean;
  error: string;
  updateForm: (key: keyof User, value: string) => void;
  handleAuth: () => void;
  toggleMode: () => void;
};

export default function AuthForm({
  form,
  isRegisterMode,
  error,
  updateForm,
  handleAuth,
  toggleMode,
}: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f1220",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px",  color:"blue"}}>
          Vi-Notes
        </h1>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color:"black", marginTop:"25px"}}>
          {isRegisterMode ? "Register" : "Login"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {isRegisterMode && (
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateForm("password", e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            onClick={handleAuth}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#646cff",
              color: "white",
              cursor: "pointer",
            }}
          >
            {isRegisterMode ? "Register" : "Login"}
          </button>
        </div>

        <p
          onClick={toggleMode}
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#646cff",
            cursor: "pointer",
          }}
        >
          {isRegisterMode
            ? "Already have an account? Login"
            : "New user? Register"}
        </p>
      </div>
    </div>
  );
}