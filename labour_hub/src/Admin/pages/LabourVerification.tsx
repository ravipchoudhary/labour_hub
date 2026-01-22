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

  const filteredLabours = data.filter((l) =>
    l.name.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const updateStatus = (id: number, status: string) => {
    setData((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl font-semibold mb-6">Labour Verification</h1>

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
                    key={l.id}
                    className="border-t h-[64px] hover:bg-gray-50">
                    
                    <td className="px-6 align-middle">
                      <div className="flex items-center h-full">
                        <span className="font-medium">{l.name}</span>
                      </div>
                    </td>

                    
                    <td className="px-6 align-middle">
                      <div className="flex items-center h-full">
                        {l.skill}
                      </div>
                    </td>
                    <td className="px-6 align-middle">
                      <div className="flex items-center h-full">
                        {l.document}
                      </div>
                    </td>
                    <td className="px-6 align-middle text-center">
                      <div className="flex justify-center items-center h-full">
                        <span
                          className={`px-4 py-1 rounded-full text-xs 
                            text-white ${
                            l.status === "pending"
                              ? "bg-indigo-600"
                              : l.status === "approved"
                              ? "bg-green-600"
                              : "bg-red-500"
                          }`}
                        >
                          {l.status}
                        </span>
                      </div>
                    </td>

                    
                    <td className="px-6 align-middle text-center">
                      <div className="flex justify-center items-center
                       h-full gap-4">
                        {l.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(l.id, "approved")
                              }
                              className="text-green-600 font-bold text-xl"
                              title="Approve"
                            >
                              ✔
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(l.id, "blocked")
                              }
                              className="text-red-600 font-bold text-xl"
                              title="Block"
                            >
                              ✖
                            </button>
                          </>
                        )}
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