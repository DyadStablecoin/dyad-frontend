import { useDisclosure } from "@chakra-ui/react";
import { useWaitForTransaction } from "wagmi";
import { dNFT_PRICE, RANDOM_IMAGES } from "../consts/consts";
import useFilterAddress from "../hooks/useFilterAddress";
import useIdToOwner from "../hooks/useIdToOwner";
import { addressSummary } from "../utils/address";
import { formatUSD, round } from "../utils/currency";
import { depositRatio } from "../utils/stats";
import Button from "./Button";
import Liquidate from "./Liquidate";
import LoadingInplace from "./LoadingInplace";
import Popup from "./Popup";
import { useState } from "react";
import useNft from "../hooks/useNft";

export default function LeaderboardTableRow({
  isOneLiquidatable,
  nft,
  rank,
  filter,
}) {
  const [txHash, setTxHash] = useState();

  // const { owner: address } = useIdToOwner(nft.id);
  // const { ensName, isMatching, isLoading } = useFilterAddress(address, filter);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { refetch, isLoading: isLoadingNft } = useNft(nft.id);

  function renderLiquidateBtn() {
    if (isOneLiquidatable) {
      if (nft.deposit < 0) {
        return (
          <td className="w-[4rem]">
            <Button onClick={onOpen} style="w-[6rem]" tokenId={nft.id}>
              Liquidate
            </Button>
          </td>
        );
      }
      return <td></td>;
    }
  }

  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      // refetch();
    },
  });

  return (
    <>
      {nft && (
        <tr className="leaderboard-row" style={{ border: "1px solid #3A403C" }}>
          <td>
            <LoadingInplace isLoading={isLoadingTx} style="w-[40px]" />
            <img
              className="w-10 h-10"
              src={RANDOM_IMAGES[rank % RANDOM_IMAGES.length]}
              alt=""
            />
          </td>
          <td>#{rank}</td>
          <td>{nft.xp}</td>
          <td>{formatUSD(dNFT_PRICE)}</td>
          <td className="hidden md:table-cell">
            {round(nft.withdrawn / 10 ** 18, 2)}
          </td>
          <td className="hidden md:table-cell">
            {round(nft.deposit / 10 ** 18, 2)}
          </td>
          {renderLiquidateBtn()}
          <td className="hidden md:table-cell">
            {depositRatio(parseFloat(nft.withdrawn), parseFloat(nft.deposit))}%
          </td>
          <td>{nft.ensName || addressSummary(nft.owner)}</td>
        </tr>
      )}
      <Popup isOpen={isOpen} onClose={onClose}>
        <Liquidate tokenId={nft.id} onClose={onClose} setTxHash={setTxHash} />
      </Popup>
    </>
  );
}
