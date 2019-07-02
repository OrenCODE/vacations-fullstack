import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";
import axios from 'axios';
import Vacation, {IVacationProps} from "./Vacation";
import * as _ from 'lodash';

interface IUserState {
    vacations: IVacationProps[]
    userFollows: Record<any, any>[]
}

export interface IUserProps {
    auth: authObject,
    history: History
}

class User extends Component <IUserProps, IUserState> {

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            userFollows: []
        }
    }

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin')
        } else {
            this.props.history.push('/dashboard');
            axios.get('/api/vacations/')
                .then(res => {
                    this.setState({
                        vacations: res.data
                    })
                });

            const userId = this.props.auth.user.id;
            const bearerToken = localStorage.getItem('jwtToken');

            axios.get(`api/users/current/follow/${userId}`, {headers: {Authorization: bearerToken}})
                .then((res) => this.setState({userFollows: res.data}))
                .catch(err => console.log(err.response.data))
        }
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

    render() {
        const {auth} = this.props;
        const {vacations, userFollows} = this.state;
        const follow = userFollows.map(follow => follow._id);
        const [vacationsFollowed, vacationsNotFollowed] = _.partition(vacations, (vacation) => follow.includes(vacation._id));

        return (
            <div className="container">
                <h3 className="lead">Hello {auth.user.firstName} {auth.user.lastName}</h3>
                <div className="row">
                    {vacationsFollowed.map(vacation =>
                        <Vacation key={vacation._id} {...vacation} onFollow={this.onFollow}/>
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
