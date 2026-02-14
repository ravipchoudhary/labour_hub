import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("http://localhost:4000/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile({
            name: data.data.name,
            email: data.data.email,
            mobile: data.data.mobile,
          });
        } else {
          navigate("/admin/login");
        }
      })
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:4000/admin/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          mobile: profile.mobile,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Profile updated successfully");
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
          Admin Profile
        </h2>

        <label className="block mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label className="block mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full border p-3 mb-4 rounded-lg bg-gray-100"
        />

        <label className="block mb-1 text-sm font-medium">
          Mobile
        </label>
        <input
          type="text"
          name="mobile"
          value={profile.mobile}
          onChange={handleProfileChange}
          className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Update Profile
        </button>

        {message && (
          <div
            className={`mt-4 p-2 rounded text-sm font-medium ${
              success
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

export default AdminProfile;