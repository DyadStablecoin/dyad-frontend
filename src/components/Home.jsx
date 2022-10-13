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
            <div>
              {/* <Claim */}
              {/*   reload={reload} */}
              {/*   setReload={setReload} */}
              {/*   totalSupply={totalSupply} */}
              {/* /> */}
              <div className="mt-[1rem] flex justify-center items-center w-full">
                <NFTs
                  reload={reload}
                  setReload={setReload}
                  averageXP={averageXP}
                  xps={xps}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              Please connect to the Goerli Test Network!
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex justify-center">Connect your wallet!</div>
      )}
    </>
  );
}
