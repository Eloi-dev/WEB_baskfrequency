const initialState = {
    all: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case "ADD_FUND": {
            const fund = action.payload;
            return {
                ...state,
                all: [...state.all, fund]
            };
        }
        case "REMOVE_FUND": {
            return state;
        }
        default:
            return state;
    }
}