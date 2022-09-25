import { NFT_COLORS } from "../consts/colors";
import Row from "./Row";

export default function NFTs({ reload, address, ETH2USD }) {
  return (
    <div>
      <div className="flex flex-col gap-8">
        {[...Array(5).keys()].map((i) => {
          // TODO: comment
          return (
            <Row
              reload={reload}
              address={address}
              id={i}
              ETH2USD={ETH2USD}
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
