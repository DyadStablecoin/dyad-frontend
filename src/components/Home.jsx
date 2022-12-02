import { useAccount, useNetwork } from "wagmi";
import { GOERLI } from "../consts/networks";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home({ protocolData, reload, setReload }) {
  const { isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  return (
    <>
      {isConnected ? (
        <div>
          {chain.id === GOERLI ? (
            <div>
              <Claim
                protocolData={protocolData}
                reload={reload}
                setReload={setReload}
              />
              <div className="mt-[1rem] flex justify-center items-center w-full">
                <NFTs reload={reload} setReload={setReload} />
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
