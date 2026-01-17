import React from 'react';
import { User, Phone, MapPin, Lock, Eye, ArrowLeft } from 'lucide-react';

const Register = () => {
  return (
    <div className="flex min-h-screen font-sans">
      {/* LEFT SIDE: THE FORM */}
      <div className="w-full lg:w-[60%] p-8 md:p-16 bg-white overflow-y-auto">
        
        
        <div className="flex items-center text-gray-500 mb-8 cursor-pointer">
          <ArrowLeft size={18} className="mr-2" />
          <span className="text-sm">Back to role selection</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="bg-brandOrange p-2 rounded-lg">
             <div className="w-5 h-5 bg-white rounded-sm"></div> 
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Labour<span className="text-brandOrange">Hub</span></h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register as a Worker</h2>
        <p className="text-gray-500 mb-6">Create your profile and start finding work opportunities</p>

        
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8">
          <div className="w-1/3 h-full bg-brandOrange rounded-full"></div>
        </div>

        
        <form className="space-y-5 max-w-lg">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="Enter your full name" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-brandOrange bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="tel" placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-brandOrange bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Address / Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="Enter your area/locality" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-brandOrange bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="password" placeholder="Create a password" className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-brandOrange bg-gray-50" />
              <Eye className="absolute right-3 top-3 text-gray-400 cursor-pointer" size={20} />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#FFBB94] hover:bg-brandOrange text-white font-semibold py-4 rounded-xl transition duration-200 mt-4">
            Continue to Skills
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account? <span className="text-brandOrange font-semibold cursor-pointer">Sign In</span>
          </p>
        </form>
      </div>

      
      <div className="hidden lg:flex w-[40%] bg-brandOrange flex-col items-center justify-center p-12 text-center">
        <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mb-8">
          <User size={64} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Showcase Your Skills</h2>
        <p className="text-white/80 text-lg max-w-sm">
          Create your profile, set your rates, and connect with employers looking for your expertise.
        </p>
      </div>
    </div>
  );
};

export default Register;