import { dNFT_AVERAGE_PRICE, dNFT_PRICE } from "../consts/consts";
import { formatUSD, round2 } from "../utils/currency";
import { calcRank, dyadMultiplier, xpCurve } from "../utils/stats";
import Mint from "./Mint";
import Popup from "./Popup";
import { useDisclosure } from "@chakra-ui/react";
import Button from "./Button";
import Sync from "./Sync";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import useNft from "../hooks/useNft";
import ProgressBar from "./ProgressBar";
import Skeleton from "./Skeletion";
import useTokenOfOwnerByIndex from "../hooks/useTokenOfOwnerByIndex";
import Loading2 from "./Loading2";
import { useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";

const HEADER = "text-gray-500 text-sm";

export default function NFT({ index, xps, xpsAverage }) {
  const [txHash, setTxHash] = useState();
  const { tokenId } = useTokenOfOwnerByIndex(index);
  const { refetch, nft, isLoading } = useNft(tokenId);

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

  useEffect(() => {}, [txHash]);

  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      refetch(); // refetch nft data
    },
  });

  function renderPopups() {
    return (
      <>
        {tokenId && (
          <>
            <Popup isOpen={isOpen} onClose={onClose}>
              <Mint tokenId={tokenId} onClose={onClose} setTxHash={setTxHash} />
            </Popup>
            <Popup isOpen={isOpenDeposit} onClose={onCloseDeposit}>
              <Deposit
                tokenId={tokenId}
                refetch={refetch}
                onClose={onCloseDeposit}
              />
            </Popup>
            <Popup isOpen={isOpenWithdraw} onClose={onCloseWithdraw}>
              <Withdraw
                tokenId={tokenId}
                onClose={onCloseWithdraw}
                setTxHash={setTxHash}
              />
            </Popup>
            <Popup isOpen={isOpenSync} onClose={onCloseSync}>
              <Sync tokenId={tokenId} />
            </Popup>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div
          style={{ border: "1px solid #3A403C" }}
          className="p-4 md:flex md:gap-[5rem]"
        >
          <Loading2 isLoading={isLoadingTx} />
          <div className="flex gap-4 justify-between w-full">
            <div className="md:w-[8rem]">
              <div className="w-[107px]">
                <img
                  src="https://pbs.twimg.com/media/FJ4VWvUaIAIWv3f.jpg:large"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className={HEADER}>Rank</div>
                {xps && <div className="">#{calcRank(xps, nft.xp)}</div>}
              </div>
              <div className="flex justify-between items-center">
                <div className={HEADER}>Value</div>
                <div className="">{formatUSD(dNFT_PRICE)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className={HEADER}>XP</div>
                <div className="">{nft.xp}</div>
              </div>
              <div className="mt-2">
                <Button
                  borderColor="#463D81"
                  bgColor="#0F0D1B"
                  onClick={onOpenSync}
                >
                  Sync
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start md:ml-4">
              <div className={HEADER}>Performance</div>
              <div className="flex flex-col items-start text-s text-[#519C58]">
                <div className="">
                  {dyadMultiplier(
                    dNFT_PRICE,
                    dNFT_AVERAGE_PRICE,
                    nft.xp,
                    xpsAverage
                  )}
                  x/
                  {1 /
                    dyadMultiplier(
                      dNFT_PRICE,
                      dNFT_AVERAGE_PRICE,
                      nft.xp,
                      xpsAverage
                    )}
                  x
                </div>
                <div className="w-[5rem] text-white">
                  {Math.round(xpCurve(1) * 10000) / 10000}x XP
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:w-full">
            <div className={HEADER}>Deposit Ratio</div>
            <div className="mt-3">
              <ProgressBar
                percent={parseInt(
                  (nft.deposit / (nft.deposit + nft.withdrawn)) * 100
                )}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="flex flex-col gap-2 ">
              <div className={HEADER}>Minted DYAD</div>
              <div className="md:flex">
                <div className="md:mr-2 mb-2 md:mb-0">
                  {round2((nft.deposit + nft.withdrawn) / 10 ** 18)}
                </div>
                <Button onClick={onOpen}>Mint</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <div className={HEADER}>Deposited DYAD</div>
              <div className="md:flex md:gap-2">
                <div className="md:mr-2 mb-2 md:mb-0">
                  {Math.round((nft.deposit / 10 ** 18) * 100) / 100}
                </div>
                <div className="">
                  <div className="flex gap-2">
                    <Button onClick={onOpenDeposit}>Deposit</Button>
                    <Button onClick={onOpenWithdraw}>Withdraw</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {renderPopups()}
        </div>
      )}
    </>
  );
}
