import React,{useState} from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {setUser} from "../actions/user";
import Loading from "./Loading";
import { handleGetQuestions } from"../actions/questions";

const Login=props=> {
    //Define state, it's set function and passing the initial values
    const [state,setState]=useState({userId:'',userAvatar:'/images/unknown.png'})
    
    //Define naviagte and location hooks to access URL and naviate in case of pathname contains "/login" path 
    const navigate=useNavigate();
    const location=useLocation();

    //Define variables used in DOM
    const {userId,userAvatar}=state;
    const {loading, dispatch}=props

    /**
     * @description Change selected user image at login form
     * @param {*} e event that contains the username value
     */
    const changeFormImage=e=>{
        const userId=e.target.value;
        const {users}=props;
        const userAvatar= userId? users[userId].avatarURL:'/images/unknown.png'
        setState({userId,userAvatar})
    }
    
    /**
     * @description Get an array of useres
     * @param {*} users object contain all users data from _Data
     * @returns an array contains users data
     */
    const getUsersArray=users=>{
        return Object.values(users)
    }

    /**
     * @description handle submit event of login form (i.e login) and load questions
     * @param {*} e event cause by login click action and used to prevent reload page resources
     */
    const handleSubmit=(e)=>{
        e.preventDefault();
        const {userId}=state;
        dispatch(setUser(userId));
        dispatch(handleGetQuestions());
        const {pathname}=location;
        pathname==="/login"&&navigate("/") //add it to naviagte to home and remove login component in case the user type /login in the url
    }
    
    return(
        loading?<Loading/>:
        <div className="login-container">
            <h4 className="center m-2">Login</h4>
            <div className="center">
                <img src="/images/Logo1.png" alt="user avatar" width="50" height="50" className="d-inline-block my-3 mx-auto"/>
                <h3 className="orange-text">Would you rather?</h3>
            </div>
            <img src={userAvatar} alt="user avatar" className="user-image"/>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="login-select" className="user-select-label" >Please select the user</label>
                    <select id="login-select" value={userId} className="form-select" aria-label="Default select example"
                    onChange={(e)=>changeFormImage(e)}>
                        <option defaultValue=""></option>
                        {getUsersArray(props.users).map(user=><option key={user.id} value={user.id}> {user.name}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-warning full-width" disabled={userId===''}>Login</button>
            </form>
        </div>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({users, loading})=>({users, loading}))(Login)