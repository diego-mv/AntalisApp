import React from "react";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonBack = ({to}) => {
    const delay0 = {
        animationDelay: '0ms',
        animationDuration: '1s'
    }

    const delay500 = {
        animationDelay: '250ms',
        animationDuration: '1s'
    }

    const delay1000 = {
        animationDelay: '500ms',
        animationDuration: '1s'
    }

    return (
        <Link to={to} className="link-primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Volver atrás
        </Link>
    );
}

export default ButtonBack;