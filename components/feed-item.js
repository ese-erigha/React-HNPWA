import React,{Component,Fragment} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';

const FeedItem = (props)=>{

    return (

        <article className="article">

            {props.feed.url &&
                <div className="title">
                    <a href={props.feed.url} target="_blank" rel="noopener" className="main-link hand"> { props.feed.title }</a>
                </div>
            }

            {props.feed.url &&
                <div className="metadata">
                    { props.feed.time && <span>{moment(new Date(props.feed.time)).fromNow() }</span>}
                    {props.feed.by && <span> by
                            <Link as={`/user/${props.feed.by}`} href={`/user?id=${props.feed.by}`}>
                                <a className="metadata-user hand">  { props.feed.by }</a>
                            </Link>
                        </span>
                    }
                    {
                        props.feed.score && <span> |   <span className="metadata-points"> {props.feed.score} points</span></span> 
                    }
                    { props.feed.kids && <span> | </span>}
                    {
                        props.feed.kids &&  
                        <Link as={`/feed/${props.feed.id}`} href={`/feed?id=${props.feed.id}`}>
                            <a className="metadata-comments hand"> 
                                {props.feed.kids.length || 0 } comments
                            </a>
                        </Link>
                    }
                </div>
            }
        </article> 
    );

};

FeedItem.propTypes = {
    feed: PropTypes.object
};
export default FeedItem;
