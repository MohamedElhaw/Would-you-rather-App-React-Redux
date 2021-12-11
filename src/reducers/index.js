import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import userId from "./user";
import loading from "./loading";

//combine reducers
export default combineReducers({
    users,
    questions,
    userId,
    loading
})


