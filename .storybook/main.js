module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
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
  },
};
