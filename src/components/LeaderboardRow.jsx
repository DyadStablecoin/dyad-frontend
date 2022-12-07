import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { dNFT_PRICE, RANDOM_IMAGES } from "../consts/consts";
import useEnsName from "../hooks/useEnsName";
import useIdToOwner from "../hooks/useIdToOwner";
import { addressSummary } from "../utils/address";
import { formatUSD } from "../utils/currency";

export default function LeaderboardRow({ nft, rank, filter }) {
  const { owner } = useIdToOwner(nft.id);
  const { ensName } = useEnsName(owner);

  return (
    <>
      {ensName && ensName.includes(filter) && (
        <tr style={{ border: "1px solid #3A403C" }}>
          <td>
            <img
              className="w-10 h-10"
              src={RANDOM_IMAGES[rank % RANDOM_IMAGES.length]}
              alt=""
            />
          </td>
          <td>#{rank + 1}</td>
          <td>{nft.xp}</td>
          <td>{formatUSD(dNFT_PRICE)}</td>
          <td className="hidden md:table-cell">
            <div className="flex gap-2 items-center justify-center">
              <div>
                <ArrowUpOutlined style={{ color: "#00FF00" }} />
              </div>
              <div>5</div>
            </div>
          </td>
          <td className="hidden md:table-cell">
            <div className="flex gap-2 items-center justify-center">
              <div>
                <ArrowDownOutlined style={{ color: "red" }} />
              </div>
              <div>5</div>
            </div>
          </td>
          <td className="hidden md:table-cell">
            <div className="flex gap-2 items-center justify-center">
              <div>
                <ArrowUpOutlined style={{ color: "#00FF00" }} />
              </div>
              <div>5</div>
            </div>
          </td>
          <td>{ensName || addressSummary(owner)}</td>
        </tr>
      )}
    </>
  );
}
