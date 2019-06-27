import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {authObject, errObject, History} from "../../interface/types";
import VacationItem, {IVacationItemProps} from "./VacationItem";

interface IAdminState {
    vacations: IVacationItemProps[],
}

export interface IAdminProps {
    auth: authObject,
    history: History,
    createVacation: (vacationData: any, history: History) => void,
    errors: errObject
}

class Admin extends Component <IAdminProps, IAdminState> {

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: []
        }
    }

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin');
            const bearerToken = localStorage.getItem('jwtToken');
            axios.get('api/vacations', {headers: {Authorization: bearerToken}})
                .then(res => this.setState({
                    vacations: res.data
                }))
        } else {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const {vacations} = this.state;
        return (
            <div className="container">
                <h3 className="lead">Hello Admin</h3>
                <div className="row">
                    {vacations.map(vacation =>
                        <VacationItem key={vacation._id} {...vacation}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Admin);
