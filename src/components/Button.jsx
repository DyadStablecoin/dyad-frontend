import { useState } from "react";

export default function Button({
  children,
  onClick,
  isDisabled,
  bgColor, // background color
  borderColor, // background color
}) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  function convertToBrighterColor(color) {
    // convert #000000 to #000001
    const colorCode = color.replace("#", "");
    const colorCodeNumber = parseInt(colorCode, 16);
    const colorCodeNumberBrighter = colorCodeNumber + 10000;
    const colorCodeBrighter = colorCodeNumberBrighter.toString(16);
    return "#" + colorCodeBrighter;
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`border-2 pt-0 pb-0 pr-4 pl-4 cursor-pointer 
      ${isDisabled && "opacity-50 cursor-not-allowed"}
      ${!isDisabled && "hover:border-white"}
      `}
      style={{
        borderColor: borderColor
          ? isHover
            ? convertToBrighterColor(borderColor)
            : borderColor
          : isHover
          ? convertToBrighterColor("#4D524F")
          : "#4D524F",
        backgroundColor: bgColor ? bgColor : "#131513",
      }}
      onClick={() => {
        onClick();
      }}
    >
      <div>{children}</div>
    </div>
  );
}
