import { useEffect, useState } from "react";
import TopBar from "../components/Topbar";
import { labours } from "../datas/labours";

const LabourVerification = () => {
  const [data, setData] = useState(labours);
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    const handler = (e: any) => setGlobalSearch(e.detail || "");
    window.addEventListener("admin-search", handler);
    return () => window.removeEventListener("admin-search", handler);
  }, []);

  
  const filteredLabours = data.filter(l =>
    l.name.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const updateStatus = (id: number, status: string) => {
    setData(prev =>
      prev.map(l =>
        l.id === id ? { ...l, status } : l
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Labour Verification
        </h1>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th>Skill</th>
                  <th>Document</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredLabours.map(l => (
                  <tr key={l.id} className="border-t">
                    <td className="p-4 font-medium">{l.name}</td>
                    <td>{l.skill}</td>
                    <td>{l.document}</td>
                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full text-white ${
                          l.status === "pending"
                            ? "bg-indigo-600"
                            : l.status === "approved"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="text-center space-x-2">
                      {l.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(l.id, "approved")}
                            className="text-green-600 font-bold text-2xl"
                          >
                            ✔
                          </button>
                          <button
                            onClick={() => updateStatus(l.id, "blocked")}
                            className="text-red-600 font-bold text-2xl"
                          >
                            ✖
                          </button>
                        </>
                      )}
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