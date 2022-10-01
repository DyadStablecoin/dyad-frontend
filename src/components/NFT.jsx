import { useContractReads } from "wagmi";
import { dNFT_PRICE } from "../consts/consts";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import { formatUSD } from "../utils/currency";
import { dyadMultiplier, xpCurve } from "../utils/stats";
import Mint from "./Mint";
import Popup from "./Popup";
import { useDisclosure } from "@chakra-ui/react";
import Button from "./Button";
import Sync from "./Sync";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

export default function NFT({ reload, address, ETH2USD, averageXP, id }) {
  const TR = "text-white text-center border-2 border-[#BCF0C8]";

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

  const { refetch, isLoading } = useContractReads({
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
    refetch();
  }, [reload]);
  return (
    <>
      <tr className={TR}>
        <td style={{ borderLeft: "1px solid #BCF0C8" }}>#{rank && rank}</td>
        <td> {formatUSD(dNFT_PRICE)} </td>
        <td> {dyad && dyad / 10 ** 21} </td>
        <td>
          <div className="flex flex-col text-s ">
            <div>
              <div>
                {dyadMultiplier(dNFT_PRICE, dNFT_PRICE, xp, averageXP)}x/
                {1 / dyadMultiplier(dNFT_PRICE, dNFT_PRICE, xp, averageXP)}x
              </div>
              <div className="w-[5rem]">
                {Math.round(xpCurve(1) * 10000) / 10000}x XP
              </div>
            </div>
          </div>
        </td>
        <td>
          <Button onClick={onOpen}>mint</Button>
        </td>
        <td>{dyad && dyad / 10 ** 21}</td>
        <td>
          <Button onClick={onOpen}>deposit</Button>
        </td>
        <td>
          <Button onClick={onOpen}>withdraw</Button>
        </td>
        <td>{xp && xp}</td>
        <td style={{ borderRight: "1px solid #BCF0C8" }}>
          <Button onClick={onOpen}>sync</Button>
        </td>
      </tr>
      <Popup isOpen={isOpen} onClose={onClose}>
        <Mint />
      </Popup>
      <Popup isOpen={isOpenDeposit} onClose={onCloseDeposit}>
        <Deposit address={address} tokenId={rank} />
      </Popup>
      <Popup isOpen={isOpenWithdraw} onClose={onCloseWithdraw}>
        <Withdraw address={address} tokenId={rank} ETH2USD={ETH2USD} />
      </Popup>
      <Popup isOpen={isOpenSync} onClose={onCloseSync}>
        <Sync address={address} tokenId={rank} />
      </Popup>
    </>
  );
}
