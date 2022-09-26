import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { NavBar } from "./components/layout/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { useTVL, useAverageXP } from "./utils/stats";
import { useAccount, useContractRead } from "wagmi";
import { CONTRACT_dNFT } from "./consts/contract";
import abi from "./consts/abi/dyadABI.json";

function App() {
  const [totalSupply, setTotalSupply] = useState(0);
  const [reload, setReload] = useState(false);
  const [ETH2USD, setETH2USD] = useState(0);

  const { address, isConnected } = useAccount();

  const tvl = useTVL(totalSupply);
  const averageXP = useAverageXP(totalSupply);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "totalSupply",
    onSuccess: (data) => {
      setTotalSupply(data._hex);
    },
  });

  useEffect(() => {
    async function _ETH2USD() {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      setETH2USD(data.USD);
    }

    _ETH2USD();
    refetch();
  }, [reload]);

  return (
    <div className="font-serif font-bold mr-16 ml-16 text-white">
      <NavBar tvl={tvl} />
      <div className="flex flex-col justify-center items-center m-10">
        <Home
          address={address}
          isConnected={isConnected}
          totalSupply={totalSupply}
          reload={reload}
          setReload={setReload}
          ETH2USD={ETH2USD}
          averageXP={averageXP}
        />
      </div>
    </div>
  );
}

export default App;
