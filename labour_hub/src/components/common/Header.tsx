import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="flex justify-between items-center px-4 sm:px-8 h-16">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={"/logo.png"}
                        alt="LabourHub Logo"
                        className="h-8 w-8 object-contain"
                    />
                    <span className="text-xl font-bold text-orange-500">
                        LabourHub
                    </span>
                </Link>

                <button
                    className="sm:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✕" : "☰"}
                </button>

                <nav className=" hidden sm:flex gap-6 text-gray-600">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Find Labour", path: "/find-labour" },
                        { name: "How It Works", path: "#" },
                        { name: "About", path: "#" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:text-orange-500 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden sm:flex gap-4">
                    <Link
                        to="/login"
                        className="border px-4 py-1 rounded bg-slate-200 hover:bg-orange-500 hover:text-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/find-labour"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {open && (
                <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 text-gray-600">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/find-labour" onClick={() => setOpen(false)}>Find Labour</Link>
                    <Link to="#" onClick={() => setOpen(false)}>How It Works</Link>
                    <Link to="#" onClick={() => setOpen(false)}>About</Link>

                    <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="border px-4 py-2 rounded bg-slate-200"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/find-labour"
                        onClick={() => setOpen(false)}
                        className="bg-orange-500 text-white px-4 py-2 rounded text-center"
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;