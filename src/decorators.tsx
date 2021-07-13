import { action } from '@storybook/addon-actions';
import React from 'react';
import Router, { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { StoryContext } from '@storybook/addons';
import { useGlobals } from '@storybook/client-api';

export const WithNextRouter = (
  Story: React.FC<unknown>,
  context: StoryContext
): JSX.Element => {
  const [{ locale }] = useGlobals();

  Router.router = {
    locale,
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
    ...context.parameters.nextRouter,
  } as typeof Router.router;

  return (
    <RouterContext.Provider value={Router.router as NextRouter}>
      <Story />
    </RouterContext.Provider>
  );
};
