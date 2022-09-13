import Button from "./Button";
import Popup from "./Popup";
import { useDisclosure } from "@chakra-ui/react";
import Mint from "./Mint";
import Sync from "./Sync";

export default function Row() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSync,
    onOpen: onOpenSync,
    onClose: onCloseSync,
  } = useDisclosure();

  return (
    <div className="flex gap-8 border-[1px] border-white p-4 items-center">
      <div className="underline underline-offset-4">#3852</div>
      <div className="underline underline-offset-4">$58,000</div>
      <div className="underline underline-ffset-4">100,000</div>
      <Button onClick={onOpen}>mint</Button>
      <Popup isOpen={isOpen} onClose={onClose}>
        <Mint />
      </Popup>
      <div className="underline underline-offset-4">70,500</div>
      <Button>deposit</Button>
      <Button>withdraw</Button>
      <div className="underline underline-offset-4">5,000</div>
      <Button onClick={onOpenSync}>sync</Button>
      <Popup isOpen={isOpenSync} onClose={onCloseSync}>
        <Sync />
      </Popup>
    </div>
  );
}
