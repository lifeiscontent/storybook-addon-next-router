if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

export const withNextRouter = () => (): JSX.Element => {
  throw new Error(
    'Please look at the new configuration for storybook-addon-apollo-client: https://github.com/lifeiscontent/storybook-addon-next-router'
  );
};
