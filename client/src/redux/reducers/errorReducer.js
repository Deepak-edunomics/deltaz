const initialState = {
    userRegisterErrors: {},
    userLoginErrors: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_REGISTER_ERRORS":
            return {
                ...state,
                userRegisterErrors: action.payload
            }
        case "SET_USER_LOGIN_ERRORS":
            return {
                ...state,
                userLoginErrors: action.payload
            }
        default:
            return state;
    }
}


export default errorReducer