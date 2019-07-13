import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as _ from 'lodash';

import {authObject, History, strObject} from "../../interface/types";
import Vacation, {IVacationProps} from "./Vacation";
import Spinner from '../common/Spinner';

interface IUserState {
    vacations: IVacationProps[]
    userFollows: strObject[]
    isLoading: boolean
}

export interface IUserProps {
    auth: authObject,
    history: History
}

class User extends Component <IUserProps, IUserState> {
    interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            userFollows: [],
            isLoading: true
        }
    }

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin')
        } else {
            this.props.history.push('/dashboard');
            this.interval = setInterval(() => this.getUserDashboard(), 2000);
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.interval)
    }

    getUserDashboard(): any {
        axios.get('/api/vacations/')
            .then(res => {
                this.setState({
                    vacations: res.data,
                    isLoading: false
                })
            });

        const userId = this.props.auth.user.id;
        const bearerToken = localStorage.getItem('jwtToken');

        axios.get(`api/users/current/follow/${userId}`, {headers: {Authorization: bearerToken}})
            .then(res => {
                this.setState({
                    userFollows: res.data
                })
            })
            .catch(err => console.log(err.response.data))
    }

    onFollow = (vacationId: string) => {
        const bearerToken = localStorage.getItem('jwtToken');

        axios.put(`api/users/follow/${vacationId}`, {headers: {Authorization: bearerToken}})
            .then((res) => {
                this.setState({
                    userFollows: res.data
                });
                axios.get('/api/vacations/')
                    .then(res => this.setState({
                        vacations: res.data

                    }));
            })
            .catch(err => alert(err.response.data.alreadyfollowed))
    };

    onUnFollow = (vacationId: string) => {
        const bearerToken = localStorage.getItem('jwtToken');

        axios.delete(`api/users/follow/${vacationId}`, {headers: {Authorization: bearerToken}})
            .then((res) => {
                this.setState({
                    userFollows: res.data
                });
                axios.get('/api/vacations/')
                    .then(res => this.setState({
                        vacations: res.data
                    }));
            })
            .catch(err => console.log(err.response.data))
    };

    render() {
        const {auth} = this.props;
        const {vacations, userFollows, isLoading} = this.state;
        const follow = userFollows.map(follow => follow._id);
        const [vacationsFollowed, vacationsNotFollowed] = _.partition(vacations, (vacation) => follow.includes(vacation._id));

        if(isLoading) {
         return <Spinner/>
        }
        return (
            <div className="container user-dash">
                <p className="user-name-display">Welcome {auth.user.firstName} {auth.user.lastName}</p>
                <div className="row">
                    {vacationsFollowed.map(vacation =>
                        <Vacation key={vacation._id} {...vacation} onFollow={this.onFollow} onUnFollow={this.onUnFollow} isFollowing={follow}/>
                    )}
                    {vacationsNotFollowed.map(vacation =>
                        <Vacation key={vacation._id} {...vacation} onFollow={this.onFollow}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(User);
