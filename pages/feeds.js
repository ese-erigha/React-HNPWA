import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as feedActions from '../redux/actions/feed.actions';

import Layout from '../components/layout';
import FeedList from '../components/feed-list';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';


class Feeds extends Component {

    static  getInitialProps({store, isServer, pathname, query}) {

        // console.log("client side naigation in feeds component");
        store.dispatch(feedActions.loadFeedsAction({type: query.type,pageNumber:1})); //used for client side navigation with Link function in next.js

        return {}; 
    }

    render() {
        return (

            <Layout>
              <Pagination/>
              {this.props.loading && <Spinner/>}
              <FeedList/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Feeds);
