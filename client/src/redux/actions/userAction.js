import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


// const urlHelper = "http://localhost:5000/api/v1"

const urlHelper = "https://deltaz.herokuapp.com/api/v1"

export const userLoginHelper = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USER",
        payload: data
    }
}

const setLoader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}



export const userRegister = (userData,history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/register`,
                data: userData
            })
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded))
            history.push('/home')
        }
        catch (err) {
            dispatch({
                type: "SET_USER_REGISTER_ERRORS",
                payload: err.response.data
            })
            dispatch(setLoader(false))
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const userLogin = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/login`,
                data: userData
            })
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded))
            history.push('/home')
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in userLogin Action", err.message)
        }
    }
}

export const addData = (credential) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Post",
                url: `${urlHelper}/data`,
                data: credential
            })
            if (data.success) {
                dispatch({
                    type: "ADD_DATA",
                    payload: data.result
                })
                dispatch({
                    type: "ADD_DATA_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "ADD_DATA_FLAG",
                        payload: false
                    })
                },300)
            }
            else {
                alert("Error in add data")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in addUser Action", err.message)
        }
    }
}

export const getData = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Get",
                url: `${urlHelper}/data`,
            })
            if (data.success) {
                dispatch({
                    type: "GET_DATA",
                    payload: data.result
                })
            }
            else {
                alert("Error in getData")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in getData Action", err.message)
        }
    }
}

export const updateData = (credential, id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Put",
                url: `${urlHelper}/data/${id}`,
                data: credential
            })
            if (data.success) {
                dispatch({
                    type: "UPDATE_DATA",
                    payload: data.result
                })
                dispatch({
                    type: "UPDATE_DATA_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "UPDATE_DATA_FLAG",
                        payload: false
                    })
                }, 300)
            }
            else {
                alert("Error in update Added user")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in updateData Action", err.message)
        }
    }
}

export const deleteData = (id) => {
    return async (dispatch) => {
        try {
            console.log("id",id)
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "Delete",
                url: `${urlHelper}/data/${id}`
            })
            if (data.success) {
                dispatch({
                    type: "DELETE_DATA",
                    payload: data.result
                })
                dispatch({
                    type: "DELETE_DATA_FLAG",
                    payload: true
                })
                setTimeout(() => {
                    dispatch({
                        type: "DELETE_DATA_FLAG",
                        payload: false
                    })
                }, 300)
            }
            else {
                alert("Error in Delete user")
                dispatch(setLoader(false))
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in deleteData Action", err.message)
        }
    }
}


export const userLogout = (history) => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
        dispatch(setLoader(false))
        history.push('/')
    }
}