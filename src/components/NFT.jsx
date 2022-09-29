import Button from "./Button";
import Popup from "./Popup";
import { useDisclosure } from "@chakra-ui/react";
import Mint from "./Mint";
import Sync from "./Sync";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { useEffect, useState } from "react";
import { useContractRead, useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import { dyadMultiplier, xpCurve } from "../utils/stats";
import { dNFT_PRICE } from "../consts/consts";
import { formatUSD } from "../utils/currency";

export default function NFT({
  reload,
  address,
  id,
  ETH2USD,
  borderColor,
  averageXP,
  showHeader = false,
}) {
  const [rank, setRank] = useState();
  const [xp, setXP] = useState();
  const [dyad, setDyad] = useState();
  const [dyadBalance, setDyadBalance] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSync,
    onOpen: onOpenSync,
    onClose: onCloseSync,
  } = useDisclosure();
  const {
    isOpen: isOpenDeposit,
    onOpen: onOpenDeposit,
    onClose: onCloseDeposit,
  } = useDisclosure();
  const {
    isOpen: isOpenWithdraw,
    onOpen: onOpenWithdraw,
    onClose: onCloseWithdraw,
  } = useDisclosure();

  const { refetch: refetchRank } = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "tokenOfOwnerByIndex",
        args: [address, id],
      },
    ],
    onSuccess: (data) => {
      console.log("data", data);
      if (data && data[0]) {
        setRank(parseInt(data[0]._hex));
      }
    },
  });

  const { isLoading } = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "xp",
        args: [rank],
      },
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "dyadMinted",
        args: [rank],
      },
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "virtualDyadBalance",
        args: [rank],
      },
    ],
    onSuccess: (data) => {
      if (data && data[0]) {
        setXP(parseInt(data[0]._hex));
        setDyad(parseInt(data[1]._hex));
        setDyadBalance(parseInt(data[2]._hex));
      }
    },
  });

  useEffect(() => {
    refetchRank();
  }, [reload]);

  return (
    <>
      {xp && (
        <div
          className={`flex gap-8 border-[1px] p-4 items-center`}
          style={{
            borderColor: borderColor ? borderColor : "black",
          }}
        >
          <div className="underline underline-offset-4 relative">
            {showHeader && (
              <div className="absolute mb-[4rem] bottom-1">rank</div>
            )}
            #{rank && rank}
          </div>
          <div className="underline underline-offset-4 relative">
            {showHeader && (
              <div className="absolute mb-[4rem] bottom-1 ml-2">value</div>
            )}
            {formatUSD(dNFT_PRICE)}
          </div>
          <div className="underline underline-ffset-4 relative">
            {showHeader && (
              <div className="absolute mb-[4rem] bottom-1">minted DYAD</div>
            )}
            {dyad && dyad}
          </div>
          <div className="flex flex-col text-s ">
            <div>
              <div>
                {dyadMultiplier(dNFT_PRICE, dNFT_PRICE, xp, averageXP)}x/
                {1 / dyadMultiplier(dNFT_PRICE, dNFT_PRICE, xp, averageXP)}x
              </div>
              <div>{Math.round(xpCurve(1) * 10000) / 10000}x XP</div>
            </div>
          </div>
          <Button onClick={onOpen}>mint</Button>
          <Popup isOpen={isOpen} onClose={onClose}>
            <Mint tokenId={rank} ETH2USD={ETH2USD} />
          </Popup>
          <div className="underline underline-offset-4 relative">
            {showHeader && (
              <div className="absolute mb-[4rem] bottom-1">invested DYAD</div>
            )}
            {dyadBalance && dyadBalance}
          </div>
          <Button onClick={onOpenDeposit}>deposit</Button>
          <Popup isOpen={isOpenDeposit} onClose={onCloseDeposit}>
            <Deposit address={address} tokenId={rank} />
          </Popup>
          <Button onClick={onOpenWithdraw}>withdraw</Button>
          <Popup isOpen={isOpenWithdraw} onClose={onCloseWithdraw}>
            <Withdraw tokenId={rank} ETH2USD={ETH2USD} />
          </Popup>
          <div className="underline underline-offset-4 relative">
            {showHeader && (
              <div className="absolute mb-[4rem] bottom-1">XP</div>
            )}
            {xp && xp}
          </div>
          <Button onClick={onOpenSync}>sync</Button>
          <Popup isOpen={isOpenSync} onClose={onCloseSync}>
            <Sync address={address} tokenId={rank} />
          </Popup>
        </div>
      )}
    </>
  );
}
