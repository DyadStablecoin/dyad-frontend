import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import { COLORS } from "../consts/colors";
import Divider from "./PopupDivider";
import useDyadDelta from "../hooks/useDyadDelta";

// TODO: Bring in function
export default function Claim({ onClose, setTxHash }) {
  const { dyadDelta } = useDyadDelta();

  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "claim",
    args: [-1],
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Claim"
      btnText="Claim"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/dnft#claim")}
    >
      <div className="flex flex-col gap-4">
        <Divider />
        <div className="text-center text-secondary">
          Claim your DYAD deposit from the last
          {dyadDelta > 0 ? (
            <span style={{ color: COLORS.Green }}> positive </span>
          ) : (
            <span style={{ color: COLORS.Red }}> negative </span>
          )}
          sync
        </div>
      </div>
    </PopupContent>
  );
}
