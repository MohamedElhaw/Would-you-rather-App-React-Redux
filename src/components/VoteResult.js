import React from "react";
import { connect } from "react-redux";

const VoteResult=props=>{
    //Define variables used in DOM
    const {userId,question}=props;
    const option1Text=question["optionOne"].text
    const option2Text=question["optionTwo"].text
    const selectedOption=question["optionOne"].votes.includes(userId)? "option1":"option2"
    //Mark the selection
    const markSelection=<p className="badge rounded-pill bg-info my-1">Voted</p>

    //calculate the voting results
    const option1Votes=question["optionOne"].votes.length
    const option2Votes=question["optionTwo"].votes.length
    const totalVotes=option1Votes+option2Votes
    const option1Per=Math.round((option1Votes/totalVotes)*100)
    const option2Per=Math.round((option2Votes/totalVotes)*100)

    return(
        <div className="mx-3">
            <p className="vote-header">Vote result</p>
            <div className="vote-result">
                <div className="mx-3">
                    <div className="option-container">
                        <p className="option-text">{option1Text}</p> 
                        {selectedOption==="option1"&&markSelection}
                    </div>
                    <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" 
                        style={{width: `${option1Per}%`}} aria-valuenow={option1Per} aria-valuemin="0" aria-valuemax="100">{option1Per}%</div>
                    </div>
                    <p className="mx-auto">{option1Votes} out of {totalVotes}</p>
                </div>
                <div className="mx-3">
                    <div className="option-container">
                    <p className="option-text">{option2Text}</p>
                    {selectedOption==="option2"&&markSelection}
                    </div >
                    <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" 
                        style={{width: `${option2Per}%`}} aria-valuenow={option2Per} aria-valuemin="0" aria-valuemax="100">{option2Per}%</div>
                    </div>
                    <p>{option2Votes} out of {totalVotes}</p>
                </div>
            </div>
        </div>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({userId},{question})=>({userId,question}))(VoteResult)