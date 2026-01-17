import React from "react";

const Login = () => {
  return (
<div className="min-h-screen w-full bg-gradient-to-br from-[#c7e7ff] via-[#ffd6a5] to-[#ffb4c6] flex items-center justify-center">      <div className="relative w-[900px] h-[480px] bg-white 
      rounded-2xl shadow-xl overflow-hidden">

        {/* BLUE SHAPE */}
        <div className="absolute left-0 top-0 h-full w-[55%]
         bg-[#fb923c] rounded-r-[180px]"></div>

        {/* LEFT */}
        <div className="absolute left-0 top-0 h-full w-[55%] 
        flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-3xl font-bold mb-3">Hello, Welcome!</h2>
            <p className="text-sm mb-6 opacity-90">
              Don&apos;t have an account?
            </p>
            <button className="border border-white px-8 py-2 
            rounded-full text-sm hover:bg-white 
            hover:text-[#7a97f5] transition">
              Register
            </button>
          </div>
        </div>

        {/* RIGHT  */}
        <div className="absolute right-0 top-0 
        h-full w-[45%] flex flex-col justify-center px-14">
          <h2 className="text-3xl font-bold text-gray-800 
          mb-8 text-center">
            Login
          </h2>

          {/* Username */}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-gray-100 px-4 py-3 
              rounded-lg outline-none focus:ring-2 focus:ring-[#7a97f5]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              👤
            </span>
          </div>

          {/* Password */}
          <div className="mb-2 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 px-4 py-3 
              rounded-lg outline-none focus:ring-2 focus:ring-[#7a97f5]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔒
            </span>
          </div>

          <div className="text-center mt-2 text-sm  
          text-gray-900 mb-6 cursor-pointer hover:font-bold  ">
            Forgot Password?
          </div>

          <button className="w-full bg-[#fb923c] 
          text-white py-3 rounded-lg font-semibold hover:font-bold bg-[#fb923c] transition">
            Login
          </button>

          <div className="text-center text-sm
           text-gray-500 mt-6">
            or login with social platforms
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {["G", "f", "Ø", "in"].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 text-black font-bold
                 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;