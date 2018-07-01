import {Fragment} from 'react';
import Link from 'next/link';
import moment from 'moment';

const Comment = (props) => {

    return (
      <Fragment>
        <div className="row">
            <div className="col m12 l12 s12">
                <div className="comment">
                    <div className="tile">
                        <div className="tile-icon">
                            <i className="icon icon-more-horiz"></i>
                        </div>
                        <div className="tile-content">
                            <p className="tile-title text-gray">
                                <Link as={`/user/${props.comment.by}`} href={`/user?id=${props.comment.by}`}>
                                    <a> 
                                        { props.comment.by } 
                                    </a>
                                </Link>
                                <span> -  { moment(props.comment.time).format("M/DD/YY, h:mm a")}  </span>
                            </p>
                            <div className="tile-subtitle"  dangerouslySetInnerHTML={{__html: props.comment.text}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`

        .comment { 
            position: relative; 
            padding-left: 2em;
            padding-right: 2em;
            border-top: 1px solid lightgrey;
        }
        
        .tile {
            padding: 1em 0 2em;
            padding-bottom: 0px;
            padding-top: 0px;
        }
        
        .comment a{
            color: #5755d9!important;
        }
        
        .tile-subtitle{
            text-align: justify;
        }
        
        .tile-subtitle a{
            color: #5755d9!important;
            
        }
        
        `}</style>
      </Fragment>
    );
};
export default Comment;