import { useState, useEffect } from "react";
import axios from "axios";
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


type TabType = "dashboard" | "completed" | "pending";

interface Job {
  id: string;
  work: string;
  location: string;
  amount: number;
}

interface LabourProfile {
  name: string;
  role: string;
  rating: number;
  city: string;
  profession: string;
  available: boolean;
}

interface StatProps {
  title: string;
  value: string;
  onClick?: () => void;
}


const Stat: React.FC<StatProps> = ({ title, value, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl shadow p-5 transition 
    ${onClick ? "cursor-pointer hover:bg-orange-50 hover:shadow-lg" : ""}`}
  >
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-semibold mt-2">{value}</h3>
  </div>
);

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="border rounded-xl p-4 flex justify-between hover:shadow-md transition">
    <div>
      <p className="font-medium">{job.work}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
    </div>
    <p className="font-semibold text-orange-600">₹{job.amount}</p>
  </div>
);


export default function LabourDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [profile, setProfile] = useState<LabourProfile | null>(null);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [available, setAvailable] = useState<boolean>(true);

  const [earningsData, setEarningsData] = useState(
    [
      { month: "Jan", earning: 0 },
      { month: "Feb", earning: 0 },
      { month: "Mar", earning: 0 },
      { month: "Apr", earning: 0 },
      { month: "May", earning: 0 },
      { month: "Jun", earning: 0 },
    ]
  );

  const [jobStats, setJobStats] = useState([
    { name: "Completed", value: 0 },
    { name: "Pending", value: 0 },
    { name: "Rejected", value: 0 },
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileRes = await axios.get(
          "http://localhost:4000/api/labour/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(profileRes.data);
        setAvailable(profileRes.data.available);

        const jobsRes = await axios.get(
          "http://localhost:4000/api/labour/jobs",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCompletedJobs(jobsRes.data.completedJobs);
        setPendingJobs(jobsRes.data.pendingJobs);

        setJobStats([
          { name: "Completed", value: jobsRes.data.completedJobs.length },
          { name: "Pending", value: jobsRes.data.pendingJobs.length },
          { name: "Rejected", value: jobsRes.data.rejectedJobs?.length || 0 },
        ]);

        const monthlyEarnings = [
          { month: "Jan", earning: 0 },
          { month: "Feb", earning: 0 },
          { month: "Mar", earning: 0 },
          { month: "Apr", earning: 0 },
          { month: "May", earning: 0 },
          { month: "Jun", earning: 0 },
        ];

        jobsRes.data.completedJobs.forEach((job: Job & { month: string }) => {
          const monthIndex = monthlyEarnings.findIndex(
            (m) => m.month === job.month
          );
          if (monthIndex >= 0) {
            monthlyEarnings[monthIndex].earning += job.amount;
          }
        });

        setEarningsData(monthlyEarnings);
      } catch (err) {
        console.error("Failed to fetch profile/jobs:", err);
      }
    };

    fetchProfile();
  }, []);

  const jobsToRender = activeTab === "completed" ? completedJobs : pendingJobs;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      <div className="bg-white rounded-2xl shadow p-6 flex justify-between flex-wrap gap-6">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center text-3xl">
            👷
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{profile?.name || "Loading..."}</h2>
            <p className="text-gray-500">{profile?.profession} • {profile?.city}</p>
            <p className="text-yellow-500">⭐ {profile?.rating || 0} Rating</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.patch(
                  "http://localhost:4000/api/labour/availability",
                  { available: !available },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setAvailable(!available);
              } catch (err) {
                console.error(err);
              }
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium
            ${available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {available ? "Available for Work" : "Unavailable"}
          </button>

          <button className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total Jobs" value={`${completedJobs.length + pendingJobs.length}`} />
        <Stat
          title="Completed Jobs"
          value={`${completedJobs.length}`}
          onClick={() => setActiveTab("completed")}
        />
        <Stat
          title="Pending Requests"
          value={`${pendingJobs.length}`}
          onClick={() => setActiveTab("pending")}
        />
        <Stat
          title="Total Earnings"
          value={`₹${completedJobs.reduce((acc, job) => acc + job.amount, 0)}`}
        />
      </div>

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
              <BarChart data={jobStats}>
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

      {activeTab !== "dashboard" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h3 className="font-semibold text-lg">
              {activeTab === "completed" ? "Completed Jobs History" : "Pending Jobs History"}
            </h3>

            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-orange-600 font-medium"
            >
              ← Back
            </button>
          </div>

          <div className="space-y-4">
            {jobsToRender.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}