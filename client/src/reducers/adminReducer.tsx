const initialState = {
    vacation: null
};

export default function (state = initialState, action: { type: any, payload: any }) {
    switch (action.type) {
        default:
            return state;
    }
}
