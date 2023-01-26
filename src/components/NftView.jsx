import useNft from "../hooks/useNft";
import useNftImage from "../hooks/useNftImage";
import { formatUSD } from "../utils/currency";
import { dNFT_PRICE } from "../consts/consts";

export default function NftView({ tokenId, setSelectedTokenId }) {
  const { nft } = useNft(tokenId);
  const { nftImage: image } = useNftImage(nft);

  return (
    <tr onClick={() => setSelectedTokenId(tokenId)}>
      <td className="w-[50px]">
        <img src={image} alt="" />
      </td>
      <td>{nft.xp}</td>
      <td>#5</td>
      <td>{formatUSD(dNFT_PRICE)}</td>
    </tr>
  );
}
