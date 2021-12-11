import {_getQuestions} from "../data/_DATA"
import { toggleLoading } from "./loading";
//Declare action variables
export const LOAD_QUESTIONS="LOAD_QUESTIONS";



//Action Creators
//----LOAD QUESTIONS
const loadQuestions=questions=>{
    return{
        type:LOAD_QUESTIONS,
        questions
    }
}
//Async action to get the initial data of questions state
export const handleGetQuestions=()=>{
    return(dispatch)=>{
        dispatch(toggleLoading()) //toggle loading...[show loading]
        _getQuestions()
        .then(questions=> {
            dispatch(loadQuestions(questions))
            dispatch(toggleLoading()) //toggle loading...[hide loading]
        })
        .catch(e=> {
            console.warn('Error in handleGetQuestions: ', e)
            dispatch(toggleLoading()) //toggle loading... [hide loading]
        })
    }
}
