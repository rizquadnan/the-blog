const { injectAxe, checkA11y, configureAxe } = require("axe-playwright");
const { getStoryContext } = require("@storybook/test-runner");

module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not run a11y tests on disabled stories.
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Set the rules defined in Storybook preview js
    configureAxe(page, {
      rules: storyContext?.parameters?.a11y?.config?.rules ?? [],
    });

    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    const accessibilityTree = await page.accessibility.snapshot();
    expect(accessibilityTree).toMatchSnapshot();
  },
};
