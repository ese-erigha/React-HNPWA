import {Fragment} from 'react';
import Head from './head';
import Navbar from './navbar';

const Layout = (props) => (
    <Fragment>
      <Head title={props.title} />
      <Navbar/>
      {props.children}
    </Fragment>
);  
export default Layout;