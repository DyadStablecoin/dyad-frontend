import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";

export default function Claim() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mint",
    args: [address],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <div className="flex gap-8 border-[1px] border-white border-dotted p-4 items-center justify-between">
        <div className="">120/2600 dNFTs available</div>
        <Button
          // disabled={!write}
          onClick={() => {
            console.log(3333);
            console.log(write);
            write?.();
          }}
        >
          claim dNFT
        </Button>
        <div className="">5,000 $DYAD minimum deposit</div>
      </div>
    </div>
  );
}
