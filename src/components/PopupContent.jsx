import { InfoCircleOutlined } from "@ant-design/icons";
import PopupButton from "./PopupButton";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import useRank from "../hooks/useRankFromIndexer";
import Divider from "./PopupDivider";

export default function PopupContent({
  children,
  title,
  btnText,
  onClick,
  isDisabled,
  isLoading,
  infoOnClick,
  image,
  nft,
}) {
  const { lastSyncVersion } = useLastSyncVersion();
  const { rank } = useRank(nft.tokenId, lastSyncVersion);

  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      {image && (
        <div className="w-full flex justify-between items-center">
          <p className="w-1/4 p-4 text-[#F0F0F0]">
            {rank > 0 ? `#${rank}` : ""}
          </p>
          <div
            className="border w-28 h-28 -mt-14"
            style={{ borderColor: COLORS.Purple }}
          >
            <img src={image} alt="" />
          </div>
          <p className="w-1/4 p-4 text-[#F0F0F0]">{nft.xp} XP</p>
        </div>
      )}
      <Divider />
      <div className="pr-5 pl-5 text-2xl flex gap-4">
        <div>{title}</div>
        {infoOnClick && (
          <Icon onClick={infoOnClick}>
            <InfoCircleOutlined
              style={{ fontSize: "0.9rem", color: COLORS.Purple }}
            />
          </Icon>
        )}
      </div>
      <div className="mt-2 mb-2 w-full">{children}</div>
      <PopupButton
        onClick={onClick}
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        {btnText}
      </PopupButton>
    </div>
  );
}
