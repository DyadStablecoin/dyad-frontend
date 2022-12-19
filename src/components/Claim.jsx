import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import dNFT from "../abi/dNFT.json";
import { TOTAL_SUPPLY, MIN_DEPOSIT, MIN_DEPOSIT_USD } from "../consts/consts";
import useBlockchain from "../hooks/useBlockchain";
import LoadingInplace from "./LoadingInplace";
import useBalanceOfNft from "../hooks/useBalanceOfNfts";
import useTotalNftSupply from "../hooks/useTotalNftSupply";

export default function Claim() {
  const { ensName, address } = useBlockchain();

  const { refetch: refetchBalance, nftBalance } = useBalanceOfNft();
  const { refetch: refetchTotalSupply, totalNftSupply } = useTotalNftSupply();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFT["abi"],
    functionName: "mintNft",
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
      <div className="p-4 md:flex md:items-center md:border-b border-gray-800 gap-4 md:justify-between">
        <div className="flex items-center justify-center ">
          <div className="w-[56px]">
            <LoadingInplace isLoading={isLoading} style="mt w-[56px]" />
            <img
              src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt="claim"
            />
          </div>
          <div className="ml-2 p-2">
            <div>Hi, {ensName} 👋</div>
            {nftBalance === 0 ? (
              <div>Please mint your dNFT to play</div>
            ) : (
              <div>Access your dNFT(s) and play below</div>
            )}
          </div>
        </div>
        <div className="md:flex">
          <div className="flex justify-around items-center p-4">
            <div className="md:border-l-2 border-gray-800 md:p-4">
              <div>dNFT Remaining</div>
              <div className="flex gap-1 items-center">
                <div className="rhombus"></div>
                <div>
                  {TOTAL_SUPPLY - totalNftSupply}/{TOTAL_SUPPLY}
                </div>
              </div>
            </div>
            <div className="w-[2px] h-[85px] bg-[#939393] md:invisible"></div>
            <div className="flex flex-col justify-center items-center md:border-l-2 border-gray-800 md:p-4">
              <div>
                <div>Minimum Deposit</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <div>${MIN_DEPOSIT_USD}</div>
              </div>
            </div>
          </div>
          <div className="mt-2 md:border-l-2 border-gray-800 md:p-4 md:flex md:items-center md:justify-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
