const initialState = {
    all: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case "ADD": {
            return {
                ...state,
                all: [...state.all, action.payload]
            };
        }
        case "REMOVE": {
            return state;
        }
        default:
            return state;
    }
}