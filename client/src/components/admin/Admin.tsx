import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";

interface IAdminProps {
    auth: authObject,
    history: History
}

class Admin extends Component <IAdminProps> {

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
                Hello Admin
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Admin);