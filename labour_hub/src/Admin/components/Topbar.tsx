const TopBar = () => {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
          🔒
        </div>
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center border rounded-lg px-3 py-2">
          <input
            placeholder="Search Users......."
            className="outline-none text-sm"
          />
        </div>
        <span className="text-lg">🔔</span>
        <button className="text-sm font-medium">Logout</button>
      </div>
    </div>
  );
};

export default TopBar;