import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as feedActions from '../redux/actions/feed.actions';

import Layout from '../components/layout';
import Spinner from '../components/spinner';
import Story from '../components/story';


class Feed extends Component {

    static  getInitialProps({store, isServer, pathname, query}) {

        // console.log("client side navigation in feeds component");
        store.dispatch(feedActions.loadItemAction({id: query.id})); //used for client side navigation with Link function in next.js

        return {}; 
    }

    render() {
        return (

            <Layout>
              {this.props.loading && <Spinner/>}
              <Story/>
            </Layout>  
        );
    }
};

const mapStateToProps = state => {
 
  return { 
      loading: state.feedState.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Feed);
