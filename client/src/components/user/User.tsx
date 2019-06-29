import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";
import axios from 'axios';
import Vacation, {IVacationProps} from "./Vacation";

interface IUserState {
    vacations: IVacationProps[]
    vacationsFollowed: Record<any, any>[]
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
            vacationsFollowed: []
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
                .then((res) => this.setState({vacationsFollowed: res.data}))
                .catch(err => console.log(err.response.data))
        }
    }

    onFollow = (vacationId: string) => {
        const bearerToken = localStorage.getItem('jwtToken');

        axios.put(`api/users/follow/${vacationId}`, {headers: {Authorization: bearerToken}})
            .then((res) => {
                this.setState({
                    vacationsFollowed: res.data
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
        const {vacations} = this.state;
        return (
            <div className="container">
                <h3 className="lead">Hello {auth.user.firstName} {auth.user.lastName}</h3>
                <div className="row">
                    {vacations.map(vacation =>
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
