import {Fragment} from 'react';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';

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
                                    <a className="user"> 
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
      </Fragment>
    );
};

Comment.propTypes = {
   comment: PropTypes.object
};

export default Comment;