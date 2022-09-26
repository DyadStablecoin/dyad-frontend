import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import Loading from "./Loading";

export default function Claim({
  address,
  reload,
  setReload,
  totalSupply,
  setTotalSupply,
}) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mint",
    args: [address],
    onSuccess: () => {},
  });

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "totalSupply",
    onSuccess: (data) => {
      setTotalSupply(data._hex);
    },
  });

  const { data, isLoading: isLoadingWrite, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setReload(!reload);
      refetch();
    },
    onSettled: () => {
      setReload(!reload);
      refetch();
    },
  });

  return (
    <div>
      {(isLoadingWrite || isLoading) && <Loading isLoading />}
      <div className="flex gap-[10rem] border-[1px] border-[#716285] border-2 border-dashed p-4 items-center justify-between">
        <div className="">{parseInt(totalSupply)}/2600 dNFTs available</div>
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
