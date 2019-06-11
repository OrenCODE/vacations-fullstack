import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import {authObject, errObject, History, strObject} from "../../interface/types";

interface IRegisterState {
    firstName: string
    lastName: string
    email: string
    password: string
    password2: string
    errors: errObject
}

interface IRegisterProps extends RouteComponentProps {
    registerUser: (newUser: strObject, history: History) => void,
    auth: authObject
    history: History
    errors: errObject
}

class Register extends Component<IRegisterProps, IRegisterState> {
    state: IRegisterState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        errors: {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            password2: null
        }
    };

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IRegisterProps>, nextContext: any): void {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit = (event: any) => {
        event.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history)
    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value} as IRegisterState)
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Vacation Master account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg", {
                                               'is-invalid': errors.firstName
                                           })}
                                           placeholder="First Name"
                                           name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.onChange}/>
                                    {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.lastName
                                        })}
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChange}/>
                                    {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}/>
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}/>
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.password2
                                        })}
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}/>
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register as any));