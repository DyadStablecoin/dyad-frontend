import {
  dNFT_AVERAGE_PRICE,
  dNFT_PRICE,
  RANDOM_IMAGES,
} from "../consts/consts";
import { formatUSD, round } from "../utils/currency";
import { dyadMultiplier, xpCurve } from "../utils/stats";
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
import LoadingInplace from "./LoadingInplace";
import { useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import { useBalances } from "../hooks/useBalances";
import Redeem from "./Redeem";
import useRank from "../hooks/useRank";
import useSafetyModeActivated from "../hooks/useSafetyMode";

const HEADER = "text-gray-500 text-sm";

export default function NFT({ index, xps, xpsAverage }) {
  const [txHash, setTxHash] = useState();
  const { tokenId } = useTokenOfOwnerByIndex(index);
  const { refetch, nft, isLoading, isFetching } = useNft(tokenId);
  // const { rank } = useRank(xps, nft.xp);
  const { isSafetyModeActivated } = useSafetyModeActivated();

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
  const {
    isOpen: isOpenRedeem,
    onOpen: onOpenRedeem,
    onClose: onCloseRedeem,
  } = useDisclosure();

  useEffect(() => {}, [txHash]);

  const { isLoading: isLoadingTx, isFetching: isFetchingTx } =
    useWaitForTransaction({
      hash: txHash,
      onSuccess: () => {
        refetch();
      },
    });

  function renderPopups() {
    return (
      <>
        {nft && (
          <>
            <Popup isOpen={isOpen} onClose={onClose}>
              <Mint nft={nft} onClose={onClose} setTxHash={setTxHash} />
            </Popup>
            <Popup isOpen={isOpenDeposit} onClose={onCloseDeposit}>
              <Deposit
                nft={nft}
                onClose={onCloseDeposit}
                setTxHash={setTxHash}
              />
            </Popup>
            <Popup isOpen={isOpenWithdraw} onClose={onCloseWithdraw}>
              <Withdraw
                nft={nft}
                onClose={onCloseWithdraw}
                setTxHash={setTxHash}
              />
            </Popup>
            <Popup isOpen={isOpenRedeem} onClose={onCloseRedeem}>
              <Redeem nft={nft} onClose={onCloseRedeem} setTxHash={setTxHash} />
            </Popup>
            <Popup isOpen={isOpenSync} onClose={onCloseSync}>
              <Sync onClose={onCloseSync} setTxHash={setTxHash} nft={nft} />
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
          <LoadingInplace isLoading={isLoadingTx || isFetching} />
          <div className="flex gap-4 justify-between w-full">
            <div className="md:w-[8rem]">
              <div className="w-[107px]">
                {/* <img src={RANDOM_IMAGES[rank % RANDOM_IMAGES.length]} alt="" /> */}
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className={HEADER}>Rank</div>
                {/* {xps && <div className="">#{rank}</div>} */}
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
                  isDisabled={isFetching || isFetchingTx}
                >
                  Sync
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start md:ml-4">
              <div className={HEADER}>Performance</div>
              <div className="flex flex-col items-start text-s text-[#519C58]">
                <div className="">
                  {round(
                    dyadMultiplier(
                      dNFT_PRICE,
                      dNFT_AVERAGE_PRICE,
                      nft.xp,
                      0 // xpsAverage
                    ),
                    3
                  )}
                  x/
                  {round(
                    1 /
                      dyadMultiplier(
                        dNFT_PRICE,
                        dNFT_AVERAGE_PRICE,
                        nft.xp,
                        0 // xpsAverage
                      ),
                    3
                  )}
                  x
                </div>
                <div className="w-[5rem] text-white">
                  {round(xpCurve(1), 4)}x XP
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
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 ">
                <div className={HEADER}>Minted DYAD</div>
                <div className="md:flex">
                  <div className="md:mr-2 mb-2 md:mb-0">
                    {round((nft.deposit + nft.withdrawn) / 10 ** 18, 2)}
                  </div>
                  <Button
                    onClick={onOpen}
                    isDisabled={isFetching || isFetchingTx}
                  >
                    Mint
                  </Button>
                </div>
              </div>
              <Button
                onClick={onOpenRedeem}
                borderColor="#463D81"
                bgColor="#0F0D1B"
                isDisabled={isFetching || isFetchingTx}
              >
                Redeem
              </Button>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <div className={HEADER}>Deposited DYAD</div>
              <div className="md:flex md:gap-2">
                <div className="md:mr-2 mb-2 md:mb-0">
                  {Math.round((nft.deposit / 10 ** 18) * 100) / 100}
                </div>
                <div className="">
                  <div className="flex gap-2">
                    <Button
                      onClick={onOpenDeposit}
                      isDisabled={isFetching || isFetchingTx}
                    >
                      Deposit
                    </Button>
                    <Button
                      onClick={onOpenWithdraw}
                      isDisabled={
                        isFetching || isFetchingTx || isSafetyModeActivated
                      }
                    >
                      Withdraw
                    </Button>
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
