import React from "react";
import { Link } from "react-router-dom";

import {
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Car,
  Scissors,
  Plug,
  Users,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

const Landing: React.FC = () => {
  return (
    <main className="w-full font-sans text-gray-800">
      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-[#0B3C88] flex items-center px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Skilled <span className="text-[#FF7A00]">Workers</span> Near
            You
          </h1>

          <p className="text-blue-100 max-w-3xl mx-auto mb-12 text-lg">
            Connect with verified local labourers for construction, plumbing,
            electrical work and more. Hire instantly with just a call.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <Input icon={<Search size={18} />} placeholder="Skill required" />
            <Input icon={<MapPin size={18} />} placeholder="Location" />

            <button className="bg-[#FF7A00] px-10 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-600 transition">
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="min-h-screen flex items-center bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FF7A00] font-semibold mb-3">Why Choose Us</p>
          <h2 className="text-4xl font-bold mb-6">
            The Smarter Way to Hire Labour
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-14 text-lg">
            We simplify the labour hiring process using smart, reliable
            technology built for everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Feature icon={<MapPin size={28} />} title="Nearby Workers" />
            <Feature
              icon={<ShieldCheck size={28} />}
              title="Verified Profiles"
            />
            <Feature
              icon={<Clock size={28} />}
              title="Real-Time Availability"
            />
            <Feature icon={<Zap size={28} />} title="Instant Hiring" />
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FF7A00] font-semibold mb-3">
            Popular Categories
          </p>
          <h2 className="text-4xl font-bold mb-12">Find Workers by Skill</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
            <Skill icon={<Plug size={28} />} name="Electrician" />
            <Skill icon={<Wrench size={28} />} name="Plumber" />
            <Skill icon={<Hammer size={28} />} name="Carpenter" />
            <Skill icon={<Users size={28} />} name="Mason" />
            <Skill icon={<Zap size={28} />} name="Welder" />
            <Skill icon={<Car size={28} />} name="Driver" />
            <Skill icon={<Scissors size={28} />} name="Tailor" />
            <Skill icon={<Paintbrush size={28} />} name="Painter" />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="min-h-screen flex items-center bg-gray-50 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FF7A00] font-semibold mb-3">How It Works</p>
          <h2 className="text-4xl font-bold mb-14">
            Hire Workers in 4 Simple Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Link to="/find-labour" className="block">
              <Step icon={<Search />} title="Search Worker" />
            </Link>
            <Step icon={<Users />} title="View Profile" />
            <Step icon={<PhoneCall />} title="Contact Directly" />
            <Step icon={<CheckCircle />} title="Get Work Done" />
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ icon, placeholder }: any) => (
  <div className="flex items-center bg-white rounded-lg px-5 w-full md:w-72">
    <span className="text-gray-400 mr-3">{icon}</span>
    <input
      type="text"
      placeholder={placeholder}
      className="py-4 w-full outline-none text-gray-700"
    />
  </div>
);

const Feature = ({ icon, title }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7A00] mb-5">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
  </div>
);

const Skill = ({ icon, name }: any) => (
  <div className="border rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-[#FF7A00] hover:shadow transition cursor-pointer">
    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7A00]">
      {icon}
    </div>
    <h3 className="font-medium">{name}</h3>
    <p className="text-sm text-gray-500">110+ Workers</p>
  </div>
);

const Step = ({ icon, title }: any) => (
  <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7A00] mb-6">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="font-semibold text-xl mb-3">{title}</h3>
    <p className="text-gray-600">Simple, fast and reliable process.</p>
  </div>
);

export default Landing;
