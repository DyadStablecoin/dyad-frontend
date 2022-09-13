import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useState } from "react";

export default function Mint() {
  const [to, setTo] = useState("0xEd6715D2172BFd50C2DBF608615c2AB497904803");
  const [value, setValue] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "mint",
    args: [to],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl">
        <div className="underline">2.00</div>
        <div className="underline">ETH</div>
      </div>
      <div>to</div>
      <div className="text-2xl">$3500 DYAD</div>
      <Button disabled={!write} onClick={() => write?.()}>
        mint DYAD 15-30 min
      </Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ .02 ETH</div>
      </div>
      <Button>mint DYAD instantly</Button>
    </div>
  );
}
