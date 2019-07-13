import React from 'react'
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest}: any) => (
    <Route {...rest}
           render={props =>
               auth.isAuthenticated === true ? (
                   <Component {...props} />
               ) : (
                   <Redirect to="/login"/>
               )
           }
    />
);

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
