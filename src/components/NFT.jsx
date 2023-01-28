import { round } from "../utils/currency";
import Exchange from "./Exchange";
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
import useNftStatus, { STATUS } from "../hooks/useNftStatus";
import useNftImage from "../hooks/useNftImage";
import NftStats from "./NftStats";
import NftStatus from "./NftStatus";
import Label from "./Label";
import Performance from "./NftPerformance";
import useDyadBalance from "../hooks/useDyadBalance";
import { useAccount } from "wagmi";
import Claim from "./Claim";
import useIsClaimable from "../hooks/useIsClaimable";

export default function NFT({ tokenId }) {
  console.log("NFT: Rendering NFT", tokenId);

  const [txHash, setTxHash] = useState();
  const { nft, refetch: refetchNft, isLoading, isFetching } = useNft(tokenId);
  const { cr, refetch: refetchCR } = useCR();
  const { isSafetyModeActivated } = useSafetyModeActivated(cr);
  const { status } = useNftStatus(nft);
  const { nftImage: image } = useNftImage(nft);
  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);
  const { isClaimable } = useIsClaimable(tokenId);

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
  const {
    isOpen: isOpenClaim,
    onOpen: onOpenClaim,
    onClose: onCloseClaim,
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
              <Exchange nft={nft} onClose={onClose} setTxHash={setTxHash} />
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
            <Popup isOpen={isOpenClaim} onClose={onCloseClaim}>
              <Claim nft={nft} onClose={onCloseClaim} setTxHash={setTxHash} />
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
                <img src={image} alt="" />
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
            <Performance nft={nft} />
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
              <div className="flex flex-col gap-2">
                <div className="md:flex md:gap-2">
                  <div className="md:mr-2 mb-2 md:mb-0">
                    {Math.round((nft.deposit / 10 ** 18) * 100) / 100}
                  </div>
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
                {isClaimable && (
                  <div className="flex gap-2">
                    <Button
                      onClick={onOpenClaim}
                      isDisabled={
                        isFetching || isFetchingTx || isSafetyModeActivated
                      }
                    >
                      Claim
                    </Button>
                  </div>
                )}
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
