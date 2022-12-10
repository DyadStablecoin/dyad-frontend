import Button from "./Button";

export default function PopupButton({
  children,
  onClick,
  isDisabled,
  isLoading,
}) {
  return (
    <Button
      onClick={onClick}
      isDisabled={isDisabled}
      isLarge
      bgColor="#0E190F"
      borderColor="#519C58"
      textColor="#519C58"
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}
