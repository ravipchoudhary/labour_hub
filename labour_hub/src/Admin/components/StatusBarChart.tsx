interface Props {
  active: number;
  pending: number;
  blocked: number;
  total: number;
}

const StatusBarChart = ({ active, pending, blocked, total }: Props) => {
  const safeBlocked = blocked < 0 ? 0 : blocked;

  const data = [
    {
      label: "Approved",
      value: active,
      percent: total ? (active / total) * 100 : 0,
      color: "bg-blue-600",
    },
    {
      label: "Pending",
      value: pending,
      percent: total ? (pending / total) * 100 : 0,
      color: "bg-pink-500",
    },
    {
      label: "Blocked",
      value: safeBlocked,
      percent: total ? (safeBlocked / total) * 100 : 0,
      color: "bg-emerald-500",
    },
  ];

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
                  width: `${item.percent}%`,
                }}
              />
            </div>

            <div className="w-20 text-sm font-semibold text-gray-600 text-right">
              {item.value} ({item.percent.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBarChart;