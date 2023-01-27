import dNFTABI from "../abi/dNFT.json";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import Divider from "./PopupDivider";
import useNftImage from "../hooks/useNftImage";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import { useState } from "react";
import NftSelector from "./NftSelector";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { animated, useSpring } from "react-spring";
import useNft from "../hooks/useNft";
import NftView from "./NftView";

export default function Snipe({ nft, onClose, setTxHash }) {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isShowingNFTs, setIsShowingNFTs] = useState(true);

  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);

  const { selectorHeight } = useSpring({
    from: {
      selectorHeight: 0,
    },
    selectorHeight: isShowingNFTs ? 12 : 0,
  });

  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "snipe",
    args: [nft.tokenId, selectedNFT],
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
      isDisabled={!write || !selectedNFT}
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
        <div>
          <>
            <Divider />
            <div className="flex justify-center text-sm text-secondary py-2">
              <a onClick={() => setIsShowingNFTs(!isShowingNFTs)}>
                {selectedNFT ? "Your dNFT" : "Select your dNFT"}
              </a>
            </div>
          </>
          {selectedNFT && (
            <>
              <table>
                <tr className="border-[#3A403C] border-t border-b">
                  <th></th>
                  <th className="text-sm text-secondary">Rank</th>
                  <th className="text-sm text-secondary">XP</th>
                  <th className="text-sm text-secondary">Value</th>
                </tr>
                <NftView
                  tokenId={selectedNFT}
                  setSelectedTokenId={console.log}
                />
              </table>
              <div className={"w-full justify-end flex px-2"}>
                <a
                  className={"text-sm text-secondary cursor-pointer"}
                  onClick={() => setIsShowingNFTs(true)}
                >
                  Select Different dNFT
                </a>
              </div>
            </>
          )}

          {isShowingNFTs && (
            <animated.div
              className={"absolute bg-black z-10 w-full"}
              style={{
                height: selectorHeight.to((height) => `${height}rem`),
              }}
            >
              <NftSelector
                tokenIds={tokenIds}
                setSelectedTokenId={(nft) => {
                  setSelectedNFT(nft);
                  setIsShowingNFTs(!isShowingNFTs);
                }}
              />
            </animated.div>
          )}
        </div>
        <Divider />
        <div className="w-full px-4 pt-2">
          <Table>
            <Row label="dD" unit="DYAD" _old={0} _new={1} />
            <Row label="xP" unit={"XP"} _old={0} _new={1} />
          </Table>
        </div>
        <div className="text-center text-secondary">
          Claim your dD from the last positive sync
        </div>
      </div>
    </PopupContent>
  );
}
