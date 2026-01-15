import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";
import FindLabour from "./pages/FindLabour";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/find-labour" element={<FindLabour />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;