import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPasswordDirect = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:4000/admin/reset-password-direct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state, password, confirmPassword }),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) {
      setTimeout(() => navigate("/admin/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 shadow w-96">
        <h2 className="text-xl font-bold mb-4">Set New Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-gray-200"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-gray-200"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="w-full bg-[#fb923c] text-white py-2 rounded-xl font-bold">
          Reset Password
        </button>

        {msg && <p className="text-sm mt-3 text-red-500">{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordDirect;