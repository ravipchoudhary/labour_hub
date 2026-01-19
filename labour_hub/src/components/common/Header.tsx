import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-orange-500">LabourHub</Link>

            <nav className="flex gap-6 text-gray-600">
                <Link to="/" className="hover:text-orange-500">Home</Link>
                <Link to="/find-labour" className="hover:text-orange-500">Find Labour</Link>
                <a href="#">How It Works</a>
                <a href="#">About</a>
            </nav>

            <div className="flex gap-3">
                <Link to="/login" className="border px-4 py-1 rounded bg-slate-200 hover:bg-orange-500 hover:text-white inline-block">Sign In</Link>
                <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded inline-block">
                    Get Started
                </Link>
            </div>
        </header>
    );
};

export default Header;