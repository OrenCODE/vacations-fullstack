import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteVacation} from '../../actions/AdminActions';
import {formatDate} from "../../utils/formatDate";

interface IVacationItemState {
    editStatus: boolean
}

export interface IVacationItemProps {
    _id: string
    numOfFollowers: number
    description: string
    destination: string
    photoURL: string
    startDate: Date
    endDate: Date
    price: number

    deleteVacation: (id: string) => void
    onVacationDeleted: (id: string) => void
    editVacation: (id: string) => void
    onVacationEdited: (id: string) => void
}

class VacationItem extends Component <IVacationItemProps, IVacationItemState> {

    state: IVacationItemState = {
        editStatus: false
    };

    render() {
        const {editStatus} = this.state;
        const {_id, numOfFollowers, description, destination, photoURL, startDate, endDate, price} = this.props;
        return (
            <div className="col-md-4">
                <div className="single-destinations">
                    <div className="thumb">
                        <img src={photoURL} alt={''}/>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => this.onDelete(_id)}>Del</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.onEdit(_id)}>Edit</button>
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
                    </div>
                </div>
            </div>
        );
    }

    onDelete = (id: string) => {
        this.props.deleteVacation(id);
        this.props.onVacationDeleted(id)
    };

    onEdit = (id: string) => {
        this.setState({editStatus: true})
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteVacation})(VacationItem);
