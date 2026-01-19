const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white px-8 py-10 mt-10">
                <div>
                    <h2 className="text-lg font-bold">LabourHub</h2>
                    <p className="text-sm mt-2">
                        Connecting skilled workers with employers.
                    </p>
                </div>
                

            <div className="grid grid-cols-3 gap-6 mt-8">
                <div>
                    <h3 className="font-semibold mb-2">Contact Us</h3>
                    <ul className="text-sm space-y-1">
                        <li>info@labourhub.com</li>
                        <li>+91 9876543210</li>
                        <li>Support@labourhub.com</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="text-sm space-y-1">
                        <li>Find Labour</li>
                        <li>Register as Worker</li>
                        <li>For Employer</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Support</h3>
                    <ul className="text-sm space-y-1">
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;