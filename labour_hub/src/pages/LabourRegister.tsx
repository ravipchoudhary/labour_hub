import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  skills: string;
  experience: string;
  rate: string;
  rateType: string;
  about: string;
  password: string;
  confirmPassword: string;
  photo: File | null;
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    skills: "",
    experience: "",
    rate: "",
    rateType: "Per Day",
    about: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const [preview, setPreview] = useState<string | null>(null);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFormData({ ...formData, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      !formData.skills ||
      !formData.experience ||
      !formData.rate ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/labour/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          skills: [formData.skills], 
          location: formData.address,
          price: Number(formData.rate),
          experience: Number(formData.experience),
          gender: formData.gender,
          password: formData.password,
        }),


      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Worker registered successfully ✅");
      navigate("/login");

    } catch (error) {
      alert("Something went wrong");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        <div className="flex items-center justify-center py-10 px-6">
          <form
            className="w-full max-w-md space-y-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Register as a Worker
            </h2>

            <div className="flex justify-center pt-4">
              <label className="cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <div className="w-24 h-24 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden bg-orange-500 text-white text-2xl font-bold">
                  {preview ? (
                    <img
                      src={preview}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {formData.fullName
                        ? formData.fullName.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>

                <p className="text-xs mt-2 text-gray-500">
                  Upload Photo
                </p>
              </label>
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Location"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <div className="flex gap-2">
              <input
                type="number"
                name="rate"
                placeholder="Rate (₹)"
                value={formData.rate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <select
                name="rateType"
                value={formData.rateType}
                onChange={handleChange}
                className="border rounded-lg px-3"
              >
                <option>Per Day</option>
                <option>Per Hour</option>
              </select>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              Register
            </button>
          </form>
        </div>

        <div className="hidden lg:flex items-center justify-center bg-orange-500 text-white px-10">
          <div className="text-center space-y-4 max-w-sm">
            <h2 className="text-3xl font-bold">Showcase Your Skills</h2>
            <p className="text-orange-100">
              Create your profile, set your rates, and connect with employers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
