import NFT from "./NFT";
import useXP from "../hooks/useXP";
import useNfts from "../hooks/useNfts";
import { useEffect } from "react";

export default function NFTs({ balances, reload, setReload }) {
  const { refetch, nfts } = useNfts();
  const { xps } = useXP(nfts);

  useEffect(() => {
    refetch();
  }, [reload]);

  // make sure the number of nfts we currently have matches the total supply
  // of nfts. we need to check this, because there can be a delay between
  // minting a new nft and getting the nfts, which can cause a mismatch.
  function canRenderNfts() {
    return (
      nfts && balances && Object.keys(nfts).length == balances.totalSupplyOfNfts
    );
  }

  return (
    <div>
      {balances.balanceOfdNFT > 0 && <div className="mb-2">Your dNFTs</div>}
      {canRenderNfts() && (
        <div className="flex flex-col gap-2">
          {[...Array(balances.balanceOfdNFT).keys()].map((i) => {
            return (
              <NFT
                xps={xps}
                nfts={nfts}
                reload={reload}
                setReload={setReload}
                index={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
