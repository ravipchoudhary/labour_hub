import { Link } from "react-router-dom";
import { useState } from "react";



type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Registeremp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    password: "",
    confirmPassword: "",
  });

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.location &&
    formData.about &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    // API call will go here later
    console.log("Employer Registered:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-8">

        {/* Left Section – Form */}
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Register as an Employer
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Create your account and start hiring skilled workers
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Your Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
            />

            <Input
              label="Email Address"
              placeholder="Enter your email id"
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              name="phone"
            />

            <Input
              label="Address / Location"
              placeholder="Enter your area/locality"
              value={formData.location}
              onChange={handleChange}
              name="location"
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                About yourself
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Brief about yourself and hiring needs..."
                className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />

            {formData.password &&
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-500">
                  Passwords do not match
                </p>
              )}

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2.5 rounded-md font-semibold transition ${
                isFormValid
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Section – Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/employer-illustration.svg"
            alt="Employer Illustration"
            className="w-64 lg:w-96 h-auto"
          />
        </div>
      </div>

  );
};

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}: InputProps & { name: string }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
      required
    />
  </div>
);

export default Registeremp;
