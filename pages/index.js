import Head from 'next/head';
import {Fragment} from 'react';
import Router from 'next/router'

const Index = () => {
  
  return (

        <Fragment>
        </Fragment>
  )
}

Index.getInitialProps = async function({store, isServer, pathname,req, res, query}) {
  
  if (req) {
    console.log('server side')
    res.writeHead(301, {Location: `/feeds/top`});
    res.end();
  } else {
    console.log('client side')
    Router.push(`/feeds/top`);
  }
}


export default Index;