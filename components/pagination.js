import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as feedActions from '../redux/actions/feed.actions';

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
                !this.props.loading && Object.keys(this.props.feed).length &&
                <div className="pager">
                    <a onClick={this.fetchPage.bind(this,this.props.feed.pageNumber - 1)} className={prevButtonClassNames}>
                        <i className="material-icons left">arrow_back</i>Prev
                    </a>
                    <span className="pages"> {this.props.feed.pageNumber} OF {this.props.feed.totalPages}</span>
                    <a onClick={this.fetchPage.bind(this,this.props.feed.pageNumber + 1)} className={nextButtonClassNames}>
                        <i className="material-icons right">arrow_forward</i>Next
                    </a>
                </div>
            }
            <style jsx>{`

            .pager{
                position: sticky;
                top: 50px;
                padding-top: 10px;
                padding-bottom: 10px;
                box-shadow: none!important;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                background: #f8f9fa;
                min-height: 6em;
                border-radius: 10px;
            }
            
            .btn{
                border: .05rem solid #5755d9;
                border-radius: 5rem;
                color: #5755d9;
                background-color: #fff;
                box-shadow: none!important;
                font-size: 1rem;
            }

            .btn:hover{
                background-color: #fff; 
            }
            .btn[disabled], .btn:disabled, .btn.disabled {
                cursor: default;
                opacity: .5;
                pointer-events: none;
                background-color: #fff;
            }
            
            .btn.disabled{
                cursor: default;
                opacity: .5;
                pointer-events: none;
                background-color: #fff;
            }
            
            .pages{
                text-transform: uppercase;
                font-weight: 700;
                padding: 0 2em;
                color: #acb3c2;
            }
            
            @media only screen and (max-width: 892px) {
                
                .btn{
                    padding: 0px 12px!important;
                    font-size: 12px!important;
                }
            }
            
            `}</style>
            </Fragment>
        );

    }
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