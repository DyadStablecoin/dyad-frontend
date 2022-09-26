import { NFT_COLORS } from "../consts/colors";
import NFT from "./NFT";

export default function NFTs({ reload, address, ETH2USD, averageXP }) {
  return (
    <div>
      <div className="flex flex-col gap-8">
        {[...Array(20).keys()].map((i) => {
          // TODO: comment
          return (
            <NFT
              reload={reload}
              address={address}
              id={i}
              ETH2USD={ETH2USD}
              averageXP={averageXP}
              // show header only for the first item
              // TODO: super hacky, needs refactoring
              showHeader={i === 0}
              // xp
              borderColor={NFT_COLORS[i % NFT_COLORS.length]}
            />
          );
        })}
      </div>
    </div>
  );
}
