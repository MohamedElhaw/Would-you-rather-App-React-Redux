import React from "react";
import { connect } from "react-redux";
import VoteResult from "./VoteResult";
import PollVote from "./PollVote";

const EditPoll=props=>{
    //Define variables used in DOM
    const {option1, option2 ,name ,avatarURL, voted, question}=props
    

    return (
        // !question? used to handle wrong URL if the user typed it.
        !question? <h5 className="orange-text center m-3">Sorry, this poll doesn't exist</h5>:
        <div className="card my-3 mx-auto" style={{maxWidth: "540px"}}>
            <div className="user-info">
                <img src={avatarURL} alt="user avatar" width={"20%"} className="img-fluid mx-auto rounded-circle img-resize"/>
                <p>{name}</p>
            </div>
            {!voted?<PollVote option1={option1} option2={option2} questionId={question.id}/>
            :<VoteResult question={question}/>}
        </div>
        
    );
}
/**
 * @description Function is used to map the state from the store to the function props
 * @param {userId} param0 is userId at store
 * @param {users} param0 is users object at store
 * @param {questions} param0 is questions object at store
 * @returns the poll option One and Two, username, avatarURL, question is voted by user or not
 */
const mapStateToProp=({userId, users, questions})=>{
    const id=window.location.pathname.slice(6,); //Get URL from
    const question=questions[id];
    let option1, option2 ,name ,avatarURL, voted

    if (question){
        option1=question["optionOne"].text
        option2=question["optionTwo"].text
        name=users[question.author].name
        avatarURL=users[question.author].avatarURL
        voted=question.id in users[userId].answers
    }
    
    return{
        option1, 
        option2,
        name,
        avatarURL,
        voted,
        question,
    }
}
//Connect the function component to the store map the state to its props 
export default connect (mapStateToProp)(EditPoll)