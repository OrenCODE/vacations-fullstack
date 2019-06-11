import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";

interface IUserProps {
    auth: authObject,
    history: History
}

class User extends Component <IUserProps> {

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin')
        } else {
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