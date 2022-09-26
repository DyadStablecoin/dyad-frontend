import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useBalance } from "wagmi";
import { dNFTfloor, getTVL } from "../../utils/stats";
import { formatUSD } from "../../utils/currency";

export const NavBar = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  return (
    <div className="flex justify-around items-center mt-8 mb-8">
      <div>tvl: {formatUSD(getTVL())}</div>
      <div>dNFT floor: {formatUSD(dNFTfloor())}</div>
      <div className="text-5xl font-bold">dyad</div>
      <div>app</div>
      <div>docs</div>
      <div>about</div>
      {address ? (
        <a className="cursor-pointer" onClick={() => disconnect()}>
          Disconnect
        </a>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
