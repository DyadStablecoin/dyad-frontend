import { InfoCircleOutlined, DownOutlined } from "@ant-design/icons";
import PopupButton from "./PopupButton";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import useRank from "../hooks/useRankFromIndexer";
import Divider from "./PopupDivider";
import Label from "./Label";
import useNftImage from "../hooks/useNftImage";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import classNames from "classnames";

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
  const { rank } = useRank(nft?.tokenId, lastSyncVersion);
  const { nftImage } = useNftImage(nft);
  const [isShowingExplanation, setIsShowingExplanation] = useState(true);
  const ref = useRef(null);
  const [style, animate] = useSpring(() => ({ height: "0px" }), []);

  useEffect(() => {
    if (explanation)
      animate({
        height: (isShowingExplanation ? ref.current.offsetHeight : 0) + "px",
      });
  }, [animate, ref, isShowingExplanation, explanation]);

  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      {nftImage && (
        <div className="flex items-center justify-between w-full">
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
      <div className="flex items-center gap-4 pl-5 pr-5 text-2xl">
        <a
          className={classNames(
            explanation ? "cursor-pointer" : "cursor-default"
          )}
          onClick={() => {
            if (explanation) {
              setIsShowingExplanation(!isShowingExplanation);
            }
          }}
        >
          {title}
        </a>
        {explanation && (
          <div
            className={classNames(
              "transition-all duration-150 w-min h-min",
              isShowingExplanation ? "rotate-0" : "rotate-180"
            )}
          >
            <Icon
              onClick={() => setIsShowingExplanation(!isShowingExplanation)}
            >
              <DownOutlined
                style={{ fontSize: "0.9rem", color: COLORS.Purple }}
              />
            </Icon>
          </div>
        )}
        {infoOnClick && (
          <Icon onClick={infoOnClick}>
            <InfoCircleOutlined
              style={{ fontSize: "0.9rem", color: COLORS.Purple }}
            />
          </Icon>
        )}
      </div>
      {explanation && (
        <animated.div
          className="overflow-hidden"
          style={{
            ...style,
          }}
        >
          <div ref={ref} className={"p-4"}>
            <Label>{explanation}</Label>
          </div>
        </animated.div>
      )}
      <div className="w-full mt-2 mb-2">{children}</div>
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
