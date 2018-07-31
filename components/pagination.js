import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as feedActions from '../redux/actions/feed.actions';
import PropTypes from 'prop-types';

class Pagination extends Component {

    constructor(props){
        super(props);
        this.fetchPage = this.fetchPage.bind(this);
    }

    fetchPage = (pageNumber,event) =>{
        event.preventDefault();
        this.props.fetchPage({type: this.props.currentFeed,pageNumber: pageNumber});
    };
    

    render(){

        let prevButtonClassNames = classNames({
            'waves-effect' : true,
            'waves-light' : true,
            'btn'   : true,
            'hand': true,
            'disabled' : (this.props.feed) ? this.props.feed.pageNumber === 1 : true,
        });
    
        let nextButtonClassNames = classNames({
            'waves-effect' : true,
            'waves-light' : true,
            'btn'   : true,
            'hand': true,
            'disabled' : (this.props.feed) ? this.props.feed.pageNumber === this.props.feed.totalPages : true,
        });

        return (

            <Fragment>
            {
                !this.props.loading && this.props.feed && Object.keys(this.props.feed).length &&
                <div className="pager">
                    <div>
                        <a onClick={this.fetchPage.bind(this,this.props.feed.pageNumber - 1)} className={prevButtonClassNames}>
                            <i className="material-icons left">arrow_back</i>Prev
                        </a>
                    </div>
                    <div>
                        <span className="pages"> {this.props.feed.pageNumber} / {this.props.feed.totalPages}</span>
                    </div>
                    <div>
                        <a onClick={this.fetchPage.bind(this,this.props.feed.pageNumber + 1)} className={nextButtonClassNames}>
                            <i className="material-icons right">arrow_forward</i>Next
                        </a>
                    </div> 
                </div>
            }
            </Fragment>
        );

    }
};

Pagination.propTypes = {
    loading: PropTypes.bool,
    currentFeed: PropTypes.string,
    feed: PropTypes.object
};


const mapStateToProps = state => {
    
    return {

        loading: state.feedState.loading,
        currentFeed: state.feedState.currentFeed,
        feed: state.feedState[state.feedState.currentFeed]
    };
};

const mapDispatchToProps = dispatch => {

    return {
          fetchPage: (payload) => dispatch(feedActions.loadFeedsAction(payload)),
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps)(Pagination);