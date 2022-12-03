import NFT from "./NFT";
import useXP from "../hooks/useXP";
import useNfts from "../hooks/useNfts";

export default function NFTs({ balances }) {
  const { nfts } = useNfts();
  const { xps } = useXP(nfts);

  return (
    <div>
      {balances.balanceOfdNFT > 0 && <div className="mb-2">Your dNFTs</div>}
      {xps && (
        <div className="flex flex-col gap-2">
          {[...Array(balances.balanceOfdNFT).keys()].map((i) => {
            return <NFT xps={xps} index={i} />;
          })}
        </div>
      )}
    </div>
  );
}
