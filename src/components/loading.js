import React from "react";
import { Spinner } from "react-bootstrap";
import logo from '../img/antalis-logo.png';

const Loading = () => {
    const style = {
        overflow: 'hidden'
    }

    const row_img_style = {
        width: '20rem'
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-lightgray"
            style={style}>
            <div className="row mb-3">
                <Spinner animation="border" role="status" variant="primary"></Spinner>
            </div>
            <div className="row" style={row_img_style}>
                <img src={logo} />
            </div>
        </div>
    );
}

export default Loading;