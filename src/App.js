import "./App.css";
import "./index.css";
import Home from "./components/Home";
import NavBar from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import useCR from "./hooks/useCR";

export default function App() {
  const { cr } = useCR();

  return (
    <BrowserRouter>
      <div className="page-container content-wrap font-serif font-bold text-white">
        <NavBar isSafetyModeActivated={cr > 150} />
        <div className="flex flex-col ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
