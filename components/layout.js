import {Fragment} from 'react';
import Navbar from './navbar';

const Layout = (props) => (
    <Fragment>
      <Navbar/>
      {props.children}
    </Fragment>
);  
export default Layout;