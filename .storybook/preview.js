import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";

import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
    />
  ),
});

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
  a11y: {
    config: {
      rules: [
        {
          // this rule is disabled because chakra ui gives a lot of multiple id
          id: "duplicate-id",
          enabled: false,
        },
      ],
    },
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
