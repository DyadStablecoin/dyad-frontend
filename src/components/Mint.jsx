import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import dNFT from "../abi/dNFT.json";
import { TOTAL_SUPPLY, MIN_DEPOSIT, MIN_DEPOSIT_USD } from "../consts/consts";
import LoadingInplace from "./LoadingInplace";
import { addressSummary } from "../utils/address";
import useNftBalance from "../hooks/useNftBalance";
import useTotalNftSupply from "../hooks/useTotalNftSupply";
import useEnsNameFromIndexer from "../hooks/useEnsNameFromIndexer";
import { useDisclosure } from "@chakra-ui/react";
import Claim from "./Claim";
import Popup from "./Popup";
import Rebase from "./Rebase";

export default function MintHeader() {
  const { address } = useAccount();
  const { ensName } = useEnsNameFromIndexer(address);

  const { nftBalance, refetch: refetchBalance } = useNftBalance(address);
  const { totalNftSupply, refetch: refetchTotalSupply } = useTotalNftSupply();

  const {
    isOpen: isOpenRebase,
    onOpen: onOpenRebase,
    onClose: onCloseRebase,
  } = useDisclosure();
  const {
    isOpen: isOpenClaim,
    onOpen: onOpenClaim,
    onClose: onCloseClaim,
  } = useDisclosure();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFT["abi"],
    functionName: "mintNft",
    args: [address],
    overrides: { value: MIN_DEPOSIT },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      refetchBalance();
      refetchTotalSupply();
    },
  });

  return (
    <div>
      <div className="gap-4 p-4 border-gray-800 md:flex md:items-center md:border-b md:justify-between">
        <div className="flex items-center justify-center ">
          <div className="w-[56px]">
            <LoadingInplace isLoading={isLoading} style="mt w-[56px]" />
            <img
              src="https://ipfs.pixura.io/ipfs/QmXMFCUUoLjirSZVr8Adca84zqiiu55oek5Bhe13nQjvtE/Punk4892ToyFace-3.jpg"
              alt="claim"
            />
          </div>
          <div className="p-2 ml-2">
            <div>Hi, {ensName || addressSummary(address)} 👋</div>
            {nftBalance === 0 ? (
              <div>Please mint your dNFT to play</div>
            ) : (
              <div>Access your dNFT(s) and play below</div>
            )}
          </div>
        </div>
        <div className="md:flex">
          <div className="flex items-center justify-around p-4">
            <div className="border-gray-800 md:border-l-2 md:p-4">
              <div>dNFT Remaining</div>
              <div className="flex items-center gap-1">
                <div className="rhombus"></div>
                <div>
                  {TOTAL_SUPPLY - totalNftSupply}/{TOTAL_SUPPLY}
                </div>
              </div>
            </div>
            <div className="w-[2px] h-[85px] bg-[#939393] md:invisible"></div>
            <div className="flex flex-col gap-2 border-gray-800 md:border-l-2 md:p-4">
              {write && (
                <Button
                  isDisabled={!write || isLoading}
                  onClick={() => {
                    write?.();
                  }}
                  bgColor="#0E190F"
                  borderColor="#1F4F23"
                >
                  Mint
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        <Popup isOpen={isOpenClaim} onClose={onCloseClaim}>
          <Claim onClose={onCloseClaim} setTxHash={console.log} />
        </Popup>
        <Popup isOpen={isOpenRebase} onClose={onCloseRebase}>
          <Rebase onClose={onCloseRebase} setTxHash={console.log} />
        </Popup>
      </>
    </div>
  );
}
