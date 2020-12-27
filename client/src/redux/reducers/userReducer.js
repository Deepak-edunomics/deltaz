const initialState = {
    user: {},
    isAuthenticated: false,
    loader: false,
    data: [],
    addDataFlag: false,
    updateDataFlag: false,
    deleteDataFlag: false
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loader: false,
            }
        case "GET_DATA":
            return {
                ...state,
                data: action.payload,
                loader: false
            }
        case "ADD_DATA":
            return {
                ...state,
                data: [action.payload, ...state.data],
                loader: false
            }
        case "UPDATE_DATA":
            return {
                ...state,
                data: state.data.map(data => data._id === action.payload._id ? action.payload : data),
                loader: false
            }
        case "DELETE_DATA":
            return {
                ...state,
                data: state.data.filter(obj => {
                    return obj._id !== action.payload._id
                }),
                loader: false
            }
        case "ADD_DATA_FLAG": {
            return {
                ...state,
                addUserFlag: action.payload,
                loader: false
            }
        }
        case "UPDATE_DATA_FLAG": {
            return {
                ...state,
                updateDataFlag: action.payload,
                loader: false
            }
        }
        case "DELETE_DATA_FLAG": {
            return {
                ...state,
                deleteDataFlag: action.payload,
                loader: false
            }
        }
        case "DELETE_USER": {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false,
                loader: false
            }
        }
        default:
            return state
    }
}

export default userReducer