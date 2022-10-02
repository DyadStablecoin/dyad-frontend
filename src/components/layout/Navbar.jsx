import { useAccount, useConnect, useDisconnect } from "wagmi";
import { dNFTfloor } from "../../utils/stats";
import { formatUSD } from "../../utils/currency";
import { addressSummary } from "../../utils/address";
import Button from "../Button";

export const NavBar = ({ tvl }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div className="flex justify-around items-center mt-8 mb-8">
      {/* <div>tvl: {formatUSD(getTVL())}</div> */}
      <div>tvl: {formatUSD(tvl)}</div>
      <div>dNFT floor: {formatUSD(dNFTfloor())}</div>
      <a className="text-5xl font-bold" href="/">
        dyad
      </a>
      <a href="/">app</a>
      <a href="/docs">docs</a>
      <a href="/about-us">about</a>
      {address ? (
        <Button onClick={() => disconnect()}>
          <div className="flex  items-center gap-2">
            <a className="cursor-pointer">Disconnect</a>
            <div>{addressSummary(address, 3)}</div>
          </div>
        </Button>
      ) : (
        <Button
          onClick={() => {
            connect({ connector: connectors[4] }); // 4 is for metamask
          }}
        >
          Connect
        </Button>
      )}
    </div>
  );
};
