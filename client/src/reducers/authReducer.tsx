const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action: { type: any; }) {
    switch (action.type) {
        default:
            return state;
    }

}