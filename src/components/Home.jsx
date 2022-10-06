import { useAccount, useNetwork } from "wagmi";
import { GOERLI } from "../consts/networks";
import { useAverageXP } from "../utils/stats";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home({ totalSupply, reload, setReload, xps }) {
  const { isConnected } = useAccount();
  const averageXP = useAverageXP(totalSupply);
  const { chain, chains } = useNetwork();

  return (
    <>
      {isConnected ? (
        <div>
          {chain.id === GOERLI ? (
            <div className="mt-8">
              <Claim
                reload={reload}
                setReload={setReload}
                totalSupply={totalSupply}
              />
              <div className="mt-[5rem]">
                <NFTs
                  reload={reload}
                  setReload={setReload}
                  averageXP={averageXP}
                  xps={xps}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10">
              Please connect to the Goerli Test Network!
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
