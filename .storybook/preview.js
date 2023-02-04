import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";

const theme = require("../src/config/theme");

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
};

function ColorMode(props) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(props.colorMode);
  }, [props.colorMode]);

  return props.children;
}

export const globalTypes = {
  colorMode: {
    name: "Color Mode",
    defaultValue: "light",
    toolbar: {
      items: [
        { title: "Chakra Light", value: "light" },
        { title: "Chakra Dark", value: "dark" },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <ChakraProvider theme={theme} resetCSS>
      <ColorMode colorMode={context.globals.colorMode}>
        <ColorModeScript />
        <Story />
      </ColorMode>
    </ChakraProvider>
  ),
];
