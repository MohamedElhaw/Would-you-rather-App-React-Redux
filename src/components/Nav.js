import React from "react";
import { connect } from "react-redux";
import {VscAdd} from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { resetUser } from "../actions/user";
import { useNavigate } from "react-router-dom";


const Nav =props=>{
    //Define variables used in DOM
    const {username,userAvatar, dispatch}=props;

    //Define naviagate hook
    const navigate=useNavigate();

    /**
     * @description Function used to handle logout by reseting the user at store and naviagate the user to the loggin page again
     * @param {*} e Event cause by login click action and used to prevent reload page resources
     */
    const handleLogOut=e=>{
        e.preventDefault();
        dispatch(resetUser());
        navigate("/login") //to have login pathname at URL
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand ms-4">
                <img src="/images/Logo1.png" alt="user avatar" width="30" height="30" className="d-inline-block align-text-top"/>
                    <span className="Nav-app-name">Would you rather?</span>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item ms-3">
                        <NavLink className="nav-link" to="/add"><VscAdd/><span className="ms-2">New poll</span></NavLink>
                    </li>
                    <li className="nav-item ms-3 me-5">
                        <NavLink className="nav-link" to="/Leaderboard">Leaderboard</NavLink>
                    </li>
                    <li className="nav-item mt-2 me-5">
                        <div>
                            <span className="nav-username mx-3">Hello, {username}</span>
                            <img src={userAvatar} width="24" height="24" alt="user avatar" className="rounded-circle"/>
                        </div>
                    </li>
                    <li className="nav-item ms-3">
                        <button className="btn btn-outline-warning btn-sm mt-1 me-3"onClick={e=>handleLogOut(e)}>Log out</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({userId, users})=>{
    const username=users[userId].name
    const userAvatar= users[userId].avatarURL
    return {
        username,
        userAvatar
    }
})(Nav)