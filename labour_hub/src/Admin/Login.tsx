import { FormEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const safeJson = async (res: Response) => {
  const text = await res.text();
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, data: { message: text } };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return;

    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    else if (role === "labour") navigate("/labour-dashboard", { replace: true });
    else if (role === "employee") navigate("/find-labour", { replace: true });
  }, [navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res = await fetch("http://localhost:4000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      let parsed = await safeJson(res);

      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      res = await fetch("http://localhost:4000/api/labour/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.email, password: form.password }),
      });

      parsed = await safeJson(res);

      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("role", "labour");
        navigate("/labour-dashboard", { replace: true });
        return;
      }

      res = await fetch("http://localhost:4000/api/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      parsed = await safeJson(res);

      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("role", "employee");
        navigate("/find-labour", { replace: true });
        return;
      }

      setError(parsed.data?.message || "Invalid credentials");
    } catch (err) {
      console.error(err);
      setError("Backend not running / CORS issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c7e7ff] via-[#ffd6a5] to-[#ffb4c6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex bg-orange-400 rounded-r-[120px] items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Hello, Welcome!</h2>
            <img
              src="/logo.png"
              alt="Urban Force"
              className="h-40 w-auto object-contain mx-auto"
            />
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setError("");
              }}
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setError("");
              }}
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Admin + Labour + Employee
          </p>

          <div className="flex justify-center gap-4 mt-4 text-sm">
            <Link to="/register/worker" className="text-orange-600 font-medium">
              Register Worker
            </Link>
            <Link to="/register/employer" className="text-orange-600 font-medium">
              Register Employer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;