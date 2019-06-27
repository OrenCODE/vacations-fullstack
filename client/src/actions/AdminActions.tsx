import axios from 'axios';

import {GET_ERRORS} from "./types";

// Add new Vacation
export const createVacation = (vacationData: any, history: any) => (dispatch: any) => {
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

export const deleteVacation = (id: any) => (dispatch: any) => {
    axios
        .delete(`/api/vacations/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data)
        );
};
