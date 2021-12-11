import {_saveQuestionAnswer, _saveQuestion} from "../data/_DATA"
import { toggleLoading } from "./loading";
//Declare action variables
export const SAVE_QUESTION_ANSWER="SAVE_QUESTION_ANSWER";
export const UNSAVE_QUESTION_ANSWER="UNSAVE_QUESTION_ANSWER";
export const SAVE_QUESTION="SAVE_QUESTION";
export const ADD_USER_QUESTION="ADD_USER_QUESTION"


//Action Creators
//----ANSWER QUESTIONS
const saveQuestionAnswer=(authorId,questionId,selectedOption)=>{
    return{
        type:SAVE_QUESTION_ANSWER,
        authorId,
        questionId,
        selectedOption
    }
}
//----UNSAVE ANSWER QUESTIONS
const unsaveQuestionAnswer=(authorId,questionId,selectedOption)=>{
    return{
        type:UNSAVE_QUESTION_ANSWER,
        authorId,
        questionId,
        selectedOption
    }
}
//Async action to save question answer in optimistic way
export const handleAnswerQuestion =(authorId,questionId,selectedOption)=>{
    return dispatch=>{
        dispatch(saveQuestionAnswer(authorId,questionId,selectedOption));
        _saveQuestionAnswer({authedUser:authorId, qid:questionId, answer:selectedOption})
        .catch(e=>{
            console.warn('Error in handleAnswerQuestion: ', e);
            dispatch(unsaveQuestionAnswer(authorId,questionId,selectedOption));//dispatch unsave action in case of error
        })
    }
}


//---SAVE QUESTION Action creator
const saveQuestion=question=>{
    return{
        type:SAVE_QUESTION,
        question
    }
}

//---ADD USER QUESTION Action creator
const addUserQuestion=question=>{
    return{
        type:ADD_USER_QUESTION,
        question
    }
}
// Async Action of save new question by dispatching two actions to update both Questions state and Users state
export const handleSaveQuestion=({ optionOneText, optionTwoText, author })=>{
    return(dispatch)=>{
        dispatch(toggleLoading()) //toggle loading... [show loading]
        _saveQuestion({ optionOneText, optionTwoText, author })
        .then(res=>{ 
            dispatch(saveQuestion(res))
            dispatch(addUserQuestion(res))
            dispatch(toggleLoading()) //toggle loading... [hide loading]
        })
        .catch(e=>{
            console.warn('Error in handleSaveQuestion: ', e)
            dispatch(toggleLoading()) //toggle loading... [hide loading]
        })
    }
}