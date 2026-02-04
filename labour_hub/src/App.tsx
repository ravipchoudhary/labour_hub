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
import EditLabourDetails from "./pages/EditLabourDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NewRegister from "./Admin/NewRegister"

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
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-labour" element={<FindLabour />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
        {/* Admin route */}
        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/admin/register" element={<NewRegister />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/users" element={<UserManagement />}></Route>
        <Route path="/admin/labours" element={<LabourVerification />}></Route>

        {/* {!isAdminPage && <Footer />} */}
        
      
        <Route path="/register/worker" element={<Register />} />
        <Route path="/register/employer" element={<Registeremp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/labour-dashboard" element={<LabourDashboard />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;