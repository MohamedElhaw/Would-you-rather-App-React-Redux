import React from "react";
import Login from "./Login";
import { connect} from "react-redux";
import { handleGetUsers } from "../actions/users";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import Undefined from "./Undefined";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import EditPoll from "./EditPoll";
import { useEffect} from "react";


const App =props=>{
  //Destruct the dispatch from the props
  const {dispatch}=props
  //Get Initial data from _Data
  useEffect(()=>{
    dispatch(handleGetUsers());
  },[dispatch])
  
  return (
    <BrowserRouter>
      {!props.userId? <Login/>:
      <React.Fragment>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add"  element={<NewPoll/>}/>
        <Route path="/Leaderboard" element={<Leaderboard/>}/>
        <Route path="/poll/:id" element={<EditPoll/>}/>
        <Route path="/:dynPath" element={<Undefined/>}/>
      </Routes>
      </React.Fragment>
      }
    </BrowserRouter>
  );
}
//Connect the function component to the store map the state to its props 
export default connect(({userId})=>({userId}))(App);
