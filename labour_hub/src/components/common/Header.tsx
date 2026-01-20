import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
      <header className="bg-white shadow px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-orange-500">
            LabourHub
          </Link>
          <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>
            ☰
          </button>
          <nav className="hidden sm:flex gap-6 text-gray-600">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link to="/find-labour" className="hover:text-orange-500">
              Find Labour
            </Link>
            <a href="#how-it-works" className="hover:text-orange-500">
              How It Works
            </a>
            <a href="#">About</a>
          </nav>

          <div className="hidden sm:flex gap-4 ">
            <Link
              to="/login"
              className="border px-4 py-1 rounded bg-slate-200 hover:bg-orange-500 hover:text-white inline-block"
            >
              Sign In
            </Link>
            <Link
              to="/Home"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
        {open && (
          <div className="sm:hidden mt-4 flex flex-col gap-4 text-gray-600">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/find-labour" onClick={() => setOpen(false)}>
              Find Labour
            </Link>
            <a href="#how-it-works" onClick={() => setOpen(false)}>
              How It Works
            </a>
            <a href="#">About</a>

            <Link
              to="/login"
              className="border px-4 py-2 rounded bg-slate-200"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>

            <Link
              to="/Home"
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </header>
    );
};

export default Header;