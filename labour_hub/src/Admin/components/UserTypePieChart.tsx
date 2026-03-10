interface Props {
  labour: number;
  employers: number;
}

const UserTypePieChart = ({ labour, employers }: Props) => {
  const total = labour + employers;
  const employerDeg = total === 0 ? 0 : (employers / total) * 360;

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
      <h2 className="text-sm font-semibold mb-6 text-center">
        User Distribution
      </h2>

      <div className="flex items-center justify-center gap-8">

        <div
          className="w-44 h-44 rounded-full"
          style={{
            background: `conic-gradient(
              #6366f1 0deg ${employerDeg}deg,
              #22c55e ${employerDeg}deg 360deg
            )`,
          }}
        />

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-indigo-500 rounded-full" />
            <div>
              <p className="font-medium">Employers</p>
              <p className="text-xs text-gray-500">{employers}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <div>
              <p className="font-medium">Labour</p>
              <p className="text-xs text-gray-500">{labour}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserTypePieChart;