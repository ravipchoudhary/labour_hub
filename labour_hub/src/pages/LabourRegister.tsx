import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFormData({ ...formData, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.gender ||
      !formData.skills ||
      !formData.experience ||
      !formData.rate ||
      !formData.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("FORM DATA:", formData);
    alert("Worker registered successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* FORM */}
        <div className="flex items-center justify-center py-10 px-6">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>

           {/* BACK TEXT */}
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-orange-500"
            >
              ← Back to role selection
            </button>

            {/* PHOTO UPLOAD */}
            <div className="flex justify-center pt-4">
              <label className="cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <div className="w-24 h-24 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold">
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

            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Register as a Worker
            </h2>

            <p className="text-sm text-gray-500 text-center">
              Create your profile and start finding work
            </p>

            {/* FULL NAME */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* SKILLS */}
            <div>
              <label className="text-sm font-medium">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="text-sm font-medium">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* RATE */}
            <div>
              <label className="text-sm font-medium">Your Rate (₹)</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  name="rate"
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
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            {/* REGISTER */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              Register
            </button>
          </form>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden lg:flex items-center justify-center bg-orange-500 text-white px-10">
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-28 h-28 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/30" />
            </div>
            <h2 className="text-3xl font-bold">Showcase Your Skills</h2>
            <p className="text-orange-100">
              Create your profile, set your rates, and connect with employers
              looking for your expertise.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
