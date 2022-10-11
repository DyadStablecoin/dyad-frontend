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
import { TOTAL_SUPPLY } from "../consts/consts";

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
        className="pl-4 pr-4  flex items-center justify-between w-full"
        style={{
          borderBottom: "0.2px solid #939393",
        }}
      >
        <div className="flex gap-4 items-center ml-10">
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
            className="p-6"
            style={{
              borderLeft: "0.2px solid #939393",
            }}
          >
            <div>dNFT Remaining</div>
            <div className="flex gap-1 items-center">
              <div className="rhombus"></div>
              <div>{TOTAL_SUPPLY - totalSupply}/10000</div>
            </div>
          </div>
          <div
            className="p-6"
            style={{
              borderLeft: "0.2px solid #939393",
            }}
          >
            <div>
              <div>Minimum Deposit</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <div>$300</div>
            </div>
          </div>
          <div
            className="p-10 mr-6"
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
