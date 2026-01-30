import { Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="relative min-h-screen bg-black text-pink-400 selection:bg-pink-500 selection:text-black">
      
      {/* 🌊 GRID BACKGROUND - Z-0 */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      {/* 🧱 CONTENT LAYER - Z-10 */}
      <div className="relative z-10 pointer-events-none">
        {/* pointer-events-auto restores clicking for buttons/links inside */}
        <div className="pointer-events-auto min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;