import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from "../../actions/authActions";
import {strObject, errObject, pageHistory, authObject} from "../../interface/types";

interface ILoginDetails {
    email: string
    password: string
    errors: errObject
}

interface ILoginState {
    loginUser: (userData: strObject) => void,
    auth: authObject
    history: pageHistory
    errors: errObject
}

class Login extends Component <ILoginState> {

    state: ILoginDetails = {
        email: '',
        password: '',
        errors: {
            email: null,
            password: null
        }
    };

    componentDidMount(): void {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps: Readonly<ILoginState>, nextContext: any): void {
        if (nextProps.auth.isAuthenticated) {

            if(this.state.email === 'orencodes@gmail.com'){ //FIX THIS WITH isADMIN ON DATABASE//
                this.props.history.push('/admin');
                return;
            }
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit = (event: any) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password

        };
        this.props.loginUser(userData)
    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const {errors} = this.state;
        return (

            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your Vacation Master account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
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

export default connect(mapStateToProps, {loginUser})(Login);