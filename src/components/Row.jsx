import Button from "./Button";
import Popup from "./Popup";
import { useDisclosure } from "@chakra-ui/react";
import Mint from "./Mint";
import Sync from "./Sync";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dyadABI.json";

export default function Row({ reload, address, id }) {
  const [data, setData] = useState();
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

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "tokenOfOwnerByIndex",
    args: [address, id],
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    refetch();
  }, [reload]);

  return (
    <>
      {data && (
        <div className="flex gap-8 border-[1px] border-white p-4 items-center">
          <div className="underline underline-offset-4">#{id}</div>
          <div className="underline underline-offset-4">$58,000</div>
          <div className="underline underline-ffset-4">100,000</div>
          <div className="flex flex-col text-s">
            <div>3.6x/0.8x</div>
            <div>0.03x XP</div>
          </div>
          <Button onClick={onOpen}>mint</Button>
          <Popup isOpen={isOpen} onClose={onClose}>
            <Mint />
          </Popup>
          <div className="underline underline-offset-4">70,500</div>
          <Button onClick={onOpenDeposit}>deposit</Button>
          <Popup isOpen={isOpenDeposit} onClose={onCloseDeposit}>
            <Deposit />
          </Popup>
          <Button onClick={onOpenWithdraw}>withdraw</Button>
          <Popup isOpen={isOpenWithdraw} onClose={onCloseWithdraw}>
            <Withdraw />
          </Popup>
          <div className="underline underline-offset-4">5,000</div>
          <Button onClick={onOpenSync}>sync</Button>
          <Popup isOpen={isOpenSync} onClose={onCloseSync}>
            <Sync />
          </Popup>
        </div>
      )}
    </>
  );
}
