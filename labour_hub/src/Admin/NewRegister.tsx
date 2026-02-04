import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // const [userData,setUserData]=useState()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('http://localhost:4000/admin/signup', {
      method: "post",
      body: JSON.stringify(form),
      headers: { 'Content-Type': "application/json" }
    })

    const data = await response.json()
    if (response) {
      // console.log(response);
      document.cookie = "token=" + data.token;
      alert("Registered successfully!");
      navigate("/admin/login");
    } else {
      alert(data.message || "Register failed")
    }

    // console.log("Registered User:", form);


  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c7e7ff] via-[#ffd6a5] to-[#ffb4c6] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-6 space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
          />

          <button
            type="submit"
            className="w-full bg-[#fb923c] hover:bg-[#fb923c] text-white py-2 rounded-xl font-bold"
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/admin/login")}
            className="text-sm text-black hover:font-bold"
          >
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;