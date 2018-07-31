import React,{Component} from 'react';
import {withRouter} from 'next/router';
import {connect} from 'react-redux';
import * as userActions from '../redux/actions/user.actions';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import notificationService from '../shared/services/notification.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import swal from 'sweetalert2';
import moment from 'moment';


class User extends Component {


    constructor(props){
        super(props);
        this.destroy$ = new Subject();
    }

    componentWillMount(){

        notificationService.dispatchError$
                           .pipe(takeUntil(this.destroy$))
                            .subscribe((error)=>{
                                
                                swal({
                                  title: error.title,
                                  text: error.text,
                                  type: 'error',
                                  toast: false,
                                  allowOutsideClick: false,
                                  allowEscapeKey: false
                                });
                            });
    }

    componentDidMount(){
        let params = {id: this.props.router.query.id};
        this.props.fetchUser(params); 
    }

    render() {
        return (

            <Layout>
              {this.props.loading && <Spinner/>}
              {
                !this.props.loading && this.props.user &&
                <div className="user-page">
                    <h2> { this.props.user.id }</h2>
                    <ul>
                        {this.props.user.created && <li>Joined - <span className="value">{ moment(this.props.user.created * 1000).format("M/DD/YY, h:mm a")} </span></li> }
                        {this.props.user.karma && <li>Karma - <span className="value">{this.props.user.karma || 0}</span></li> }
                    </ul>

                </div> 
            }
            </Layout>  
        );
    }

    componentWillUnmount(){

        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }
};

User.propTypes = {
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(User));
