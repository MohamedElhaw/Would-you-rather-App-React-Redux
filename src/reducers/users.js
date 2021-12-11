import { LOAD_USERS, ADJUST_AVATAR }from "../actions/users";
import { ADD_USER_QUESTION, SAVE_QUESTION_ANSWER, UNSAVE_QUESTION_ANSWER } from "../actions/shared";

//handle change the users state at different actions
export default function users (state={},action){
    switch (action.type){
        case LOAD_USERS:
            return action.users
        case ADJUST_AVATAR:
            const keys=Object.keys(action.users);
            let adjAvatarState={};
            for (const key of keys){
                adjAvatarState = {
                ...adjAvatarState, [key]: {...state[key],avatarURL:`/images/${key}.jpg` }
            }}
            return{
                ...adjAvatarState
            }
        case SAVE_QUESTION_ANSWER:
            return{
                ...state,
                [action.authorId]:{
                    ...state[action.authorId],
                    answers:{
                        ...state[action.authorId].answers,
                        [action.questionId]:action.selectedOption
                    }
                }
            }
        case UNSAVE_QUESTION_ANSWER:
            let preSaveState={...state};
            delete preSaveState[action.authorId].answers[action.questionId]
            return{
               preSaveState
            }
        case ADD_USER_QUESTION:
            return{
                ...state,
                [action.question.author]:{
                    ...state[action.question.author],
                    "questions":[...state[action.question.author]["questions"], action.question.id]
                }
            }    
        default:
            return state
    }
}