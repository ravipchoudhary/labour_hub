import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";
import Register from "./pages/LabourRegister";
import Home from "./pages/Home";
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import UserManagement from "./Admin/pages/UserManagement"
import LabourVerification from "./Admin/pages/LabourVerification";

function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminPage && <Header />}
      {/* <Header /> */}

      <Routes>
        <Route path="/find-labour" element={<FindLabour />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Admin route */}
        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/users" element={<UserManagement />}></Route>
        <Route path="/admin/labours" element={<LabourVerification />}></Route>
        </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;