import Button from "./Button";
import { useState } from "react";
import Mint from "./Mint";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "#000000",
        },
      }),
    },
  },
});

export default function Row() {
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex gap-8 border-[1px] border-white p-4 items-center">
      <ChakraProvider theme={theme}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Mint />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      <div className="underline underline-offset-4">#3852</div>
      <div className="underline underline-offset-4">$58,000</div>
      <div className="underline underline-ffset-4">100,000</div>
      <Button onClick={onOpen}>mint</Button>
      <div className="underline underline-offset-4">70,500</div>
      <Button>deposit</Button>
      <Button>withdraw</Button>
      <div className="underline underline-offset-4">5,000</div>
      <Button>sync</Button>
    </div>
  );
}
