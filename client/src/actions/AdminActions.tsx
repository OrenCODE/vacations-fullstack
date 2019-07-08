import axios from 'axios';

import {GET_ERRORS} from "./types";
import {vacationObject, History} from "../interface/types";

// Add new Vacation
export const createVacation = (vacationData: vacationObject, history: History) => (dispatch: any) => {
    axios
        .post('/api/vacations/', vacationData)
        .then(res => history.push('/admin'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete a vacation
export const deleteVacation = (id: string) => (dispatch: any) => {
    axios
        .delete(`/api/vacations/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data)
        );
};

// Edit vacation
export const editVacation = (id: string, editedVacationData: vacationObject) => (dispatch: any) => {
    // console.log(editedVacationData);
    axios.put(`/api/vacations/update/${id}`, editedVacationData)
        .then(res => console.log(res.data))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};
