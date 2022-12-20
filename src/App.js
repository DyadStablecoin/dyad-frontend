import "./App.css";
import "./index.css";
import Home from "./components/Home";
import NavBar from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import { CURRENT_NETWORK } from "./consts/consts";
import Button from "./components/Button";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function App() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <BrowserRouter>
      <div className="page-container content-wrap font-serif font-bold text-white">
        <NavBar />
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
              <div className="mt-10 flex justify-center gap-2">
                Please switch to the {CURRENT_NETWORK.name} Network!
                <Button onClick={() => switchNetwork(CURRENT_NETWORK.id)}>
                  Switch
                </Button>
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
