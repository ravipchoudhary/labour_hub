import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="flex justify-between items-center px-4 sm:px-8 h-16">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="LabourHub Logo"
            className="h-15 w-12 object-contain"
          />
          <span className="text-xl font-bold text-orange-500">
            Urban Force
          </span>
        </Link>

        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className="hidden sm:flex gap-6 text-gray-600">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/find-labour" className="hover:text-orange-500">
            Find Labour
          </Link>
          <Link
            to="/how-it-works"
            className="hover:text-orange-500"
          >
            How It Works
          </Link>
          <Link to="/about-us" className="hover:text-orange-500">About</Link>
        </nav>

        <div className="hidden sm:flex gap-4">
          <Link
            to="/login"
            className="border px-4 py-1 rounded bg-slate-200 hover:bg-orange-500 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/Home"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>

      {open && (
        <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 text-gray-600">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/find-labour" onClick={() => setOpen(false)}>
            Find Labour
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link to="/about-us" onClick={() => setOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
