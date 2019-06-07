import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";

interface INavbar {
    auth: Record<string, any>
    logoutUser: () => void
}

class Navbar extends Component <INavbar> {

    onLogoutClick = (event: any) => {
        event.preventDefault();
        this.props.logoutUser()
    };

    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/"
                       onClick={this.onLogoutClick}
                       className="nav-link">Logout</a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Vacations Master</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about"> About
                                </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
