import Header from "./components/common/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";
import WorkerDetail from "./pages/WorkerDetail";
// import LabourRegister from "./pages/LabourRegister";
import Home from "./pages/Home";
function App() {
  return <>
    <Header />
    <Routes>

           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/worker/id" element={<WorkerDetail />} />
          <Route path="/find-labour" element={<FindLabour />} />
           {/* <Route path="/register" element={<LabourRegister />} /> */}
           <Route path="/" element={<Home />} />
         </Routes>
  <Footer />
  
  </> 
}

export default App;