import NFT from "./NFT";
import useXP from "../hooks/useXP";
import useNfts from "../hooks/useNfts";
import useAverage from "../hooks/useAverage";
import { useBalances } from "../hooks/useBalances";

export default function NFTs() {
  const { balances } = useBalances();
  const { nfts } = useNfts();
  const { xps } = useXP(nfts);
  const { average } = useAverage(xps);

  return (
    <>
      {balances.balanceOfdNFT > 0 && (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {[...Array(balances.balanceOfdNFT).keys()].map((i) => {
              return <NFT xps={xps} xpsAverage={average} index={i} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
