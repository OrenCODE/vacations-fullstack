import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

interface ILanding {
    auth: Record<string, any>
    history: Record<any, any>
}

class Landing extends Component <ILanding>{

    componentDidMount(): void {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Vacation Master
                                </h1>
                                <p className="lead">Summer Vacation is Just Around the Corner</p>
                                <hr/>
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                            </div>
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

export default connect(mapStateToProps)(Landing);