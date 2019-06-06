import React, {Component} from 'react';

export interface ILoginState {
    email: string
    password: string
    errors: {}
}

class Login extends Component <ILoginState> {

    state = {
        email: '',
        password: '',
        errors: {}
    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value})
    };

    onSubmit = (event: any) => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password

        };
        console.log(user)
    };

    render() {
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
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}/>
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

export default Login;