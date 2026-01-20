const StatusBarChart = () => {
  const data = [
    { label: "Approved", value: 2500, fontBold: true, color: "bg-blue-600" },
    { label: "Pending", value: 470, fontBold: true, color: "bg-pink-500" },
    { label: "Blocked", value: 79, fontBold: true, color: "bg-emerald-500" },
  ];

  const maxValue = 3000;
  const xAxis = [0, 500, 1000, 1500, 2000, 2500, 3000];

  return (
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-sm font-semibold mb-6 text-center">
        Status Bar Chart
      </h2>

      
      <div className="space-y-8 relative mb-6">
        <div className="absolute inset-y-0 left-24 right-12 flex justify-between">
          {xAxis.map((_, i) => (
            <div key={i} className="w-px bg-gray-200 opacity-40" />
          ))}
        </div>

        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-6">
            <div className="w-24 text-sm font-semibold text-gray-700">
              {item.label}
            </div>

            
            <div className="flex-1">
              <div
                className={`${item.color} h-8`}
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>

            <div className="w-12 text-sm font-semibold text-gray-600">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-between pl-24 pr-12 text-xs text-gray-500">
        {xAxis.map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>
    </div>
  );
};

export default StatusBarChart;