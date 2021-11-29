import { faClock, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../layout";
import ListRequest from "./utils/ListRequest";

const AllRequest = () => {
    
    return <Layout content={<OtRequestContent/>} />;
}

const OtRequestContent = () => {
    return (
        <div className="card p-3 bg-white mx-auto" style={{minHeight: '20rem', minWidth: '20rem', maxWidth: "80rem"}}>
            <div className="px-2">
                <h4 className="mb-0 text-bold">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    Solicitudes de OT
                </h4>
            </div>

            <hr className="my-3" />
             <ListRequest url='/OrdenTrabajo/pendingSolicitudes' parameters={{}}/> 
        </div>
    );
}

export default AllRequest;