import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const earningsData = [
  { month: "Aug", earning: 6000 },
  { month: "Sep", earning: 8500 },
  { month: "Oct", earning: 7200 },
  { month: "Nov", earning: 9800 },
  { month: "Dec", earning: 11000 },
  { month: "Jan", earning: 12500 },
];

const jobData = [
  { name: "Completed", value: 28 },
  { name: "Pending", value: 4 },
  { name: "Rejected", value: 3 },
];

const completedJobs = [
  { id: 1, work: "House Wiring", location: "Sector 62, Noida", amount: 1200 },
  { id: 2, work: "Inverter Installation", location: "Sector 18, Noida", amount: 1800 },
];

const pendingJobs = [
  { id: 3, work: "Fan Repair", location: "Sector 50, Noida", amount: 500 },
  { id: 4, work: "Switch Board Fix", location: "Sector 12, Noida", amount: 300 },
];

export default function LabourDashboard() {
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* ================= PROFILE ================= */}
      <div className="bg-white rounded-2xl shadow p-6 flex justify-between">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center text-3xl">
            👷
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Rajesh Kumar</h2>
            <p className="text-gray-500">Electrician • Noida, UP</p>
            <p className="text-yellow-500">⭐ 4.6 Rating</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setAvailable(!available)}
            className={`px-4 py-2 rounded-full text-sm ${
              available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {available ? "Available for Work" : "Unavailable"}
          </button>

          <button className="px-5 py-2 bg-orange-500 text-white rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total Jobs" value="35" />
        <Stat
          title="Completed Jobs"
          value="28"
          clickable
          onClick={() => setActiveTab("completed")}
        />
        <Stat
          title="Pending Requests"
          value="4"
          clickable
          onClick={() => setActiveTab("pending")}
        />
        <Stat title="Total Earnings" value="₹42,500" />
      </div>

      {/* ================= DASHBOARD ================= */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earning"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Job Status Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={jobData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#fb923c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ================= HISTORY TAB ================= */}
      {activeTab !== "dashboard" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">
              {activeTab === "completed"
                ? "Completed Jobs History"
                : "Pending Jobs History"}
            </h3>

            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-orange-600"
            >
              ← Back
            </button>
          </div>

          <div className="space-y-4">
            {(activeTab === "completed"
              ? completedJobs
              : pendingJobs
            ).map((job) => (
              <div
                key={job.id}
                className="border rounded-xl p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">{job.work}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <p className="font-semibold text-orange-600">
                  ₹{job.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STAT COMPONENT ================= */

const Stat = ({ title, value, clickable, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl shadow p-5 ${
      clickable
        ? "cursor-pointer hover:bg-orange-50 hover:shadow-lg"
        : ""
    }`}
  >
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-semibold mt-2">{value}</h3>
  </div>
);
