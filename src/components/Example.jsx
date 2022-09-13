import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../contracts/abi.json";

export default function Example() {
  const { config } = usePrepareContractWrite({
    addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
    contractInterface: abi,
    functionName: "safeMint",
    args: ["fsfd", "ffff"],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        SafeMint
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
