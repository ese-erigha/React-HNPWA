import React,{Component,Fragment} from 'react';
import {withRouter} from 'next/router';
import {connect} from 'react-redux';
import moment from 'moment';
import * as userActions from '../redux/actions/user.actions';
import PropTypes from 'prop-types';


class Person extends Component{

    componentDidMount(){
        let params = {id: this.props.router.query.id};
        //console.log("server side navigation in feed list component")
        this.props.fetchUser(params); //used for server side rendering i.e when browser is refreshed or url is typed in browser
    }


    render(){

        return (

            <Fragment>
            {
                this.props.user && !this.props.loading &&
                <div className="user">
                    <h2> { this.props.user.id }</h2>
                    <ul>
                        {this.props.user.created && <li>Joined -  { moment(this.props.user.created * 1000).format("M/DD/YY, h:mm a")}</li> }
                        {this.props.user.karma && <li>Karma <span className="badge" data-badge={this.props.user.karma || 0}></span></li> }
                    </ul>

                </div> 
            }
            <style jsx>{`
    
            .user {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #f8f9fa;
                min-height: 5em;
                padding: 3em;
            }
            
            `}</style>
            </Fragment>
        );

        
    }


};

Person.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object
};


const mapStateToProps = state => {
    
    return { 
        user: state.userState.user,
        loading: state.userState.loading
    };
  };
  
  
  const mapDispatchToProps = dispatch => {
    return {
          fetchUser: (payload) => dispatch(userActions.loadUserAction(payload)),
    };
  };
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Person));
