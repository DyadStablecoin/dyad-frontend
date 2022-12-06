import "./App.css";
import "./index.css";
import Home from "./components/Home";
import NavBar from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import useCR from "./hooks/useCR";
import Leaderboard from "./components/Leaderboard";
import useBlockchain from "./hooks/useBlockchain";
import { CURRENT_NETWORK } from "./consts/consts";

export default function App() {
  const { cr } = useCR();
  const { isConnected, chain } = useBlockchain();

  return (
    <BrowserRouter>
      <div className="page-container content-wrap font-serif font-bold text-white">
        <NavBar isSafetyModeActivated={cr > 150} />
        {isConnected ? (
          <>
            {chain.id === CURRENT_NETWORK.id ? (
              <div className="flex flex-col ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            ) : (
              <div className="mt-10 flex justify-center">
                Please connect to the {CURRENT_NETWORK.name} Network!
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 flex justify-center">Connect your wallet!</div>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
