import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
    LOGOUT 
} from "./auth.actionType";

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        
        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS: // Cả hai đều cập nhật user data
            return { 
                ...state, 
                user: action.payload, 
                loading: false, 
                error: null 
            }
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                jwt: action.payload,
                loading: false,
                error: null
            }
        
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_PROFILE_FAILURE:
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        
        case LOGOUT:
            return {
                ...initialState
            }
        
        default:
            return state;
    }
}