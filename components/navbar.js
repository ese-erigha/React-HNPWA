import {Fragment} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import classNames from 'classnames';


const Navbar = (props)=>{

    const feedTypes = ["new","best","top","job"];
    const links = feedTypes.map((type,index)=>{

        let buttonClassNames = classNames({
            'btn' : true,
            'btn-link' : true,
            'active' : props.currentFeed === type,
        });

        let linkText = type.charAt(0).toUpperCase() + type.slice(1);

        return (

            <Fragment key={index}>
                <li>
                    <Link as={`/feeds/${type}`} href={`/feeds?type=${type}`}>
                        <a className={buttonClassNames}>{ linkText }</a>
                    </Link>
                </li>
            </Fragment>
        );

    });

    return (
        <div className="navbar-fixed">
    <nav className="nav-center" role="navigation">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
            <img className="logo" alt="logo" src="/static/android-chrome-512x512.png"/>
        </a>
        <ul>
          { links}
        </ul>
      </div>
    </nav>
      <style jsx>{`
      nav{
        background-color: #fff!important;
        box-shadow: none!important;
    }
    nav.nav-center ul {
        text-align: center;
    }
    nav.nav-center ul li {
        display: inline;
        float: none;
    }
    nav.nav-center ul li a {
        display: inline-block;
        margin-top: 5px;
        line-height: 40px;
    }
    
    .btn-link{
        font-size: 1.2rem;
        color: #f60;
        text-transform: uppercase;
        background: transparent;
        border-color: transparent;
        box-shadow: none!important;
    }
    
    .btn-link:hover{
        background: transparent;
        border-color: transparent;
        color: #5755d9;
    }
    
    .btn-link.active{
        
        color: #5755d9;
        text-align: center;
        text-decoration: none;
    }
    
    .brand-logo{
        margin-top: 5px;
    }
    
    .brand-logo img{
        height: 52px;
        width: 52px;
    }

    @media only screen and (max-width: 892px) {
        
        .brand-logo{
    
            position: fixed;
            left: 30px!important;
        }
    
    
        .btn-link{
            font-size: 0.9rem!important;
        }
    
        .logo{
            height: 35px;
            width: 35px;
        }
    }
    
    @media only screen and (max-width: 360px) {
        
        .brand-logo img{
            height: 35px;
            width: 35px;
        }
    
        .logo{
            height: 35px;
            width: 35px;
        }
    }
    
     `}</style>
    </div>
    );

}; 

const mapStateToProps = state => {
  return { 
      currentFeed: state.feedState.currentFeed
  };
};

export default connect(mapStateToProps)(Navbar);