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
          bg: "rgba(255, 255, 255, 0.0)",
          // margin: "0",
          // padding: "0",
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
          <ModalContent className="modal-content">{children}</ModalContent>
        </div>
      </Modal>
    </ChakraProvider>
  );
}
