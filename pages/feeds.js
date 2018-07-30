import React,{Component,Fragment} from 'react';
import Head from 'next/head';
import {connect} from 'react-redux';
import {withRouter} from 'next/router';
import * as feedActions from '../redux/actions/feed.actions';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';
import notificationService from '../shared/services/notification.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import swal from 'sweetalert2';
import FeedItem from '../components/feed-item';


class Feeds extends Component {

    constructor(props){
        super(props);

        this.destroy$ = new Subject();
    }

    componentDidMount(){
        let params = {type: this.props.router.query.type,pageNumber: 1};
        this.props.fetchFeeds(params); //used for server side rendering i.e when browser is refreshed or url is typed in browser
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

        const feedList = this.props.feeds.map((feed,index)=>{

            return <FeedItem key={index} feed={feed}/>
        });

        return (
            <Fragment>
                <Head>
                    <title>Feeds PWA</title>
                </Head>
                <Layout>
                    {this.props.loading && <Spinner/>}
                    { !this.props.loading && <Pagination/> }
                    <div className="container">
                        { !this.props.loading && feedList}
                    </div>
                </Layout>
            </Fragment>  
        );
    }

    componentWillUnmount(){

        this.destroy$.next(true);
        
        this.destroy$.unsubscribe();
    }
};

Feeds.propTypes = {
    loading: PropTypes.bool,
    currentFeed: PropTypes.string,
    feeds: PropTypes.array,
};

const mapStateToProps = state => {
    console.log(state.feedState.feeds);
    return { 
      loading: state.feedState.loading,
      currentFeed: state.feedState.currentFeed,
      feeds: state.feedState.feeds,
      
    };
};

const mapDispatchToProps = dispatch => {
  return {
        fetchFeeds: (payload) => dispatch(feedActions.loadFeedsAction(payload)),
  };
};

//export default withRedux(initializeStore,mapStateToProps,mapDispatchToProps)(Feeds);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Feeds));
