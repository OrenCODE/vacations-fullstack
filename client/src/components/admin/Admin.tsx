import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, pageHistory} from "../../interface/types";

interface IAdmin {
    auth: authObject,
    history: pageHistory
}

class Admin extends Component <IAdmin> {

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.id === "5cec896f8c8a9d86fe287dc3") { //FIX HERE//
            this.props.history.push('/admin')
        } else {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div>
                Hello Admin
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Admin);