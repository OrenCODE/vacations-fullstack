import React, {Component} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {IVacationItemProps} from "../admin/VacationItem";
import {IAddVacationState} from "../admin/AddVacation";

import {connect} from 'react-redux';
import {editVacation} from "../../actions/AdminActions";
import DatePicker from "react-datepicker";

interface IEditModalProps {
    modalStatus: boolean
    closeModal: () => void
    preEditFields: IVacationItemProps[]
    editVacation: (id: string, editedVacationData: any) => void
    onVacationEdited: (id: string, editedVacationData: Record<any, any>) => void
}

class EditVacationModal extends Component <IEditModalProps, IAddVacationState> {
    state: IAddVacationState = {
        description: '',
        destination: '',
        photoURL: '',
        startDate: new Date(),
        endDate: new Date(),
        price: 20,
        errors: {}
    };

    onSubmit = (event: any) => {
        event.preventDefault();
        const {preEditFields, editVacation, onVacationEdited} = this.props;

        const id = preEditFields[0]._id;

        const editedVacationData = {
            description: this.state.description,
            destination: this.state.destination,
            photoURL: this.state.photoURL,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
        };

        editVacation(id, editedVacationData);
        onVacationEdited(id, editedVacationData)

    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value} as IAddVacationState)
    };

    handleStartDateChange = (Date: Date) => {
        this.setState({startDate: Date})
    };

    handleEndDateChange = (Date: Date) => {
        this.setState({endDate: Date})
    };

    render() {
        const {modalStatus, closeModal, preEditFields} = this.props;
        return (
            <Modal show={modalStatus} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vacation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        {preEditFields.map((vacationField) => (
                            <div key={vacationField._id}>
                                <div className="form-group">
                                    <div>
                                        <small className="form-text text-muted">Description</small>
                                        <input
                                            className="form-control form-control-sm"
                                            name={"description"}
                                            type={"text"}
                                            placeholder={vacationField.description}
                                            value={this.state.description}
                                            onChange={this.onChange}/>
                                    </div>
                                    <div>
                                        <small className="form-text text-muted">Destination</small>
                                        <input
                                            className="form-control form-control-sm"
                                            name={"destination"}
                                            type={"text"}
                                            placeholder={vacationField.destination}
                                            value={this.state.destination}
                                            onChange={this.onChange}/>
                                    </div>
                                    <div>
                                        <small className="form-text text-muted">Photo URL</small>
                                        <input
                                            className="form-control form-control-sm"
                                            name={"photoURL"}
                                            type={"text"}
                                            placeholder={vacationField.photoURL}
                                            value={this.state.photoURL}
                                            onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <small className="form-text text-muted">Start Date</small>
                                    <DatePicker
                                        className="form-control form-control-sm"
                                        selected={this.state.startDate}
                                        onChange={this.handleStartDateChange}/>
                                    <small className="form-text text-muted">End Date</small>
                                    <DatePicker
                                        className="form-control form-control-sm"
                                        selected={this.state.endDate}
                                        onChange={this.handleEndDateChange}/>
                                </div>
                                <div className="form-group">
                                    <small className="form-text text-muted">Price
                                    </small>
                                    <input type="number"
                                           className="form-control form-control-sm"
                                           placeholder="Price per person"
                                           name="price"
                                           value={this.state.price}
                                           onChange={this.onChange}/>
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={"submit"} variant="primary" onClick={closeModal}>
                            Edit Vacation and save changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.erorrs
});

export default connect(mapStateToProps, {editVacation})(EditVacationModal)
