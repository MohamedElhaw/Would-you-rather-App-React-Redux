import React from "react";
import { connect } from "react-redux";


const LeaderScore =props=>{
    //Define variables used in DOM
    const {userId,user}=props
    const you =userId===user.id? "(You)":null //Add You beside the name of the logged user
    const noAnsweres=Object.keys(user.answers).length
    const noQuestions=user.questions.length
    const score=noAnsweres+noQuestions
    return(
        <tr>
            <td>
                <img src={user.avatarURL} className="img-fluid-edit rounded-circle img-resize" alt="user avatar"/> 
                {user.name}
                <span className="orange-text fw-bold"> {you}</span>
            </td>
            <td className="leaderboard-center">{noQuestions}</td>
            <td className="leaderboard-center">{noAnsweres}</td>
            <td className="leaderboard-center fw-bold">{score}</td>
        </tr>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({userId},{user})=>({userId,user}))(LeaderScore)