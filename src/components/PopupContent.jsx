export default function PopupContent({
  children,
  title,
  btnText,
  onClick,
  isDisabled,
}) {
  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      <div className="pt-5 pr-5 pl-5 text-2xl">{title}</div>
      <div className="bg-[#3A403C] h-[1px] w-full"></div>
      <div className="mt-2 mb-2">{children}</div>
      <div
        className={`text-[#519C58] bg-[#0E190F] border-[1px] border-[#519C58] w-full flex items-center justify-center p-[1rem] text-xl cursor-pointer 
      ${isDisabled && "opacity-50 cursor-not-allowed"}
      ${!isDisabled && "hover:font-bold "}
        `}
        onClick={onClick}
      >
        {btnText}
      </div>
    </div>
  );
}
