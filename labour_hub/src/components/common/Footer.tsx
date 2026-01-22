import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white px-4 sm:px-8 py-10 mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-bold">LabourHub</h2>
                    <p className="text-sm mt-2 text-blue-100 max-w-md">
                        Connecting skilled workers with employers quickly and safely.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold mb-3">Quick Links</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li className="hover:underline cursor-pointer">Find Labour</li>
                            <li className="hover:underline cursor-pointer">Register as Worker</li>
                            <li className="hover:underline cursor-pointer">For Employer</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Contact Us</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li>info@labourhub.com</li>
                            <li>+91 98765 43210</li>
                            <li>support@labourhub.com</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li className="hover:underline cursor-pointer">Help Center</li>
                            <li> <Link to="/privacy-policy" className="hover:underline cursor-pointer">Privacy Policy</Link></li>
                            <li className="hover:underline cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-700 mt-10 pt-4 text-center text-xs text-blue-200">
                    © {new Date().getFullYear()} LabourHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;