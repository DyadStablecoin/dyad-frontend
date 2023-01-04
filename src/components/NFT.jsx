import { round } from "../utils/currency";
import {
  accrueXP,
  dyadBurnLiability,
  dyadMintAllocation,
} from "../utils/stats";
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
import LoadingInplace from "./LoadingInplace";
import { useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import Redeem from "./Redeem";
import useSafetyModeActivated from "../hooks/useSafetyMode";
import useCR from "../hooks/useCR";
import useMintAllocation from "../hooks/useMintAllocation";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";
import useNftImage from "../hooks/useNftImage";
import NftStats from "./NftStats";
import NftStatus from "./NftStatus";
import Label from "./Label";

export default function NFT({ tokenId, avgMinted, dyadBalance }) {
  console.log("NFT: Rendering NFT", tokenId);

  const [txHash, setTxHash] = useState();
  const { nft, refetch: refetchNft, isLoading, isFetching } = useNft(tokenId);
  const { cr, refetch: refetchCR } = useCR();
  const { isSafetyModeActivated } = useSafetyModeActivated(cr);
  const { mintAllocation } = useMintAllocation(nft.xp);
  const { status } = useNftStatus(nft);
  const { nftImage } = useNftImage(nft);

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
        refetchNft();
        refetchCR();
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
              <Sync nft={nft} onClose={onCloseSync} setTxHash={setTxHash} />
            </Popup>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {isLoading || isFetching ? (
        <Skeleton />
      ) : (
        <div
          style={{
            border: `1px solid ${
              status === STATUS.RISK_FREE ? "#3A403C" : "#800101"
            } `,
          }}
          className={`p-4 md:flex md:gap-[5rem] 
          ${status === STATUS.LIQUIDATABLE && "shadow-lg shadow-[#800101]"}`}
        >
          <LoadingInplace isLoading={isLoadingTx || isFetching} />
          <div className="flex gap-4 justify-between w-full">
            <div className="md:w-[8rem]">
              <div className="w-[107px]">
                <img src={nftImage} alt="" />
              </div>
            </div>
            <div className="w-full">
              <NftStats nft={nft} />
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
              <Label>Performance</Label>
              <div className="flex flex-col items-start text-s text-[#519C58]">
                <div className="">
                  {round(dyadMintAllocation(mintAllocation, nft), 3)}
                  x/
                  {round(dyadBurnLiability(mintAllocation, nft, avgMinted), 3)}x
                </div>
                <div className="w-[5rem] text-white">
                  {round(accrueXP(mintAllocation), 3)}x XP
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:w-full">
            <Label>Deposit Ratio</Label>
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
                <Label>Minted DYAD</Label>
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
              {dyadBalance > 0 && (
                <Button
                  onClick={onOpenRedeem}
                  borderColor="#463D81"
                  bgColor="#0F0D1B"
                  isDisabled={isFetching || isFetchingTx}
                >
                  Redeem
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4 ">
              <Label>Deposited DYAD</Label>
              <div className="md:flex md:gap-2">
                <div className="md:mr-2 mb-2 md:mb-0">
                  {Math.round((nft.deposit / 10 ** 18) * 100) / 100}
                </div>
                <div className="">
                  <div className="flex gap-2">
                    {dyadBalance > 0 && (
                      <Button
                        onClick={onOpenDeposit}
                        isDisabled={isFetching || isFetchingTx}
                      >
                        Deposit
                      </Button>
                    )}
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
              <NftStatus nft={nft} />
            </div>
          </div>
          {renderPopups()}
        </div>
      )}
    </>
  );
}
