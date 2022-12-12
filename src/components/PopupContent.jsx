import { InfoCircleOutlined } from "@ant-design/icons";
import PopupButton from "./PopupButton";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";

export default function PopupContent({
  children,
  title,
  btnText,
  onClick,
  isDisabled,
  isLoading,
  infoOnClick,
}) {
  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      <div className="pt-5 pr-5 pl-5 text-2xl flex gap-4">
        <div>{title}</div>
        {infoOnClick && (
          <Icon onClick={infoOnClick}>
            <InfoCircleOutlined
              style={{ fontSize: "0.9rem", color: COLORS.Purple }}
            />
          </Icon>
        )}
      </div>
      <div className="bg-[#3A403C] h-[1px] w-full"></div>
      <div className="mt-2 mb-2">{children}</div>
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
