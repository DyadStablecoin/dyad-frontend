import { Switch } from "@chakra-ui/react";
import Label from "./Label";

export default function ActivationSwitch({
  nft,
  onOpenActivate,
  onOpenDeactivate,
}) {
  return (
    <div className="flex gap-2">
      <Label>Active</Label>
      <Switch
        isChecked={nft.isActive}
        onChange={() => {
          nft.isActive ? onOpenDeactivate() : onOpenActivate();
        }}
      />
    </div>
  );
}
