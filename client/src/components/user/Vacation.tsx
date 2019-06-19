import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatDate} from "../../utils/formatDate";

export interface IVacationProps {
    _id: string
    numOfFollowers: number
    description: string
    destination: string
    photoURL: string
    startDate: Date
    endDate: Date
    price: number
    onFollow: (id: string) => void
}

class Vacation extends Component <IVacationProps> {

    render() {
        const {_id, numOfFollowers, description, destination, photoURL, startDate, endDate, price, onFollow} = this.props;
        return (
                <div className="col-md-4">
                    <div className="single-destinations">
                        <div className="thumb">
                            <img src={photoURL} alt={''}/>
                        </div>
                        <div className="lead">
                            <h5>{description}</h5>
                            <p>
                                {destination}
                            </p>
                            <ul className="package-list">
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Duration</span>
                                    <span>06 days and 7 nights</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Start Date</span>
                                    <span>{formatDate(startDate)}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>End Date</span>
                                    <span>{formatDate(endDate)}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Following</span>
                                    <span>{numOfFollowers}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Price per person</span>
                                    <a href="/" className="price-btn">{price}</a>
                                </li>
                            </ul>
                            <button onClick={() => onFollow(_id)}>Follow</button>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Vacation);