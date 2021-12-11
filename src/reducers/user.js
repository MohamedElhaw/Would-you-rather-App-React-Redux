import {SET_USER,RESET_USER} from "../actions/user";

//handle change the user state at different actions
export default function user (state='', action){
    switch (action.type){
        case SET_USER:
            return action.user
        case RESET_USER:
            return ''
        default:
            return state
    }
}