import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center
     justify-center bg-gradient-to-r
      from-gray-100 to-blue-100">

      {/* CARD */}
      <div className="relative w-[900px] h-[480px]
       bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* BLUE SHAPE */}
        <div className="absolute left-0 top-0 h-full
         w-[50%] bg-[#7a97f5] rounded-r-[140px]"></div>

        {/* LEFT */}
        <div className="absolute left-0 top-0 h-full
         w-[55%] flex items-center justify-center">
          
          <div className="text-center text-white px-12">
            <h2 className="text-3xl font-bold mb-3">Hello, Welcome!</h2>
            <p className="text-sm mb-6 opacity-90">
              Don't have an account?
            </p>
            <button className="border border-white px-8
             py-2 rounded-full text-sm ">
              Register
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 
        h-full w-[45%] flex flex-col justify-center pt-14">
        <h2 className="text-3xl font-bold text-gray-750 
        mr-8 text-center">Login</h2>
{/* username */}
        <div className="mb-4 relative">
          <input type="text"
          placeholder="username"
          className="w-full bg-gray-100 px-4 py-3 rounded-lg  "/>
          <span className="absolute right-4 top-1/2  text-gray-100 ">👤</span>
        </div>
{/* password */}
         <div className="mb-2 relative"></div>
         <input type="password"
         placeholder="password"
         className="w-full bg-gray-100 px-4 py-3 rounded-lg "/>
          <span className="absolute right-4 top-3/2 mt-3 text-gray-100 ">👤</span>
         

        </div>

      </div>
    </div>
  );
};

export default Login;