import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/admin/all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const found = res.data.users.find((u: any) => u._id === id);
        setUser(found);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[900px] mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-semibold mb-6">
            {user.name}
          </h2>

          <div className="space-y-3">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;