import React from 'react';
import App, { Container } from 'next/app';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import initializeStore from '../redux/index';
import OfflineSupport from '../components/OfflineSupport';

class CustomApp extends App {

  static async getInitialProps({Component, ctx}) {

    // we can dispatch from here too
    //ctx.store.dispatch({type: 'FOO', payload: 'foo'});
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};

  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <OfflineSupport />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore,null)(CustomApp);
