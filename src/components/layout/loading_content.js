import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingContent = () => {
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
        <div className="d-flex h-100 justify-content-center align-items-center my-auto">
            <Spinner animation="grow" size="sm" role="status" variant="primary" className="mx-1" style={delay0}></Spinner>
            <Spinner animation="grow" size="sm" role="status" variant="primary" className="mx-1" style={delay500}></Spinner>
            <Spinner animation="grow" size="sm" role="status" variant="primary" className="mx-1" style={delay1000}></Spinner>
        </div>
    );
}

export default LoadingContent;