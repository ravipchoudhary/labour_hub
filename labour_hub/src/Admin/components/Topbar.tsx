import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("admin-search", { detail: search })
    );
  }, [search]);

  return (
    <div className="bg-white border-b px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      
      
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Urban Force"
          className="h-16 w-auto object-contain"
        />
        <h1 className="text-base md:text-lg font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3">
        
        
        <div className="hidden md:flex items-center border rounded-lg px-3 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Users......."
            className="outline-none text-sm w-48"
          />
        </div>

        <span className="text-lg">🔔</span>

        <button
          onClick={() => navigate("/admin/login")}
          className="text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;