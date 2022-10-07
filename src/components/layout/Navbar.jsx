import { useAccount, useConnect, useContractRead, useDisconnect } from "wagmi";
import { dNFTfloor } from "../../utils/stats";
import { formatUSD } from "../../utils/currency";
import { addressSummary } from "../../utils/address";
import dyadABI from "../../consts/abi/dNFTABI.json";
import Button from "../Button";
import { useState } from "react";
import { CONTRACT_DYAD } from "../../consts/contract";

export const NavBar = ({ tvl }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [balanceOf, setBalanceOf] = useState(0);

  const {} = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      console.log("balanceOf", data);
      setBalanceOf(parseInt(data._hex) / 10 ** 18);
    },
    onError: (e) => {
      console.log("balanceOf", e);
    },
  });

  return (
    <div className="flex justify-around items-center mt-8 mb-8">
      {/* <div>tvl: {formatUSD(getTVL())}</div> */}
      <div>tvl: {formatUSD(tvl)}</div>
      <div>dNFT floor: {formatUSD(dNFTfloor())}</div>
      <div>dyad balance: {formatUSD(balanceOf, true)}</div>
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
