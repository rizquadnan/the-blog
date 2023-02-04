const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@chakra-ui/storybook-addon",
  ],
  framework: "@storybook/react",
  core: {
    builder: {
      name: "webpack5",
      options: {
        fsCache: true,
      },
    },
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
  features: {
    storyStoreV7: true,
    emotionAlias: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@": path.resolve(__dirname, "../src"),
        },
      },
    };
  },
};
