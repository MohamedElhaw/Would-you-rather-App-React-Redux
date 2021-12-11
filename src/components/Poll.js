import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Poll =props=>{
    // Function to return date and time from timestamp
    const formatDate=timestamp=>{
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return d.toLocaleDateString() + ' | ' + time.substr(0, 5) + time.slice(-2) 
    }
    //Declare variables used in DOM
    const{users,question,id,selectedOption}=props;
    const {authorName}=users[question.author];
    const optionOne=question.optionOne.text;
    const optionTwo=question.optionTwo.text;
    const pollTime=<p className="card-text"><small className="text-muted">{formatDate(question.timestamp)}</small></p>;
    const markSelection=<p className="badge-edit rounded-pill bg-info m-0">Voted</p>
   
    return(
    <div className="card my-1 mx-auto" style={{maxWidth: "540px"}}>
        <div className="row g-0">
          <div className="user-info col-md-4">
            <img src={users[question.author].avatarURL} className="img-fluid rounded-circle img-resize" alt="user avatar"/>
            <p className="card-title mb-3">{authorName}</p>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h6 className="card-text">Would you rather?</h6>
              <div className="card-text">
                <div className="option-container">
                  <li className="option-list">{optionOne}</li>
                  {selectedOption==="optionOne"&&markSelection}
                </div>
                <div className="option-container">
                  <li className="option-list">{optionTwo}</li>
                  {selectedOption==="optionTwo"&&markSelection}
                </div>
              </div>
              {pollTime}
              <Link className="btn btn-outline-warning btn-sm" to={`/poll/${id}`}>
                {selectedOption? "View Resukts":"Answer"}
              </Link>
            </div>
          </div>
        </div>
    </div>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({users, questions},{id, selectedOption})=>({
    users,
    question:questions[id],
    selectedOption
}))(Poll)