import React, { useState } from "react";
import { connect } from "react-redux";
import {handleAnswerQuestion} from "../actions/shared"

const PollVote =props=> {
    //Define state, it's set function and passing the initial values
    const [selectedValue, setSelectedValue]=useState("")

    //Define variables used in DOM
    const {option1,option2, userId, questionId,dispatch}=props

    /**
     * @description function used to get selected value of the two options
     * @param {*} e event that contains the value selected
     */
    const handleSelectedValue=e=>{
        const selectedValue= e.target.value
        setSelectedValue(selectedValue);
    }

    /**
     * @description function that used to dispatch the user vote
     * @param {*} e event cause by submit click action and used to prevent reload page resources
     */
    const handleSubmit=e=>{
        e.preventDefault();
        dispatch(handleAnswerQuestion(userId, questionId,selectedValue))
    }

    return (
        <React.Fragment>
            <p className="center">Asks:</p>
        <form className="m-3" onSubmit={e=>handleSubmit(e)}>
            <p className="fw-bold">Would you rather?</p>
            <div className="form-check ms-3">
                <input className="form-check-input" type="radio" name="user-vote" id="option1" value ="optionOne"
                onChange={e=>handleSelectedValue(e)}/>
                <label className="form-check-label" htmlFor="option1">{option1}</label>
            </div>
            <div className="form-check ms-3">
                <input className="form-check-input" type="radio" name="user-vote" id="option2" value ="optionTwo"
                onChange={e=>handleSelectedValue(e)}/>
                <label className="form-check-label" htmlFor="option2">{option2}</label>
            </div>
            <button type="submit" className= "btn btn-primary mt-2" disabled={selectedValue===""}>Vote</button>
        </form>
        </React.Fragment>
    );
}

//Connect the function component to the store map the state to its props 
export default connect (({userId},{option1,option2})=>{
    return{
        userId,
        option1,
        option2
    }
})(PollVote)