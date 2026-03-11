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
      percent: total ? (active / total) * 100 : 0,
      gradient: "from-green-600 via-green-400 to-emerald-300",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)]",
      accent: "bg-green-400",
    },
    {
      label: "Pending",
      percent: total ? (pending / total) * 100 : 0,
      gradient: "from-amber-500 via-yellow-400 to-orange-200",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.6)]",
      accent: "bg-yellow-400",
    },
    {
      label: "Blocked",
      percent: total ? (safeBlocked / total) * 100 : 0,
      gradient: "from-red-600 via-red-400 to-rose-300",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.6)]",
      accent: "bg-red-400",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100/50 h-full flex flex-col">
      <h2 className="text-xs uppercase tracking-widest font-bold text-center mb-8 text-gray-600">
        Status Overview
      </h2>

      <div className="relative flex-1 px-4">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
          <div className="border-t border-gray-50"></div>
          <div className="border-t border-gray-50"></div>
          <div className="border-t border-gray-50"></div>
        </div>

        <div className="grid grid-cols-[120px_1fr] h-full relative z-10">
          <div className="grid grid-rows-3 text-xs font-bold text-gray-600 italic">
            <span className="flex items-center">APPROVED</span>
            <span className="flex items-center">PENDING</span>
            <span className="flex items-center">BLOCKED</span>
          </div>

          <div className="flex justify-around items-end gap-12 h-full">
            {data.map((item) => (
              <div key={item.label} className="group flex flex-col items-center gap-3 cursor-pointer relative">
                <div className="absolute -top-8 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-top-10">
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${item.accent} shadow-lg`}>
                    {item.label}
                  </span>
                </div>

                <span className="text-base font-black text-gray-800 transition-all duration-300 group-hover:scale-125 group-hover:text-black">
                  {item.percent.toFixed(0)}%
                </span>

                <div className={`relative w-20 h-40 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden transition-all duration-500 ease-out ${item.glow} group-hover:-translate-y-1`}>
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-t ${item.gradient} transition-all duration-700 ease-in-out group-hover:saturate-150 group-hover:brightness-105`}
                    style={{
                      height: `${item.percent}%`,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/30 blur-[1px]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_3s_infinite]"></div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBarChart;