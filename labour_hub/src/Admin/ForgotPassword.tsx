import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", mobile: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/admin/verify-forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) {
      navigate("/admin/reset-password-direct", {
        state: form
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 shadow w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Mobile Number"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full p-2">
          Verify
        </button>

        {msg && <p className="text-sm mt-3">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;