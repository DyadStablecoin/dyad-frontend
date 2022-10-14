import { useAccount, useConnect, useContractReads, useDisconnect } from "wagmi";
import { addressSummary } from "../../utils/address";
import dyadABI from "../../consts/abi/dNFTABI.json";
import poolABI from "../../consts/abi/poolABI.json";
import Button from "../Button";
import { useState } from "react";
import { CONTRACT_DYAD, CONTRACT_POOL } from "../../consts/contract";
import logo from "../../static/dyad-logo.svg";
import WalletOutlined from "@ant-design/icons/lib/icons/WalletOutlined";

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
    <div className="flex items-center justify-between border-b border-gray-800 p-2">
      <div className="">
        <img src={logo} alt="logo" className="w-16" />
      </div>
      {address ? (
        <Button
          onClick={() => disconnect()}
          borderColor="#463D81"
          bgColor="#0F0D1B"
        >
          <div className="flex  items-center gap-2">
            <a className="cursor-pointer">Disconnect</a>
            <div>{addressSummary(address, 3)}</div>
          </div>
        </Button>
      ) : (
        <Button
          borderColor="#463D81"
          bgColor="#0F0D1B"
          onClick={() => {
            connect({ connector: connectors[4] }); // 4 is for metamask
          }}
        >
          <div className="flex gap-2 items-center justify-center">
            <WalletOutlined />
            <div>Connect</div>
          </div>
        </Button>
      )}
    </div>
  );
};
