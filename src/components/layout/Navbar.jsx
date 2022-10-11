import { useAccount, useConnect, useContractReads, useDisconnect } from "wagmi";
import { dNFTfloor } from "../../utils/stats";
import { formatUSD } from "../../utils/currency";
import { addressSummary } from "../../utils/address";
import dyadABI from "../../consts/abi/dNFTABI.json";
import poolABI from "../../consts/abi/poolABI.json";
import Button from "../Button";
import { useState } from "react";
import { CONTRACT_DYAD, CONTRACT_POOL } from "../../consts/contract";
import logo from "../../static/dyad.jpg";

export const NavBar = ({ tvl }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const [balanceOf, setBalanceOf] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const {} = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI,
        functionName: "balanceOf",
        args: [address],
      },
      {
        addressOrName: CONTRACT_POOL,
        contractInterface: poolABI,
        functionName: "lastEthPrice",
      },
    ],
    onSuccess: (data) => {
      if (data) {
        setBalanceOf(parseInt(data[0]._hex) / 10 ** 18);
        setEthPrice(parseInt(data[1]._hex) / 10 ** 8);
      }
    },
  });
  return (
    <div
      className="flex justify-around items-center mt-8 mb-8 "
      style={{
        borderBottom: "1px solid white",
      }}
    >
      <div>
        <img src={logo} alt="logo" className="w-16" />
      </div>
      <div
        style={{
          borderLeft: "1px solid white",
          height: "80px",
        }}
      ></div>
      {/* <div>tvl: {formatUSD(getTVL())}</div> */}
      <div>tvl: {formatUSD(tvl)}</div>
      <div>dNFT floor: {formatUSD(dNFTfloor())}</div>
      <div>balance: {formatUSD(balanceOf, true)} dyad</div>
      <div>ETH/USD: {formatUSD(ethPrice)}</div>
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
