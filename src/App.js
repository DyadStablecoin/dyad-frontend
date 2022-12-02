import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Home from "./components/Home";
import { NavBar } from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import { useProtocolData } from "./hooks/useProtocolData";

export default function App() {
  const [reload, setReload] = useState(false);

  const { refetch, protocolData } = useProtocolData();

  useEffect(() => {
    refetch();
  }, [reload]);

  return (
    <BrowserRouter>
      <div className="page-container content-wrap font-serif font-bold text-white">
        <NavBar isSafetyModeActivated={false} reload={reload} />
        <div className="flex flex-col ">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  protocolData={protocolData}
                  reload={reload}
                  setReload={setReload}
                />
              }
            />
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
