import {_getUsers} from "../data/_DATA"
import { toggleLoading } from "./loading";
//Declare action variables
export const LOAD_USERS="LOAD_USERS";
export const ADJUST_AVATAR="ADJUST_AVATAR";

//Action Creators
//---LOAD USER
const loadUsers=users=>{
    return{
        type:LOAD_USERS,
        users
    }
}
//---Adjust AVATAR
const adjustAvatar = users=>{
    return{
        type:ADJUST_AVATAR,
        users
    }
}

//Async Action to get the initial data of users and adjust avatar URL
export const handleGetUsers=()=>{
    return(dispatch)=>{
        dispatch(toggleLoading()) //toggle loading... [show loading]
        _getUsers()
        .then((users)=> {
            dispatch(loadUsers(users))
            dispatch(adjustAvatar(users))//change the avatarURL as saved in the project
            dispatch(toggleLoading()) //toggle loading... [hide loading]
        })
        .catch(e=> {
            console.warn('Error in handleGetUsers: ', e)
            dispatch(toggleLoading()) //toggle loading... [hide loading]
        })
    }
}

