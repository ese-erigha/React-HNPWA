import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../redux/actions/user.actions';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import Person from '../components/person';


class User extends Component {

    static  getInitialProps({store, isServer, pathname, query}) {

        // console.log("client side navigation in feeds component");
        store.dispatch(userActions.loadUserAction({id: query.id})); //used for client side navigation with Link function in next.js

        return {}; 
    }

    render() {
        return (

            <Layout>
              {this.props.loading && <Spinner/>}
              <Person/>
            </Layout>  
        );
    }
};

User.propTypes = {
    loading: PropTypes.bool
};

const mapStateToProps = state => {
 
  return { 
      loading: state.userState.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(User);
