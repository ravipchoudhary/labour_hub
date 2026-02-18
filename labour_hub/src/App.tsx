import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Termsofservice from "./pages/Termsofservice";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";
import Register from "./pages/LabourRegister";
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import UserManagement from "./Admin/pages/UserManagement";
import LabourVerification from "./Admin/pages/LabourVerification";
import Registeremp from "./pages/Registeremp";
import LabourDashboard from "./pages/LabourDashboard";
import WorkerDetail from "./pages/WorkerDetail";
import HelpCenter from "./pages/HelpCenter";
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import EditLabourDetails from "./pages/EditLabourDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./Admin/ForgotPassword";
import ResetPasswordDirect from "./Admin/ResetPasswordDirect";
import AdminProfile from "./Admin/pages/AdminProfile";
import ChangePassword from "./Admin/components/ChangePasswordModal";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        <Route path="/register/worker" element={<Register />} />
        <Route path="/register/employer" element={<Registeremp />} />
        <Route path="/labour-dashboard" element={<LabourDashboard />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />
        <Route path="/edit-profile" element={<EditLabourDetails/>}/>

        <Route path="/admin/forget-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password-direct" element={<ResetPasswordDirect />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allow={["labour"]} redirectTo="/login" />}>
            <Route path="/labour-dashboard" element={<LabourDashboard />} />
            <Route path="/edit-profile" element={<EditLabourDetails />} />
          </Route>

          <Route element={<RoleRoute allow={["employee"]} redirectTo="/login" />}>
            <Route path="/find-labour" element={<FindLabour />} />
            <Route path="/worker/:id" element={<WorkerDetail />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<RoleRoute allow={["admin"]} redirectTo="/admin/login" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/labours" element={<LabourVerification />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;