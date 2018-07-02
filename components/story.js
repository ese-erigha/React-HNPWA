import React,{Component,Fragment} from 'react';
import {withRouter} from 'next/router';
import {connect} from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as feedActions from '../redux/actions/feed.actions';
import Comment from './comment';


class Story extends Component{

    componentDidMount(){
        let params = {id: this.props.router.query.id};
        //console.log("server side navigation in feed list component")
        this.props.fetchStory(params); //used for server side rendering i.e when browser is refreshed or url is typed in browser
    }


    render(){

        const kids = (this.props.item.kids) ? this.props.item.kids : [];
        const commentsList = kids.map((kid,index)=>{
            return <Comment key={index} comment={kid}/>
        });

        return (

            <Fragment>
            {
                this.props.item.title && !this.props.loading && 
                <div className="item">
                    <div className="header card">
                        <h3> { this.props.item.title }</h3>
                        <p>
                            { this.props.item.score } points by
                            <Link as={`/user/${this.props.item.by}`} href={`/user?id=${this.props.item.by}`}>
                                <a>  { this.props.item.by }  </a>
                            </Link>
                            | { this.props.item.kids.length || 0 } comments
                        </p>
                    </div>
                    {
                        kids.length &&  
                      
                        <div className="comment-wrapper">
                            {commentsList}
                        </div>
                    }
                    
                </div>
            }
            <style jsx>{`
    
            .item {
                margin-top: -1em;
            }
            
            
            .item .header{
                padding: 5px 25px;
                position: sticky;
                top: 56px;
                z-index: 1234567;
            }
            
            .item .header h3{
                color: #50596c;
            }
            
            .item .card{
                width: 100%;
                margin: 0px 0px;
                box-shadow: none;
                background: #f8f9fa;
            }
            
            .item .card p a{
                color: #5755d9;
            }
            
            .comment-wrapper{
                margin-top: 5px;
            }
            
            
            @media only screen and (max-width: 892px) {
            
                .item .header h3{
                    font-size: 1.7rem;
                }
            
                .comment-wrapper{
                    margin-top: 15px;
                }
                
            }
            
            `}</style>
            </Fragment>
        );

        
    }


};

Story.propTypes = {
    item: PropTypes.object,
    loading: PropTypes.bool
};


const mapStateToProps = state => {
    
    return { 
        item: state.feedState.story,
        loading: state.feedState.loading
    };
  };
  
  
  const mapDispatchToProps = dispatch => {
    return {
          fetchStory: (payload) => dispatch(feedActions.loadItemAction(payload)),
    };
  };
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Story));
