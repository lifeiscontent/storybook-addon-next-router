# You might not need this project

https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/

## Storybook Addon Next Router

Use Next.js Router in your Storybook stories.

## Versions

- Use 1.x if you're using storybook 5.x
- Use 3.x if you're using storybook 6.x
- Use 4.x if you're using storybook 6.x and react 18

**Note: these docs refer to 3.0**


Add the addon to your configuration in `.storybook/main.js`

```js
module.exports = {
  ...config,
  addons: [
    ...your addons
    "storybook-addon-next-router",
  ],
};
```

Add the RouterContext.Provider to `.storybook/preview.js`

```js
import { AppRouterContext } from "next/dist/shared/lib/app-router-context"; // next 13 next 13 (using next/navigation)
// import { RouterContext } from "next/dist/shared/lib/router-context"; // next 13 (using next/router) / next 12
// import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.1
// import { RouterContext } from "next/dist/next-server/lib/router-context"; // next < 11.1

export const parameters = {
  nextRouter: {
    Provider: AppRouterContext.Provider, // next 13 next 13 (using next/navigation)
    // Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
  },
}
```

## Usage in story

```jsx
import MyComponentThatHasANextLink from "../component-that-has-a-next-link";

export default {
  title: "My Story",
};

// if you have the actions addon
// you can click the links and see the route change events there
export const Example = () => <MyComponentThatHasANextLink />;

Example.parameters = {
  nextRouter: {
    pathname: "/profile/[id]",
    asPath: "/profile/lifeiscontent",
    query: {
      id: "lifeiscontent",
    },
  },
};
```

### Custom defaults

in `preview.js`

```js
export const parameters = {
    nextRouter: {
        pathname: '/', // defaults to `/`
        asPath: '/', // defaults to `/`
        query: {}, // defaults to `{}`
        push() {
        } // defaults to using addon actions integration,
        //   can override any method in the router
    }
};

```

Read more about the options available for next/router at https://nextjs.org/docs/api-reference/next/router

## Example App

To see real world usage of how to use this addon, check out the example app:

https://github.com/lifeiscontent/realworld
