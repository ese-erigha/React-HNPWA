import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as feedActions from '../redux/actions/feed.actions';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import FeedList from '../components/feed-list';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';
import notificationService from '../shared/services/notification.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import swal from 'sweetalert2';
import withRedux from "next-redux-wrapper";
import initializeStore from '../redux/index';


class Feeds extends Component {

    constructor(props){
        super(props);

        this.destroy$ = new Subject();
    }

    static async  getInitialProps({store, isServer, pathname,req, res, query}) {

        console.log("client side navigation in feeds component");
        store.dispatch(feedActions.loadFeedsAction({type: query.type,pageNumber:1})); //used for client side navigation with Link function in next.js
        return {}; 
    }

    componentWillMount(){

        notificationService.dispatchError$
                           .pipe(takeUntil(this.destroy$))
                            .subscribe((error)=>{
                                
                                swal({
                                  title: error.title,
                                  text: error.text,
                                  type: 'error',
                                  toast: false,
                                  allowOutsideClick: false,
                                  allowEscapeKey: false
                                });
                            });
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

    componentWillUnmount(){

        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }
};

Feeds.propTypes = {
    loading: PropTypes.bool
};

const mapStateToProps = state => {
   console.log(state.feedState.loading);
    return { 
      loading: state.feedState.loading
    };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

//export default withRedux(initializeStore,mapStateToProps,mapDispatchToProps)(Feeds);
export default connect(mapStateToProps,mapDispatchToProps)(Feeds);
