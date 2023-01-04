import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round, normalize, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import useApprove from "../hooks/useApprove";
import useIsApproved from "../hooks/useIsApproved";
import MaxButton from "./MaxButton";
import useMaxDeposit from "../hooks/useMaxDeposit";
import useDyadBalance from "../hooks/useDyadBalance";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import useNftImage from "../hooks/useNftImage";

export default function Deposit({ nft, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState(0);
  const { isApproved, refetch: refetchIsApproved } = useIsApproved(
    address,
    CONTRACT_dNFT,
    dyad
  );
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);
  const { nftImage } = useNftImage(nft);

  const { config: configDeposit, refetch: refetchPrepareDeposit } =
    usePrepareContractWrite({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTABI["abi"],
      functionName: "deposit",
      args: [nft.tokenId, parseEther(dyad)],
    });

  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    () => {
      refetchIsApproved();
      refetchPrepareDeposit();
    }
  );

  const { write: writeDeposit } = useContractWrite({
    ...configDeposit,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Deposit DYAD"
      image={nftImage}
      btnText={
        dyad === "" || parseFloat(dyad) === 0
          ? "Enter an amount"
          : normalize(maxDeposit) < dyad
          ? dyad > normalize(dyadBalance)
            ? "Insufficient DYAD balance"
            : "Insufficient dNFT balance"
          : isApproved
          ? "Deposit"
          : "Approve"
      }
      isDisabled={
        dyad === "" || parseFloat(dyad) === 0 || isFetchingApproval
          ? true
          : normalize(maxDeposit) < dyad
          ? true
          : isApproved
          ? !writeDeposit
          : !writeApprove
      }
      onClick={() => {
        isApproved ? writeDeposit?.() : writeApprove?.();
        if (isApproved) {
          onClose();
        }
      }}
      isLoading={isFetchingApproval}
    >
      <div className="flex flex-col gap-2">
        <Table>
          <Row
            label="dNFT Withdrawls"
            unit="DYAD"
            _old={round(normalize(nft.withdrawn), 2)}
            _new={round(normalize(nft.withdrawn) - parseFloat(dyad), 2)}
          />
        </Table>
        <Divider />
        <div className="flex gap-2 items-center mt-8">
          <div>
            <TextInput
              value={dyad}
              onChange={(v) => {
                setDyad(v);
              }}
              type="number"
              placeholder={0}
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex">
              <div className="rhombus" />
              <div>DYAD</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="text-[#737E76]">
                Balance:{round(normalize(maxDeposit), 2)}
              </div>
              <MaxButton
                onClick={() => setDyad(floor(normalize(maxDeposit), 2))}
              />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
