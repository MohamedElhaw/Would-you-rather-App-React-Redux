//Declare action variables
export const SET_USER="SET_USER";
export const RESET_USER="RESET_USER";

//Actions

/**
 * @description action of SET_USER type
 * @param {*} user user to be set as logged in
 * @returns object contains action type and user that logged in
 */
export function setUser (user){
    return{
        type:SET_USER,
        user
    }
}
/**
 * @description action of RESET_USER type (Reset logged user when logged out)
 * @returns object contains action type
 */
export function resetUser (){
    return{
        type:RESET_USER
    }
}