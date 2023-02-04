import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

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

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme} resetCSS>
      <ColorModeScript />
      <Story />
    </ChakraProvider>
  ),
];
