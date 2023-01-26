import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import Divider from "./PopupDivider";
import useNftImage from "../hooks/useNftImage";
import Table from "./PopupTable";
import Row from "./PopupTableRow";

export default function Snipe({ nft, onClose, setTxHash }) {
  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "snipe",
    args: [nft.tokenId],
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  const { nftImage } = useNftImage(nft);

  // TODO this logic + dD/bD / xP earned lost etc
  const wasLastSyncPositive = true;

  return (
    <PopupContent
      title="Snipe"
      image={nftImage}
      btnText="Snipe"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/dnft#snipe")}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row label="dD" unit="DYAD" _old={0} _new={1} />
            <Row label="xP" unit={"XP"} _old={0} _new={1} />
          </Table>
        </div>
        <Divider />
        <div className="text-center text-secondary">
          Claim your dD from the last positive sync
        </div>
      </div>
    </PopupContent>
  );
}
