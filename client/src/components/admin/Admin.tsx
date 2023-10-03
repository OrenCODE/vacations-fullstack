import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Table} from "react-bootstrap";

import {authObject, vacationObject, errObject, History} from "../../interface/types";
import VacationItem, {IVacationItemProps} from "./VacationItem";
import CountUp from 'react-countup';
import Spinner from "../common/Spinner";

interface IAdminState {
    vacations: IVacationItemProps[]
    numOfUsers: number
    isLoading: boolean
}

export interface IAdminProps {
    auth: authObject
    history: History
    createVacation: (vacationData: vacationObject, history: History) => void
    errors: errObject
}

class Admin extends Component <IAdminProps, IAdminState> {
    interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            numOfUsers: 0,
            isLoading: true
        }
    }

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin');
            this.interval = setInterval(() => this.getAdminDashboard(), 2000);
        } else {
            this.props.history.push('/dashboard')
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
        this.setState({
            isLoading: true
        })
    }

    getAdminDashboard(): any {
        const bearerToken = localStorage.getItem('jwtToken');
        axios.get('http://localhost:5000/api/vacations', {headers: {Authorization: bearerToken}})
            .then(res => this.setState({
                vacations: res.data,
                isLoading: false
            }));
        axios.get('http://localhost:5000/api/users/counter', {headers: {Authorization: bearerToken}})
            .then(res => this.setState({
                numOfUsers: res.data
            }))
    }

    onVacationDeleted = (id: string) => {
        const {vacations} = this.state;
        const vacationsAfterDelete = vacations.filter(vacation => vacation._id !== id);
        this.setState({
            vacations: vacationsAfterDelete
        })
    };

    onVacationEdited = (id: string, editedVacationData: vacationObject) => {
        console.log(id, editedVacationData);
        axios.get('http://localhost:5000/api/vacations')
            .then(res => this.setState({
                vacations: res.data
            }));
    };

    render() {
        const {vacations, numOfUsers, isLoading} = this.state;
        const numOfFollowers = vacations.map(vacation => vacation.numOfFollowers);

        if(isLoading) {
            return <Spinner/>
        }

        return (
            <div className="container admin-dash">
                <h3 className="user-name-display">Hello Admin</h3>
                <p className="lead-text-muted">Active Vacations List</p>
                <Table className="table-responsive lead" striped bordered hover>
                    <thead>
                    <tr>
                        <th>Vacation-ID</th>
                        <th>Description</th>
                        <th>Destination</th>
                        <th>Price</th>
                        <th>Followers</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vacations.map(vacation =>
                        <VacationItem key={vacation._id} {...vacation}
                                      onVacationDeleted={this.onVacationDeleted}
                                      onVacationEdited={this.onVacationEdited}
                        />
                    )}
                    </tbody>
                </Table>
                <div className="container-flex table-responsive">
                    <div className="box-1">
                        <div className="vacations-icon"/>
                        <h4 className="user-name-display-vac"><CountUp end={vacations.length} delay={3}/> Vacations</h4>
                    </div>
                    <div className="box-2">
                        <div className="followers-icon"/>
                        <h4 className="user-name-display-fol"><CountUp end={numOfFollowers.reduce((a, b) => a + b, 0)} delay={3}/> Follows</h4>
                    </div>
                    <div className="box-3">
                        <div className="users-icon"/>
                        <h4 className="user-name-display-use"><CountUp end={numOfUsers} delay={3}/> Users</h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Admin);
