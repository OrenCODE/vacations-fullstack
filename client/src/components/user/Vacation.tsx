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

    isFollowing: string[]
    onFollow: (id: string) => void
    onUnFollow: (id: string) => void
}

class Vacation extends Component <IVacationProps> {

    render() {
        const {...vacation} = this.props;
        return (
                <div className="col-md-4">
                    <div className="single-destinations">
                        <div className="thumb">
                            <img src={vacation.photoURL} alt={''}/>
                        </div>
                        <div className="lead">
                            <h5>{vacation.description}</h5>
                            <p>
                                {vacation.destination}
                            </p>
                            <ul className="package-list">
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Duration</span>
                                    <span>06 days and 7 nights</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Start Date</span>
                                    <span>{formatDate(vacation.startDate)}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>End Date</span>
                                    <span>{formatDate(vacation.endDate)}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Following</span>
                                    <span>{vacation.numOfFollowers}</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center">
                                    <span>Price per person</span>
                                    <a href="/" className="price-btn">{vacation.price}</a>
                                </li>
                            </ul>
                            {!this.props.isFollowing ?
                                <button onClick={() => this.props.onFollow(vacation._id)}>Follow</button> :
                                <button onClick={() => this.props.onUnFollow(vacation._id)}>UnFollow</button>

                            }
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
