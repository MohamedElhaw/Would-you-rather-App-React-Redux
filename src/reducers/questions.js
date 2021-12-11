import {LOAD_QUESTIONS} from "../actions/questions";
import { SAVE_QUESTION_ANSWER, UNSAVE_QUESTION_ANSWER, SAVE_QUESTION } from "../actions/shared";

//handle change the questions state at different actions
export default function questions (state={},action){
    switch (action.type){
        case LOAD_QUESTIONS:
            return action.questions
        case SAVE_QUESTION_ANSWER:
            return{
                ...state,
                [action.questionId]:{
                    ...state[action.questionId],
                    [action.selectedOption]:{
                        ...state[action.questionId][action.selectedOption],
                        votes:[...state[action.questionId][action.selectedOption].votes, action.authorId]
                    }
                }
            }
        case UNSAVE_QUESTION_ANSWER:
            return{
                ...state,
                [action.questionId]:{
                    ...state[action.questionId],
                    [action.selectedOption]:{
                        ...state[action.questionId][action.selectedOption],
                        votes:state[action.questionId][action.selectedOption].votes.filter(id=>id!==action.authorId)
                    }
                }
            }
        case SAVE_QUESTION:
            return{
                ...state,
                [action.question.id]:{...action.question}
            }
        default:
            return state
    }
}