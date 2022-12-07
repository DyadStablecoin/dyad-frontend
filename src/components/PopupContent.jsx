import PopupButton from "./PopupButton";

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
      <PopupButton onClick={onClick} isDisabled={isDisabled}>
        {btnText}
      </PopupButton>
    </div>
  );
}
