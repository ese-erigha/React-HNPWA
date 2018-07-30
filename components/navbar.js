import {Fragment} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import '../static/style.scss';



const Navbar = (props)=>{

    const feedTypes = ["new","best","top","job"];
    const links = feedTypes.map((type,index)=>{

        let buttonClassNames = classNames({
            'btn' : true,
            'btn-link' : true,
            'active' : props.currentFeed == type,
        });

        let linkText = type.charAt(0).toUpperCase() + type.slice(1);

        return (

            <Fragment key={index}>
                <a href={`/feeds/${type}`} className={buttonClassNames}>{ linkText }</a>
            </Fragment>
        );

    });

    return (
        <div className="navbar-fixed">
            <nav className="nav-center" role="navigation">
                <div className="nav-wrapper">
                    <div className="nav-wrapper-image">
                        <a href="/" className="brand-logo">
                            <img className="logo" alt="logo" src="/static/img/android-chrome-512x512.png"/>
                        </a>
                    </div>
                    <div className="nav-wrapper-links">
                        { links}
                    </div>
                    
                </div>
            </nav>
        </div>
    );

};

Navbar.propTypes = {
    currentFeed: PropTypes.string
};

const mapStateToProps = state => {
  return { 
      currentFeed: state.feedState.currentFeed
  };
};

export default connect(mapStateToProps)(Navbar);