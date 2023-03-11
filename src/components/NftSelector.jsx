import React, { useState } from "react";
import NftView from "./NftView";
import { animated, useSpring } from "react-spring";
import Label from "./Label";
import useIDsByOwner from "../hooks/useIDsByOwner";
import { useAccount } from "wagmi";
import Divider from "./PopupDivider";

export default function NftSelector({ selectedNFT, dropSize, setSelectedNFT }) {
  const [isShowingNFTs, setIsShowingNFTs] = useState(true);

  const { address } = useAccount();
  const { tokenIds } = useIDsByOwner(address);

  const { selectorHeight } = useSpring({
    from: {
      selectorHeight: 0,
    },
    selectorHeight: isShowingNFTs ? dropSize : 0,
  });

  return (
    <div className="w-full">
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
                <Label>Value</Label>
              </th>
            </tr>
            <NftView tokenId={selectedNFT} setSelectedTokenId={console.log} />
          </table>
          <div className={"w-full justify-end flex px-2"}>
            {tokenIds.length > 1 && (
              <a
                className={"cursor-pointer"}
                onClick={() => setIsShowingNFTs(true)}
              >
                <Label>Select Different dNFT</Label>
              </a>
            )}
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
          <table>
            <tr className="border-[#3A403C] border-t border-b">
              <th></th>
              <th className="text-sm text-secondary">Rank</th>
              <th className="text-sm text-secondary">XP</th>
              <th className="text-sm text-secondary">Value</th>
            </tr>
            {tokenIds.map((tokenId) => {
              return (
                <NftView
                  tokenId={parseInt(tokenId._hex)}
                  setSelectedTokenId={(nft) => {
                    setSelectedNFT(nft);
                    setIsShowingNFTs(!isShowingNFTs);
                  }}
                />
              );
            })}
          </table>
        </animated.div>
      )}
    </div>
  );
}
