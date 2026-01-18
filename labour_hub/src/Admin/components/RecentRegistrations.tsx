import { recentRegistrations } from "../datas/recentRegistrations";

const statusStyle: Record<string, string> = {
  pending: "bg-indigo-600",
  approved: "bg-green-600",
  blocked: "bg-red-600",
};

const RecentRegistrations = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Recent Registrations</h2>
        <span className="text-sm text-gray-500 cursor-pointer">
          View All ›
        </span>
      </div>

      <div className="space-y-3">
        {recentRegistrations.map((item, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-50 items-center
             border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg 
              flex items-center justify-center">
                👤
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>

            <span
              className={`text-white text-xs px-4 py-1.5 rounded-full
                 ${statusStyle[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRegistrations;