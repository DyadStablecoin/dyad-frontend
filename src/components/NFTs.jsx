import NFT from "./NFT";
import useXP from "../hooks/useXP";
import useNfts from "../hooks/useNfts";
import useAverage from "../hooks/useAverage";
import useBalanceOfNft from "../hooks/useBalanceOfNfts";

export default function NFTs() {
  // const { nfts } = useNfts();
  // const { xps } = useXP(nfts);
  // const { average } = useAverage(xps);
  const { nftBalance } = useBalanceOfNft();

  return (
    <>
      {nftBalance > 0 ? (
        <div>
          <div className="mb-2">Your dNFTs</div>
          <div className="flex flex-col gap-2">
            {[...Array(nftBalance).keys()].map((i) => {
              return <NFT index={i} />;
            })}
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-xl mt-[8rem]">
          Wow, such empty...
        </div>
      )}
    </>
  );
}
