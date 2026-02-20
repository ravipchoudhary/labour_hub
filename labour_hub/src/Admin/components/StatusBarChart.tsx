interface Props {
  active: number;
  pending: number;
  blocked: number;
  total: number;
}

const StatusBarChart = ({ active, pending,blocked, total }: Props) => {

  const data = [
    { label: "Approved", value: active, color: "bg-blue-600" },
    { label: "Pending", value: pending, color: "bg-pink-500" },
    { label: "Blocked", value: blocked < 0 ? 0 : blocked, color: "bg-emerald-500" },
  ];

  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold mb-6 text-center">
        Status Overview
      </h2>

      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-6">
            <div className="w-24 text-sm font-medium text-gray-700">
              {item.label}
            </div>

            <div className="flex-1 bg-gray-100 rounded-full h-6">
              <div
                className={`${item.color} h-6 rounded-full transition-all duration-500`}
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>

            <div className="w-12 text-sm font-semibold text-gray-600 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBarChart;