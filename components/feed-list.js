import React,{Component,Fragment} from 'react';
import {withRouter} from 'next/router';
import {connect} from 'react-redux';
import * as feedActions from '../redux/actions/feed.actions';
import FeedItem from './feed-item';
import PropTypes from 'prop-types';


class FeedList extends Component {

    componentDidMount(){
        let params = {type: this.props.router.query.type,pageNumber: 1};
        console.log("server side navigation in feed list component")
        this.props.fetchFeeds(params); //used for server side rendering i.e when browser is refreshed or url is typed in browser
    }

    render() {

        const feedList = this.props.feeds.map((feed,index)=>{

            return <FeedItem key={index} feed={feed}/>
        });
       
        return (
            <Fragment>
                { !this.props.loading && feedList.length && feedList}
            </Fragment>
             
        );
    }
};


FeedList.propType = {
    currentFeed: PropTypes.string,
    feeds: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = state => {
    
  return { 
      currentFeed: state.feedState.currentFeed,
      feeds: state.feedState.feeds,
      loading: state.feedState.loading
  };
};


const mapDispatchToProps = dispatch => {
  return {
        fetchFeeds: (payload) => dispatch(feedActions.loadFeedsAction(payload)),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FeedList));
