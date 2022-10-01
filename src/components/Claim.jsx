import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import Loading from "./Loading";

export default function Claim({ reload, setReload, totalSupply }) {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mint",
    args: [address],
    onSuccess: () => {},
    onError: (e) => {
      console.log("claim", e);
    },
  });

  const { data, isLoading: isLoadingWrite, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setReload(!reload);
      console.log("success");
    },
    // onSettled: () => {
    //   setReload(!reload);
    // },
  });

  return (
    <div>
      {(isLoadingWrite || isLoading) && <Loading isLoading />}
      <div className="flex gap-[10rem] border-[1px] border-[#716285] border-2 border-dashed p-4 items-center justify-between">
        <div className="">
          {2600 - parseInt(totalSupply)}/2600 dNFTs available
        </div>
        <Button
          disabled={!write}
          onClick={() => {
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
