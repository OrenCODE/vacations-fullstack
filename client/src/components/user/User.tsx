import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, pageHistory} from "../../interface/types";

interface IUser {
    auth: authObject,
    history: pageHistory
}

class User extends Component <IUser> {

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div>
                Hello User
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(User);