import { InfoCircleOutlined } from "@ant-design/icons";
import PopupButton from "./PopupButton";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import useRank from "../hooks/useRankFromIndexer";
import Divider from "./PopupDivider";
import Label from "./Label";
import useNftImage from "../hooks/useNftImage";

export default function PopupContent({
  children,
  title,
  explanation,
  btnText,
  onClick,
  isDisabled,
  isLoading,
  infoOnClick,
  nft,
}) {
  const { lastSyncVersion } = useLastSyncVersion();
  const { rank } = useRank(nft.tokenId, lastSyncVersion);
  const { nftImage } = useNftImage(nft);

  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      {nftImage && (
        <div className="w-full flex justify-between items-center">
          <p className="w-1/4 p-4 text-[#F0F0F0]">
            {rank > 0 ? `#${rank}` : ""}
          </p>
          <div
            className="border w-28 h-28 -mt-14"
            style={{ borderColor: COLORS.Purple }}
          >
            <img src={nftImage} alt="" />
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
      {explanation && (
        <div className="p-4">
          <Label>{explanation}</Label>
        </div>
      )}
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
