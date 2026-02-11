import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Termsofservice from "./pages/Termsofservice";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";
import Register from "./pages/LabourRegister";
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import UserManagement from "./Admin/pages/UserManagement"
import LabourVerification from "./Admin/pages/LabourVerification";
import Registeremp from "./pages/Registeremp";
import LabourDashboard from "./pages/LabourDashboard";
import WorkerDetail from "./pages/WorkerDetail";
import HelpCenter from "./pages/HelpCenter";
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import EditLabourDetails from "./pages/EditLabourDetails";
// import EditLabourDetails from "./pages/EditLabourDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NewRegister from "./Admin/NewRegister"
import ForgotPassword from "./Admin/ForgotPassword";
import ResetPasswordDirect from "./Admin/ResetPasswordDirect";


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminPage && <Header />}
      {/* <Header /> */}

      <Routes>
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-labour" element={<FindLabour />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
        {/* Admin route */}
        <Route path="/admin/login" element={<Login />}/>
        <Route path="/admin/register" element={<NewRegister />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/users" element={<UserManagement />}/>
        <Route path="/admin/labours" element={<LabourVerification />}/>
        <Route path="/admin/forget-password" element={<ForgotPassword />}/>
        <Route path="/admin/reset-password-direct" element={<ResetPasswordDirect />}/>
        

      
        <Route path="/register/worker" element={<Register />} />
        <Route path="/register/employer" element={<Registeremp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/labour-dashboard" element={<LabourDashboard />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />
      </Routes>
      {!isAdminPage && <Footer />}
      {/* <Footer /> */}
    </>
  );
}

export default App;