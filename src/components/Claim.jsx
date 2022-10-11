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
  });

  return (
    <div>
      {(isLoadingWrite || isLoading) && <Loading isLoading />}
      <div
        className="flex gap-[10rem] border-[1px] border-[#716285] border-2 border-dashed items-center justify-between"
        style={{
          border: "0.2px solid #939393",
        }}
      >
        <div className="flex gap-4 items-center">
          <div className="w-16">
            <img
              src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt="claim"
            />
          </div>
          <div>
            <div>Hi, niracle.eth 👋</div>
            <div>Please mint your dNFT(s) to play</div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            style={{
              borderLeft: "0.2px solid #939393",
            }}
          >
            <div>dNFT Remaining</div>
            <div>231/10000</div>
          </div>
          <div
            style={{
              borderLeft: "0.2px solid #939393",
            }}
          >
            <div>Minimum Deposit</div>
            <div>$300</div>
          </div>
          <div
            style={{
              borderLeft: "0.2px solid #939393",
            }}
          >
            <Button
              disabled={!write}
              onClick={() => {
                write?.();
              }}
            >
              Mint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
