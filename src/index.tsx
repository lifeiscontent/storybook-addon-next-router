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
      push(url, as, options) {
        action('nextRouter.push')(url, as, options);
        return Promise.resolve(true);
      },
      replace(url, as, options) {
        action('nextRouter.replace')(url, as, options);
        return Promise.resolve(true);
      },
      reload() {
        action('nextRouter.reload')();
      },
      back() {
        action('nextRouter.back')();
      },
      prefetch(url, asPath, options) {
        action('nextRouter.prefetch')(url, asPath, options);
        return Promise.resolve();
      },
      beforePopState(cb) {
        action('nextRouter.beforePopState')(cb);
      },
      events: {
        on(type, handler) {
          action('nextRouter.events.on')(type, handler);
        },
        off(type, handler) {
          action('nextRouter.events.off')(type, handler);
        },
        emit(type) {
          action('nextRouter.events.emit')(type);
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
