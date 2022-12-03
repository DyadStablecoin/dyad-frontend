import NFT from "./NFT";
import useXP from "../hooks/useXP";

export default function NFTs({ balances, nfts, reload, setReload }) {
  const { xps } = useXP(nfts);

  return (
    <div>
      {balances.balanceOfdNFT > 0 && <div className="mb-2">Your dNFTs</div>}
      {nfts && (
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
