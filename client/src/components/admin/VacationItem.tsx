import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteVacation} from '../../actions/adminActions';
import {formatDate} from "../../utils/formatDate";

import EditModal from '../../components/layout/EditModal';
import {vacationObject} from "../../interface/types";

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
    onVacationEdited: (id: string, editedVacationData: vacationObject) => void
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
            <tr>
                <td>{vacation._id}</td>
                <td>{vacation.description}</td>
                <td>{vacation.destination}</td>
                <td>{vacation.price}</td>
                <td>{vacation.numOfFollowers}</td>
                <td>{formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}</td>
                <td>
                    <button className="edit-btn" onClick={() => this.onEdit(vacation)}/>
                    <button className="delete-btn" onClick={() => this.onDelete(vacation._id)}/>
                </td>
                <EditModal modalStatus={showEdit}
                           closeModal={this.closeEditModal}
                           preEditFields={preEditFields}
                           onVacationEdited={onVacationEdited}
                />
            </tr>
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
