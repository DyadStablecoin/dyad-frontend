import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { normalize, parseEther } from "../utils/currency";
import { round, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import MaxButton from "./MaxButton";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import useNftImage from "../hooks/useNftImage";
import { animated, useSpring } from "react-spring";
import NftView from "./NftView";
import Label from "./Label";
import NftSelector from "./NftSelector";
import useIDsByOwner from "../hooks/useIDsByOwner";
import useNft from "../hooks/useNft";

export default function MoveDeposit({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isShowingNFTs, setIsShowingNFTs] = useState(true);

  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);
  const { nftImage } = useNftImage(nft);
  const { nft: selected } = useNft(selectedNFT);

  const { selectorHeight } = useSpring({
    from: {
      selectorHeight: 0,
    },
    selectorHeight: isShowingNFTs ? 8 : 0,
  });

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "move",
    // TODO: get from nft
    args: [selectedNFT, nft.tokenId, parseEther(dyad)],
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
      title="Send DYAD"
      btnText="Send"
      onClick={() => {
        write?.();
        onClose();
      }}
      isDisabled={!write || !selectedNFT}
      image={nftImage}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="This dNFT Balance"
              unit="DYAD"
              _old={round(normalize(nft.deposit), 2)}
              _new={round(normalize(nft.deposit) + parseFloat(dyad), 2)}
            />
            <Row
              label="My dNFT Balance"
              unit="DYAD"
              _old={round(normalize(selected.deposit), 2)}
              _new={round(normalize(selected.deposit) - parseFloat(dyad), 2)}
            />
          </Table>
        </div>
        <div className={"w-full"}>
          <>
            <Divider />
            <div className="flex justify-center py-2">
              <a onClick={() => setIsShowingNFTs(!isShowingNFTs)}>
                <Label>{selectedNFT ? "Your dNFT" : "Select your dNFT"}</Label>
              </a>
            </div>
          </>
          {selectedNFT && (
            <>
              <table>
                <tr className="border-[#3A403C] border-t border-b">
                  <th></th>
                  <th>
                    <Label>Rank</Label>
                  </th>
                  <th>
                    <Label>XP</Label>
                  </th>
                  <th>
                    <Label>Value</Label>
                  </th>
                </tr>
                <NftView
                  tokenId={selectedNFT}
                  setSelectedTokenId={console.log}
                />
              </table>
              <div className={"w-full justify-end flex px-2"}>
                <a
                  className={"cursor-pointer"}
                  onClick={() => setIsShowingNFTs(true)}
                >
                  <Label>Select Different dNFT</Label>
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
        <div className="flex gap-2 items-center">
          <div>
            <TextInput
              value={dyad}
              onChange={(v) => setDyad(v)}
              placeholder={0}
              type="number"
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex">
              <div className="rhombus" />
              <div>DYAD</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="text-[#737E76]">
                Balance:{round(normalize(nft.deposit), 2)}
              </div>
              <MaxButton
                onClick={() => setDyad(floor(normalize(nft.deposit), 2))}
              />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
