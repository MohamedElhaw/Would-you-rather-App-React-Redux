import React from "react";
import { connect } from "react-redux";

const Undefined=()=>{
    //function used to render the message in case of unused/wrong URL typed by user
    return(
        <div className="orange-text center m-3">
            <h4>404 page</h4>
            <h5>Sorry, This URL doesn't exist</h5>    
        </div>
    );
}
//Connect the function component to the store
export default connect()(Undefined);