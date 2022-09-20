import { paginatedIndexesConfig, useContractInfiniteReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dyadABI.json";

const ITEMS_PER_PAGE = 100;

const contractConfig = {
  addressOrName: CONTRACT_dNFT,
  contractInterface: abi,
};

export default function NFTs({ address }) {
  const { data, refetch, isFetching } = useContractInfiniteReads({
    cacheKey: "nfts",
    ...paginatedIndexesConfig(
      (index) => ({
        ...contractConfig,
        functionName: "ownerToNFTokenCount",
        args: [address],
        onSuccess(data) {
          console.log("Success", data);
        },
      }),
      { start: 0, perPage: ITEMS_PER_PAGE, direction: "increment" }
    ),
  });
  console.log(data);

  return (
    <div>
      <div>test</div>
    </div>
  );
}
