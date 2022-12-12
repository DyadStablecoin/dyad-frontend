import { useState } from "react";
import { convertToBrighterColor } from "../utils/colorUtils";
import LoadingCore from "./LoadingCore";

export default function Button({
  children,
  onClick,
  isDisabled,
  bgColor, // background color
  borderColor,
  textColor,
  isLarge,
  isLoading,
  style,
}) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer flex justify-center items-center
      ${
        isLarge
          ? "border-[1px] w-full p-[1rem] text-xl"
          : "border-2 pt-0 pb-0 pr-4 pl-4"
      }
      ${style && style}
      ${isDisabled && "opacity-50 cursor-not-allowed"}
      ${!isDisabled && "hover:border-white"}
      `}
      style={{
        color: textColor ? textColor : "white",
        borderColor: borderColor
          ? isHover
            ? convertToBrighterColor(borderColor)
            : borderColor
          : isHover
          ? convertToBrighterColor("#4D524F")
          : "#4D524F",
        borderWidth: "1px",
        backgroundColor: bgColor ? bgColor : "#131513",
      }}
      onClick={() => {
        !isDisabled && onClick();
      }}
    >
      <div className="flex gap-2 justify-center items-center">
        {children}
        {isLoading && (
          <div>
            <LoadingCore isLoading color={borderColor} style="w-[2rem] m-1" />
          </div>
        )}
      </div>
    </div>
  );
}
