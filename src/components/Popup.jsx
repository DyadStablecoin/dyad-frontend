import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import Button from "./Button";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "#3d3e40",
          opacity: "0.55",
        },
      }),
    },
  },
});

export default function Popup({ isOpen, onClose, children }) {
  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="modal">
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            {/* <ModalCloseButton /> */}
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </ChakraProvider>
  );
}
