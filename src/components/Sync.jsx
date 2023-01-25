import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import useGasCost from "../hooks/useGasCost";
import { DOCS_URL } from "../consts/consts";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import Divider from "./PopupDivider";
import useLastEthPrice from "../hooks/useLastEthPrice";
import useOraclePrice from "../hooks/useOraclePrice";
import { round, normalize } from "../utils/currency";
import useNftImage from "../hooks/useNftImage";

export default function Sync({ nft, onClose, setTxHash }) {
  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "sync",
    args: [nft.tokenId],
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  const { gasCost } = useGasCost(config);
  const { oraclePrice } = useOraclePrice();
  const { lastEthPrice } = useLastEthPrice();
  const { nftImage } = useNftImage(nft);

  return (
    <PopupContent
      title="Sync"
      image={nftImage}
      btnText="Sync"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/pool#sync")}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="ETH Price"
              unit="$"
              _old={round(lastEthPrice, 2)}
              _new={round(normalize(oraclePrice, 8), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div>+ help sync ALL DYAD NFT's for all players!</div>
        <div className="bg-[#3A403C] h-[1px] w-full"></div>
        <div className="flex w-full justify-between px-4">
          <div>Sync Cost</div>
          <div className="text-[#519C58]">{gasCost} ETH</div>
        </div>
      </div>
    </PopupContent>
  );
}
