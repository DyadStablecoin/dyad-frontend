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
    functionName: "mint",
    args: [address],
    overrides: { value: String(MIN_DEPOSIT) },
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
            <div className="flex flex-col items-center justify-center border-gray-800 md:border-l-2 md:p-4">
              <div>
                <div>Minimum Deposit</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <div>${MIN_DEPOSIT_USD}</div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-2 border-gray-800 md:border-l-2 md:p-4">
              <Button
                borderColor="#463D81"
                bgColor="#0F0D1B"
                onClick={() => onOpenRebase()}
              >
                Rebase
              </Button>
              <Button
                borderColor="#463D81"
                bgColor="#0F0D1B"
                onClick={() => onOpenClaim()}
              >
                Redeem
              </Button>
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
