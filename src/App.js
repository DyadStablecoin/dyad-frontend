import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Home from "./components/Home";
import { NavBar } from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { useTVL, useXPs } from "./utils/stats";
import { useAccount, useContractReads } from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "./consts/contract";
import abi from "./consts/abi/dNFTABI.json";
import dyadABI from "./consts/abi/dNFTABI.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

function App() {
  const [reload, setReload] = useState(false);

  const [totalSupply, setTotalSupply] = useState(0);
  const [balanceOfDyad, setBalanceOfDyad] = useState(0);

  const { address } = useAccount();

  const tvl = useTVL(totalSupply);
  const xps = useXPs(totalSupply);

  const { refetch } = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "totalSupply",
      },
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    onSuccess: (data) => {
      if (data && data[0]) {
        setTotalSupply(parseInt(data[0]._hex));
        setBalanceOfDyad(parseInt(data[1]._hex));
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [reload]);

  return (
    <BrowserRouter>
      <div className="page-container content-wrap font-serif font-bold text-white">
        {/* <NavBar tvl={tvl} /> */}
        <div className="flex flex-col ">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  totalSupply={totalSupply}
                  reload={reload}
                  setReload={setReload}
                  xps={xps}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <div className="footer">{/* <Footer /> */}</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
