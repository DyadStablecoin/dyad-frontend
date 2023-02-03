import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import { CURRENT_NETWORK } from "../consts/consts";
import Button from "../components/Button";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function App() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <>
      <div className="font-serif font-bold text-white page-container content-wrap">
        <Navbar />
        {isConnected ? (
          <>
            {chain.id === CURRENT_NETWORK.id ? (
              <div className="flex flex-col ">
                <Leaderboard />
              </div>
            ) : (
              <div className="flex justify-center gap-2 mt-10">
                Please switch to the {CURRENT_NETWORK.name} Network!
                <Button onClick={() => switchNetwork(CURRENT_NETWORK.id)}>
                  Switch
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center mt-10">Connect your wallet!</div>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
