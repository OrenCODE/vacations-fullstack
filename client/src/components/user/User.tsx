import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authObject, History} from "../../interface/types";
import axios from 'axios';
import Vacation, {IVacationProps} from "./Vacation";

interface IUserState {
    vacations: IVacationProps[]
}

export interface IUserProps {
    auth: authObject,
    history: History
}

class User extends Component <IUserProps, IUserState> {

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: []
        }
    }

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/admin')
        } else {
            this.props.history.push('/dashboard');
            axios.get('/api/vacations')
                .then(res => this.setState({
                    vacations: res.data
                }))
        }
    }

    onFollow = (id: string) => {
        const bearerToken = localStorage.getItem('jwtToken');
        // console.log(id, bearerToken);

        axios.post(`api/followers/${id}`, {headers: {Authorization: bearerToken}})
            .then((res) => {
                axios.get('/api/vacations')
                    .then(res => this.setState({
                        vacations: res.data
                    }))
            })
            .catch(err => alert(err.response.data.alreadyfollowed))
    };

    render() {
        const {vacations} = this.state;
        return (
            <div className="container">
                <h3 className="lead">Hello {this.props.auth.user.firstName} {this.props.auth.user.lastName}</h3>
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