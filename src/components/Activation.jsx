import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import useGasCost from "../hooks/useGasCost";
import { DOCS_URL } from "../consts/consts";
import useNftImage from "../hooks/useNftImage";
// Said the package exists we use it?
import classNames from "classnames";

// I'd also add clsx/classNames to toggle dynamic class names without losing any classes to tailwind purges.
const StatusLabel = ({ isActive }) => {
  return (
    <div
      className={classNames(
        `rounded px-2 py-1 text-sm text-white font-bold`,
        isActive === 0 ? "bg-red-500" : "bg-[#519C58]"
      )}
    >
      {isActive ? "Activated" : "Deactivated"}
    </div>
  );
};

export default function Activation({ nft, onClose, setTxHash }) {
  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "toggleActivation",
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
  const { nftImage } = useNftImage(nft);

  return (
    <PopupContent
      title="dNFT Activation"
      image={nftImage}
      btnText="dNFTActivation"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/dnft#activation")}
      nft={nft}
    >
      <div className="flex flex-col gap-4">
        <div>
          Your dNFT status: <StatusLabel isActive={nft?.isActive || false} />
        </div>
        <div className="bg-[#3A403C] h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div>Gas Cost</div>
          {/* extend the theme as the green, kept cause why not, no content otherwise. Might look ugly but can't see haha. */}
          <div className="text-[#519C58]">{gasCost} ETH</div>
        </div>
      </div>
    </PopupContent>
  );
}
