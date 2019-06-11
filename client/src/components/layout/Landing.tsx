import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";

interface ILandingProps {
    auth: authObject
    history: History
}

class Landing extends Component <ILandingProps> {

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.id === "5cec896f8c8a9d86fe287dc3") { //FIX HERE//
            this.props.history.push('/admin')
        } else {
            if (this.props.auth.isAuthenticated) {
                this.props.history.push('/dashboard')
            }
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Vacation Master
                                </h1>
                                <p className="lead">Summer Vacation is Just Around the Corner</p>
                                <hr/>
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(Landing);