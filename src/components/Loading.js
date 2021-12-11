import React from "react";
import { connect } from "react-redux";
const Loading =()=>{
    return(
        <div className="server-load-image center">
            <div className="spinner-border loading-img" role="status"></div>
            <div >Loading...</div>
        </div>
    );
}

export default connect()(Loading)