import { useState } from "react";

const LabourDashboard = () => {
  const [available, setAvailable] = useState(true);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* TITLE */}
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Manage your profile and track your performance
      </p>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Profile Views" value="124" />
        <StatCard title="Calls Received" value="32" />
        <StatCard title="Rating" value="4.8" />
        <StatCard title="Jobs Done" value="156" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* PROFILE INFO */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button className="border px-4 py-1 rounded-lg text-sm">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" value="Rajesh Kumar" />
            <Input label="Phone Number" value="+91 9876543210" />
            <Input label="Experience (Years)" value="8" />
            <Input label="Daily Rate (₹)" value="600 / Day" />
          </div>

          <div className="mt-4">
            <Input label="Address" value="Sector 18, Noida, UP" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              About Me
            </label>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={3}
              value="Experienced electrician with expertise in residential and commercial wiring, AC installation and repair."
              readOnly
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Skills</label>
            <div className="flex gap-2">
              <SkillTag text="Electrician" />
              <SkillTag text="Wiring" />
              <SkillTag text="AC Repair" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* AVAILABILITY */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Availability Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-green-600">
                {available ? "Available for work" : "Not available"}
              </span>
              <input
                type="checkbox"
                checked={available}
                onChange={() => setAvailable(!available)}
              />
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <ActionButton text="View My Public Profile" />
            <ActionButton text="Set Working Hours" />
            <ActionButton text="Update Location" />
          </div>

          {/* TIPS */}
          <div className="bg-orange-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">💡 Profile Tips</h3>
            <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
              <li>Add more skills to appear in searches</li>
              <li>Keep your phone number updated</li>
              <li>Set competitive rates</li>
              <li>Update availability regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabourDashboard;

/* ---------- SMALL COMPONENTS ---------- */

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
  </div>
);

const Input = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className="w-full border rounded-lg p-2"
      value={value}
      readOnly
    />
  </div>
);

const SkillTag = ({ text }: { text: string }) => (
  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
    {text}
  </span>
);

const ActionButton = ({ text }: { text: string }) => (
  <button className="w-full border rounded-lg py-2 mb-2 text-sm">
    {text}
  </button>
);
