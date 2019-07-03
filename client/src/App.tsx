import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from "./actions/authActions";
import {logoutUser} from "./actions/authActions";

import {Provider} from 'react-redux';
import store from './store'
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Admin from './components/admin/Admin';
import AddVacation from './components/admin/AddVacation'
import Reports from './components/admin/Reports';

import User from './components/user/User';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded: any = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser() as any);
        // Redirect to login
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path={"/"} component={Landing}/>
                        <div className={"container"}>
                            <Route exact path={"/register"} component={Register}/>
                            <Route exact path={"/login"} component={Login}/>
                            <Switch>
                                <PrivateRoute exact path="/admin" component={Admin}/>
                                <PrivateRoute exact path="/dashboard" component={User}/>
                                <PrivateRoute exact path="/addVacation" component={AddVacation}/>
                                <PrivateRoute exact path="/reports" component={Reports}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
