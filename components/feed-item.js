import React,{Component,Fragment} from 'react';
import Link from 'next/link';
const FeedItem = (props)=>{

    return (

        <Fragment>
            <div className="row item">
                <div className="col s3 m3 l3 score">
                    <span> {props.feed.score}</span>
                </div>
                <div className="col s8 m8 l8 link">
                    {props.feed.url &&
                        <a href={props.feed.url} target="_blank" rel="noopener" className="main-link hand"> { props.feed.title }</a>
                    }

                    {!props.feed.url &&

                        <Link as={`/feed/${props.feed.id}`} href={`/feed?id=${props.feed.id}`}>
                            <a className="main-link hand"> { props.feed.title } </a>
                        </Link>
                    }
                    
                    <p className="sub-links">
                        by 
                        <Link as={`/user/${props.feed.by}`} href={`/user?id=${props.feed.by}`}>
                            <a>  { props.feed.by }</a>
                        </Link>
                        { props.feed.kids && <span> | </span>}
                                    
                        {
                            props.feed.kids &&  
                            <Link as={`/feed/${props.feed.id}`} href={`/feed?id=${props.feed.id}`}>
                                <a className="hand"> 
                                    comments <span className="badge"> {props.feed.kids.length || 0 }</span>
                                </a>
                            </Link>
                        }
                    </p>
                </div>
            </div>
            <style jsx>{`
            
            .item {
                min-height: 100px;
                border-bottom: lightgray 1px solid;
                margin-bottom: 0px;
            }
            
            .score {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3em;
                font-weight: 700;
                color: #5755d9;
            }
            
            .score span{
                margin-top: 50px;
            }
            
            .link {
                display: flex;
                align-items: center;
                justify-content: left;
                flex-direction: column;
                align-items: flex-start;
            }
            
            a{
                color: #5755d9;
                outline: none;
                text-decoration: none;
                font-size: 1.1em;
            }
            
            a:hover {
                color: #f60;
                transition: color 500ms ease;
            }
            
            .main-link {
                display: block;
                font-size: 1.6em;
                margin: 1em 0;
                color: #727e96;
            }
            
            
            .sub-links {
                font-size: 1rem;
                margin-top: -0.5em;
            }
            
            .sub-links a{
                font-size: 1.2rem;
            }
            
            .badge{
                font-weight: 300;
                font-size: 1rem;
                color: #fff;
                background-color: #5755d9;
                
            }
            
            .sub-links .badge{
                margin-top: -10px;
                margin-left: 5px;
                border-radius: 50px;
            }
            
            `}</style>
        </Fragment> 
    );

};
export default FeedItem;
