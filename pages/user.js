import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../redux/actions/user.actions';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import Person from '../components/person';
import notificationService from '../shared/services/notification.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import swal from 'sweetalert2';


class User extends Component {


    constructor(props){
        super(props);
        this.destroy$ = new Subject();
    }

    static  getInitialProps({store, isServer, pathname, query}) {

        // console.log("client side navigation in feeds component");
        store.dispatch(userActions.loadUserAction({id: query.id})); //used for client side navigation with Link function in next.js

        return {}; 
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

    render() {
        return (

            <Layout>
              {this.props.loading && <Spinner/>}
              <Person/>
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
    loading: PropTypes.bool
};

const mapStateToProps = state => {
 
  return { 
      loading: state.userState.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(User);
