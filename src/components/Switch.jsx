import {
  ChakraProvider,
  Switch,
  createMultiStyleConfigHelpers,
  extendTheme,
} from "@chakra-ui/react";
import Label from "./Label";
import { switchAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: "rgba(255,255,255, 0.75)",
  },
  track: {
    borderRadius: "1px",
    bg: "rgba(255,255,255, 0.25)",
    _checked: {
      bg: "#0F0D1B",
      border: "1px solid #463D81",
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  components: { Switch: switchTheme },
});

export default function Switch({ label, checked, onChange }) {
  return (
    <div className="flex gap-2">
      <Label>{label}</Label>
      <ChakraProvider theme={theme}>
        <Switch
          colorScheme={"purple"}
          isChecked={checked}
          onChange={onChange}
        />
      </ChakraProvider>
    </div>
  );
}
