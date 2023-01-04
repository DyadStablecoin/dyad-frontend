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
  image,
}) {
  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      {image && (
        <div
          className="border w-28 h-28 -mt-14"
          style={{ borderColor: COLORS.Purple }}
        >
          <img src={image} alt="" />
        </div>
      )}
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
