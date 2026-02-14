import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const res = await fetch("http://localhost:4000/admin/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    window.google.accounts.id.prompt();
  };

  

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const response = await fetch("http://localhost:4000/admin/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } else {
      if (response.status === 400 || response.status === 404) {
        setEmailError(data.message);
      } else if (response.status === 401) {
        setPasswordError(data.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c7e7ff] via-[#ffd6a5] to-[#ffb4c6] flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[900px] h-auto md:h-[480px]">

        <div className="hidden md:block absolute left-0 top-0 h-full w-[55%] bg-[#fb923c] rounded-r-[180px]" />

        <div className="hidden md:flex absolute left-0 top-0 h-full w-[55%] items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-3xl font-bold mb-4 mt-16">
              Hello, Welcome!
            </h2>
            <img
              src="/logo.png"
              alt="Urban Force"
              className="h-22 w-auto object-contain mx-auto -mt-8"
            />
          </div>
        </div>

        <div className="relative md:absolute right-0 top-0 w-full md:w-[45%] h-full flex flex-col justify-center px-6 md:px-14 py-10 md:py-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>

          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setEmailError("");
              }}
              className={`w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 ${
                emailError
                  ? "border border-red-500 focus:ring-red-200"
                  : "focus:ring-gray-200"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
            <span className="absolute right-4 top-1/3 -translate-y-1/2 text-gray-500">
              👤
            </span>
          </div>

          <div className="mb-2 relative">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setPasswordError("");
              }}
              className={`w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 ${
                passwordError
                  ? "border border-red-500 focus:ring-red-200"
                  : "focus:ring-gray-200"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div
            className="text-center mt-2 text-sm text-gray-900 mb-6 cursor-pointer hover:font-bold"
            onClick={() => navigate("/admin/forget-password")}
          >
            Forgot Password?
          </div>

          <form onSubmit={handleLogin}>
            <button
              type="submit"
              className="w-full bg-[#fb923c] text-white py-3 rounded-lg font-semibold hover:font-bold transition"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            or login with social platforms
          </div>

          <div className="flex justify-center gap-4 mt-4">

            <div
              onClick={handleGoogleLogin}
              className="w-10 h-10 text-black font-bold flex 
              items-center justify-center border rounded-lg 
              cursor-pointer hover:bg-gray-100"
            >
              G
            </div>

            <div className="w-10 h-10 text-black font-bold 
            flex items-center justify-center border rounded-lg 
            cursor-pointer hover:bg-gray-100">
              f
            </div>

            <div className="w-10 h-10 text-black font-bold flex 
            items-center justify-center border rounded-lg 
            cursor-pointer hover:bg-gray-100">
              Ø
            </div>

            <div className="w-10 h-10 text-black font-bold
             flex items-center justify-center border rounded-lg 
             cursor-pointer hover:bg-gray-100">
              in
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;