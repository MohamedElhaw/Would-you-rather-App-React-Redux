import React from "react";
import { connect } from "react-redux";
import LeaderScore from "./LeaderScore";

const Leaderboard =props=>{
     //Define variables used in DOM
    const {users}= props
    const usersId= Object.keys(users)
    //get the user array contains all users sorted by sum of their answers and questions from top to bottom
    const usersArray=usersId.map(id=> users[id]).sort((a,b)=>
    (Object.keys(b.answers).length+b.questions.length)-(Object.keys(a.answers).length+a.questions.length))
    
    return(
        <React.Fragment>
            <h3 className="center my-3 orange-text">Leaderboard</h3>
            <section>
                <table className="table" id="table-add">
                    <thead id="table-header">
                    <tr>
                        <th><span>User</span></th>
                        <th className="leaderboard-center"><span>No. Questions</span></th>
                        <th className="leaderboard-center"><span>No. Answers</span></th>
                        <th className="leaderboard-center"><span>Score</span></th>
                    </tr>
                    </thead>
                    <tbody id="table-body">
                        {usersArray.map(user=> <LeaderScore key ={user.id} user={user}/>)}
                    </tbody>
                </table>
            </section>
        </React.Fragment>
    );
}
//Connect the function component to the store map the state to its props 
export default connect(({users})=>({users}))(Leaderboard)