import { action } from '@storybook/addon-actions';
import { makeDecorator } from '@storybook/addons';
import React from 'react';
import Router, { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

export const withNextRouter = makeDecorator({
  name: 'NextRouter',
  parameterName: 'nextRouter',
  wrapper(getStory, context, settings) {
    Router.router = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push(...args) {
        action('nextRouter.push')(...args);
        return Promise.resolve(true);
      },
      replace(...args) {
        action('nextRouter.replace')(...args);
        return Promise.resolve(true);
      },
      reload(...args) {
        action('nextRouter.reload')(...args);
      },
      back(...args) {
        action('nextRouter.back')(...args);
      },
      prefetch(...args) {
        action('nextRouter.prefetch')(...args);
        return Promise.resolve();
      },
      beforePopState(...args) {
        action('nextRouter.beforePopState')(...args);
      },
      events: {
        on(...args) {
          action('nextRouter.events.on')(...args);
        },
        off(...args) {
          action('nextRouter.events.off')(...args);
        },
        emit(...args) {
          action('nextRouter.events.emit')(...args);
        },
      },
      isFallback: false,
      ...settings.options,
      ...settings.parameters,
    } as typeof Router.router;

    return (
      <RouterContext.Provider value={Router.router as NextRouter}>
        {getStory(context)}
      </RouterContext.Provider>
    );
  },
});
