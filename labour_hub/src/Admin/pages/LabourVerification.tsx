import { useEffect, useState } from "react";
import TopBar from "../components/Topbar";

type Labour = {
  _id: string;
  name: string;
  skill: string;
  document: string;
  status: "pending" | "approved" | "blocked";
};

const LabourVerification = () => {
  const [data, setData] = useState<Labour[]>([]);
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    fetchLabours();
    const handler = (e: any) => setGlobalSearch(e.detail || "");
    window.addEventListener("admin-search", handler);
    return () => window.removeEventListener("admin-search", handler);
  }, []);

  const fetchLabours = async () => {
    const res = await fetch("http://localhost:4000/admin/labour-verification");
    const result = await res.json();
    if (result.success) {
      setData(result.labours);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "blocked") => {
    const res = await fetch(
      `http://localhost:4000/admin/labour-verification-status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    const result = await res.json();

    if (result.success) {
      setData((prev) => prev.filter((l) => l._id !== id));
    }
  };

  const filteredLabours = data
    .filter((l) => l.status === "pending")
    .filter((l) =>
      l.name.toLowerCase().includes(globalSearch.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Labour Verification
        </h1>

        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr className="h-[56px]">
                  <th className="px-6 text-left w-[20%]">Name</th>
                  <th className="px-6 text-left w-[20%]">Skill</th>
                  <th className="px-6 text-left w-[20%]">Document</th>
                  <th className="px-6 text-center w-[20%]">Status</th>
                  <th className="px-6 text-center w-[20%]">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredLabours.map((l) => (
                  <tr
                    key={l._id}
                    className="border-t h-[64px] hover:bg-gray-50"
                  >
                    <td className="px-6 align-middle font-medium">
                      {l.name}
                    </td>

                    <td className="px-6 align-middle">
                      {l.skill}
                    </td>

                    <td className="px-6 align-middle">
                      <a
                        href={l.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        View Document
                      </a>
                    </td>

                    <td className="px-6 align-middle text-center">
                      <span className="px-4 py-1 rounded-full text-xs text-white bg-indigo-600">
                        pending
                      </span>
                    </td>

                    <td className="px-6 align-middle text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() =>
                            updateStatus(l._id, "approved")
                          }
                          className="text-green-600 font-bold text-xl"
                        >
                          ✔
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(l._id, "blocked")
                          }
                          className="text-red-600 font-bold text-xl"
                        >
                          ✖
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLabours.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No labour pending verification
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabourVerification;