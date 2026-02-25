import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:4000/admin/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Password updated successfully");

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }, 2000);
    } else {
      setSuccess(false);
      setMessage(data.message);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16">
      <div className="bg-white w-[420px] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Change Password
        </h2>

        <label className="block mb-1 text-sm font-medium">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
          >
            {showCurrent ? "Hide" : "Show"}
          </span>
        </div>


        {/* New Password */}
        <label className="block mb-1 text-sm font-medium">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
          >
            {showNew ? "Hide" : "Show"}
          </span>
        </div>


        {/* Confirm New Password */}
        <label className="block mb-1 text-sm font-medium">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
          >
            {showConfirm ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Update Password
        </button>

        {message && (
          <div
            className={`mt-4 p-2 rounded text-sm font-medium ${success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {message}
          </div>
        )}

        <p
          onClick={() => navigate(-1)}
          className="mt-6 text-sm text-gray-500 cursor-pointer hover:text-orange-500"
        >
          ← Back
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;