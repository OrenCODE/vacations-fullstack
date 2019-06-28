import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteVacation} from '../../actions/AdminActions';
import {formatDate} from "../../utils/formatDate";

import EditModal from '../../components/layout/EditModal';

interface IVacationItemState {
    preEditFields: IVacationItemProps[]
    showEdit: boolean
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
    onVacationEdited: (id: string, editedVacationData: any) => void
}

class VacationItem extends Component <IVacationItemProps, IVacationItemState> {

    state: IVacationItemState = {
        preEditFields: [],
        showEdit: false
    };

    render() {
        const {showEdit, preEditFields} = this.state;
        const {...vacation} = this.props;
        const {onVacationEdited} = this.props;

        return (
            <div className="col-md-4">
                <div className="single-destinations">
                    <div className="thumb">
                        <img src={vacation.photoURL} alt={''}/>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => this.onDelete(vacation._id)}>Del</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.onEdit(vacation)}>Edit</button>
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
                    </div>
                </div>
                <EditModal modalStatus={showEdit}
                           closeModal={this.closeEditModal}
                           preEditFields={preEditFields}
                           onVacationEdited={onVacationEdited}
                />
            </div>
        );
    }

    onDelete = (id: string) => {
        this.props.deleteVacation(id);
        this.props.onVacationDeleted(id)
    };

    onEdit = (vacationObject: IVacationItemProps) => {
        this.setState({
            preEditFields: [vacationObject]
        });
        this.showEditModal()

    };

    showEditModal = () => {
        this.setState({showEdit: true})
    };

    closeEditModal = () => {
        this.setState({showEdit: false})
    };
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteVacation})(VacationItem);
