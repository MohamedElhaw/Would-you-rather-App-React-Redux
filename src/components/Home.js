import React, { useState } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";
import Loading from "./Loading";

const Home =props=> {
    //Define state, it's set function and passing the initial values
    const [tapSelected,setTapSelected]=useState("Unanswered");

    /**
     * @description function used to render the DOM based on the selected tap ("Unanswered","Answered")
     * @param {*} e event that contains the selected tap name
     */
    const selectTap=e=>{
        const tapSelected=e.target.name
        setTapSelected(tapSelected);
    }

     //Define variables used in DOM
    const {userId, users, questions, loading}=props;
    const user=users[userId];
    const answeredQuestionsId=Object.keys(user.answers);
    const questionsKeys= Object.keys(questions);

    /*get unAnswered questions by first filtering answered out from all questions, then map to get full question object 
    and sort them from the most recently created (top) to the least recently created (bottom).  */
    const unansweredQuestions=questionsKeys.filter(q=>!answeredQuestionsId.includes(q)).map(id=>questions[id])
    .sort((a,b)=>b.timestamp-a.timestamp)
    /* get Answered question by maping answered from user object with questions object and then sorted them
    from the most recently created (top) to the least recently created (bottom)*/
    const answeredQuestions=answeredQuestionsId.map(id=>questions[id]).sort((a,b)=>b.timestamp-a.timestamp)

    return(
        loading?<Loading/>:
        <div className="home-container">
            <div className="btn-home-container">
                <button name="Unanswered" className={tapSelected==="Unanswered"? "btn-home selected-tap":"btn-home"}
                onClick={(e)=>selectTap(e)}>Unanswered</button>
                <button name="Answered" className={tapSelected==="Answered"? "btn-home selected-tap":"btn-home"}
                    onClick={(e)=>selectTap(e)}>Answered</button>
            </div>
            {tapSelected==="Unanswered"&&unansweredQuestions.map(q=><Poll key={q.id} id={q.id}/>)}
            {tapSelected==="Answered"&&answeredQuestions.map(q=><Poll key={q.id} id={q.id} selectedOption={user.answers[q.id]}/>)}
        </div>
    );    
}
//Connect the function component to the store map the state to its props 
export default connect(({userId, users, questions, loading})=>({userId, users, questions, loading}))(Home)