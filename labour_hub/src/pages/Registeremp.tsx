import { Link } from "react-router-dom";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
};

const Registeremp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg grid md:grid-cols-2 gap-10 p-8">

        {/* Left Section – Form */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-black">Labour</span>
              <span className="text-orange-500">Hub</span>
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-2">Register as an Employer</h2>
          <p className="text-gray-500 mb-6">
            Create your account and start hiring skilled workers
          </p>

          {/* Form */}
          <form className="space-y-4">
            <Input label="Your Name" placeholder="Enter your full name" />
            <Input label="Email Address" placeholder="Enter your email id" />
            <Input label="Phone Number" placeholder="Enter your phone number" />
            <Input label="Address / Location" placeholder="Enter your area/locality" />

            <div>
              <label className="block text-sm font-medium mb-1">
                About yourself
              </label>
              <textarea
                placeholder="Brief about yourself and hiring needs..."
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="Create your password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Section – Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/images/employer-illustration.svg"
            alt="Employer Illustration"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};


const Input = ({ label, type = "text", placeholder }: InputProps) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
);

export default Registeremp;
