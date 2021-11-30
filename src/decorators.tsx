import React from 'react';
import Router, { NextRouter } from 'next/router';
import { action } from '@storybook/addon-actions';
import { StoryContext } from '@storybook/addons';


export const WithNextRouter = (
  Story: React.FC<unknown>,
  context: StoryContext
): JSX.Element => {

  const { Provider, ...parameters } = context.parameters.nextRouter ?? {};

  if (Provider === undefined) throw new Error('NextContext.Provider is undefined, please add it to parameters.nextRouter.Provider');

  Router.router = {
    locale: context?.globals?.locale,
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push(...args: unknown[]) {
      action('nextRouter.push')(...args);
      return Promise.resolve(true);
    },
    replace(...args: unknown[]) {
      action('nextRouter.replace')(...args);
      return Promise.resolve(true);
    },
    reload(...args: unknown[]) {
      action('nextRouter.reload')(...args);
    },
    back(...args: unknown[]) {
      action('nextRouter.back')(...args);
    },
    prefetch(...args: unknown[]) {
      action('nextRouter.prefetch')(...args);
      return Promise.resolve();
    },
    beforePopState(...args: unknown[]) {
      action('nextRouter.beforePopState')(...args);
    },
    events: {
      on(...args: unknown[]) {
        action('nextRouter.events.on')(...args);
      },
      off(...args: unknown[]) {
        action('nextRouter.events.off')(...args);
      },
      emit(...args: unknown[]) {
        action('nextRouter.events.emit')(...args);
      },
    },
    isFallback: false,
    ...parameters,
  } as typeof Router.router;

  return (
    <Provider value={Router.router as NextRouter}>
      <Story />
    </Provider>
  );
};
