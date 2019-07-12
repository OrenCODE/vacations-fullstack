import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {createVacation} from "../../actions/AdminActions";
import {IAdminProps} from "./Admin";
import {errObject} from "../../interface/types";

export interface IModifyVacationState {
    description: string,
    destination: string,
    photoURL: string,
    startDate: Date,
    endDate: Date,
    price: number,
    errors: errObject
}

class AddVacation extends Component <IAdminProps, IModifyVacationState> {
    state: IModifyVacationState = {
        description: '',
        destination: '',
        photoURL: '',
        startDate: new Date(),
        endDate: new Date(),
        price: 20,
        errors: {}
    };


    componentDidMount(): void {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === true) {
            this.props.history.push('/addVacation');
        } else {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IAdminProps>, nextContext: any): void {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit = (event: any) => {
        event.preventDefault();

        const vacationData = {
            description: this.state.description,
            destination: this.state.destination,
            photoURL: this.state.photoURL,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
        };

        this.props.createVacation(vacationData, this.props.history)
    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value} as IModifyVacationState)
    };

    handleStartDateChange = (Date: Date) => {
        this.setState({startDate: Date})
    };

    handleEndDateChange = (Date: Date) => {
        this.setState({endDate: Date})
    };


    render() {
        const {errors} = this.state;
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/admin" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Create Vacation</h1>
                            <p className="lead text-center">Let's get some information about our next vacation</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg", {
                                               'is-invalid': errors.description
                                           })}
                                           placeholder="Description"
                                           name="description" required
                                           value={this.state.description}
                                           onChange={this.onChange}
                                    />
                                    {errors.description ? <div className="invalid-feedback">{errors.description}</div> :
                                        <small className="form-text text-muted">A description of the vacation</small>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg", {
                                               'is-invalid': errors.destination
                                           })}
                                           placeholder="Destination"
                                           name="destination"
                                           value={this.state.destination}
                                           onChange={this.onChange}
                                    />
                                    {errors.destination ? <div className="invalid-feedback">{errors.destination}</div> :
                                        <small className="form-text text-muted">On which country or a planet
                                        </small>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg", {
                                               'is-invalid': errors.photoURL
                                           })}
                                           placeholder="Photo"
                                           name="photoURL"
                                           value={this.state.photoURL}
                                           onChange={this.onChange}
                                    />
                                    {errors.photoURL ? <div className="invalid-feedback">{errors.destination}</div> :
                                        <small className="form-text text-muted">Feed me with url so I can bring an
                                            awesome
                                            photo from the internet
                                        </small>
                                    }
                                </div>
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control form-control-lg"
                                        selected={this.state.startDate}
                                        onChange={this.handleStartDateChange}/>
                                    <small className="form-text text-muted">This day
                                    </small>
                                </div>
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control form-control-lg"
                                        selected={this.state.endDate}
                                        onChange={this.handleEndDateChange}/>
                                    <small className="form-text text-muted">Till the last day</small>
                                </div>
                                <div className="form-group">
                                    <input type="number"
                                           className="form-control form-control-lg"
                                           placeholder="Price per person"
                                           name="price"
                                           value={this.state.price}
                                           onChange={this.onChange}
                                    />
                                    <small className="form-text text-muted">Lets make some G$
                                    </small>
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
    vacation: state.vacation,
    errors: state.errors
});

export default connect(mapStateToProps, {createVacation})(withRouter(AddVacation as any));
