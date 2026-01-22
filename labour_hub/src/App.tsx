import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";
import Register from "./pages/LabourRegister";
import Registeremp from "./pages/Registeremp";
import LabourDashboard from "./pages/LabourDashboard";
import WorkerDetail from "./pages/WorkerDetail";
import Login from "./pages/auth/Login";
import Landing from "./pages/Landing";
import EditLabourDetails from "./pages/EditLabourDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/find-labour" element={<FindLabour />} />
        <Route path="/register/worker" element={<Register />} />
        <Route path="/register/employer" element={<Registeremp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/labour-dashboard" element={<LabourDashboard />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />
        <Route path="/labour/profile/edit" element={<EditLabourDetails />}/>


      </Routes> 
      <Footer />
    </>
  );
}

export default App;
