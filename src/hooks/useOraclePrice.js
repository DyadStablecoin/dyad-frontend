import { useState } from "react";
import { useContractRead } from "wagmi";
import { CURRENT_NETWORK } from "../consts/consts";

const ABI = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function useOraclePrice() {
  const [oraclePrice, setOraclePrice] = useState(0);

  useContractRead({
    addressOrName: CURRENT_NETWORK.oracleAddress,
    contractInterface: ABI,
    functionName: "latestRoundData()",
    onSuccess: (data) => {
      setOraclePrice(parseInt(data[1]._hex));
    },
  });

  return { oraclePrice };
}
