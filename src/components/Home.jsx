import { useAccount } from "wagmi";
import { useAverageXP } from "../utils/stats";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home({ totalSupply, reload, setReload }) {
  const { isConnected } = useAccount();
  const averageXP = useAverageXP(totalSupply);

  return (
    <>
      {isConnected ? (
        <div className="mt-8">
          <Claim
            reload={reload}
            setReload={setReload}
            totalSupply={totalSupply}
          />
          <div className="mt-[5rem]">
            {/* <NFTs reload={reload} setReload={setReload} averageXP={averageXP} /> */}
          </div>
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
