import { GOERLI } from "../consts/networks";
import useBlockchain from "../hooks/useBlockchain";
import Claim from "./Claim";
import Leaderboard from "./Leaderboard";
import Mint from "./Mint";
import NFTs from "./NFTs";
import Withdraw from "./Withdraw";

export default function Home() {
  const { isConnected, chain } = useBlockchain();

  return (
    <>
      {isConnected ? (
        <div>
          {chain.id === GOERLI ? (
            <div>
              {/* <Withdraw /> */}
              <Claim />
              {/* <Leaderboard /> */}
              {/* <Mint /> */}
              {/* <div className="mt-[1rem] flex justify-center items-center w-full"> */}
              {/*   <NFTs /> */}
              {/* </div> */}
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
