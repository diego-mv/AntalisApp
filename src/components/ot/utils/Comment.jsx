import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from "moment";

const Comment = ({fullname, role, datetime, text}) => {
    const cardMyComment = {
        border: "1px solid #F50C7D",
        borderRadius: "30px",
        borderTopRightRadius: "0px"
    }
    const cardComment = {
        border: "1px solid #0F034E",
        borderRadius: "30px",
        borderTopLeftRadius: "0px"
    }

    return (
        <div className={`card p-2 mb-2`}  style={fullname === "Yo" ? cardMyComment : cardComment}>
            {
                fullname === "Yo" 
                ? (<span className="text-bold text-primary comment-my-name"><span className="text-muted" style={{color: "gray", fontWeight: "normal", fontSize: ".9rem"}}>{role}</span> Yo <FontAwesomeIcon icon={faUserCircle}/></span>)
                : (<span className="text-bold text-secondary comment-name-another"> <FontAwesomeIcon icon={faUserCircle}/> {fullname} <span className="text-muted" style={{color: "gray", fontWeight: "normal", fontSize: ".9rem"}}>{role}</span></span>)
            }
            <p style={{paddingLeft: "1rem", fontSize: "1.1rem"}}>
                {text}
            </p>
            <span className={`text-muted ${fullname === "Yo" ? "comment-my-time" : "comment-time-another"}`}>{moment(datetime).fromNow()}</span>
        </div>
    );
} 

export default Comment;