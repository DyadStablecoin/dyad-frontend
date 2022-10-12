export default function Button({
  children,
  onClick,
  isSecondary,
  isDisabled,
  bgColor, // background color
  borderColor, // background color
}) {
  return (
    <div
      className={`border-2 pt-0 pb-0 pr-4 pl-4 cursor-pointer 
      ${isSecondary && "border-[#FFAFAF] "}
      ${isDisabled && !isSecondary && "opacity-50 cursor-not-allowed"}
      ${
        !isDisabled &&
        !isSecondary &&
        "hover:border-[#00ff65] hover:text-[#00ff65]"
      }
      ${
        !isDisabled &&
        isSecondary &&
        "hover:border-[#FF5733] hover:text-[#FF5733]"
      }
      `}
      style={{
        borderColor: borderColor ? borderColor : "#4D524F",
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
