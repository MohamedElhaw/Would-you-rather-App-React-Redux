import React,{useState} from "react";
import { connect } from "react-redux";
import {handleSaveQuestion} from "../actions/shared"
import { useNavigate } from "react-router-dom"

const NewPoll =props=> {
    //Define state, it's set function and passing the initial values
    const [state, setState]=useState({ optionOne:'', optionTwo:''})
    //Define DOM variables
    const {optionOne,optionTwo}=state;
    //Get navigate hook
    const navigate = useNavigate();
    
    /**
     * @description Controlled function to update the state with the input fields
     * @param {*} e event conatins name and values of input fields
     * @returns the new state conatins the values in the field
     */
    const handleChange=e=>{
       setState(prevState=> {
            return{
                ...prevState,[e.target.name]:e.target.value
            }
        })
    }
    /**
     * @description function used to submit new poll and dispatch it to the store as new question
     * @param {*} e event cause by submit click action and used to prevent reload page resources
     */
    const handleSubmit=e=>{
        e.preventDefault();
        const author=props.userId
        props.dispatch(handleSaveQuestion({ optionOneText:optionOne, optionTwoText:optionTwo, author }))
        setState({ optionOne:'', optionTwo:''}); //Initialize the input field and state after dispatching
        navigate("/"); //navigate to Home
    }

    return(
        <React.Fragment>
            <h3 className="m-3 center orange-text">Add new poll</h3>
            <div className="card mx-auto m-3 p-3" style={{width: "50%"}}>
                <form onSubmit={e=>handleSubmit(e)}>
                    <h5>Would you rather?</h5>
                    <div className="m-3">
                        <label htmlFor="option1" className="form-label">First option</label>
                        <input value={optionOne} name="optionOne" type="text" className="form-control" id="option1" 
                        onChange={e=>handleChange(e)}/>
                    </div>
                    <div className="m-3">
                        <label htmlFor="option2" className="form-label">Second option</label>
                        <input value={optionTwo} name="optionTwo" type="text" className="form-control" id="option2" 
                        onChange={e=>handleChange(e)}/>
                    </div>
                    <button type="submit" className="btn btn-warning ms-3" disabled={optionOne===""||optionTwo===""}>Submit</button>
                </form>
            </div>
        </React.Fragment>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({userId})=>({userId}))(NewPoll)