import { useAccount, useConnect, useContractReads, useDisconnect } from "wagmi";
import { dNFTfloor } from "../../utils/stats";
import { formatUSD } from "../../utils/currency";
import { addressSummary } from "../../utils/address";
import dyadABI from "../../consts/abi/dNFTABI.json";
import poolABI from "../../consts/abi/poolABI.json";
import Button from "../Button";
import { useState } from "react";
import { CONTRACT_DYAD, CONTRACT_POOL } from "../../consts/contract";
import logo from "../../static/dyad-logo.svg";

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
      className="flex justify-between items-center bg-[#0f0f0f]"
      style={{
        borderBottom: "0.2px solid #939393",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ borderRight: "0.2px solid #939393" }}
      >
        <img src={logo} alt="logo" className="w-16" />
      </div>
      <div className="flex gap-4 mr-4">
        <div>TVL {formatUSD(tvl)}</div>
        <div>/</div>
        <div>dNFT Floor {formatUSD(dNFTfloor())}</div>
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
    </div>
  );
};
