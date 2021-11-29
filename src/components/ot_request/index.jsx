import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState , useEffect} from "react";
import Layout from "../layout";
import ListRequestClient from "./utils/ListRequestClient";
import Backend from "../backend";
import LoadingContent from "../layout/loading_content";

const OtRequest = () => {
    
    return <Layout content={<OtRequestContent/>} />;
}

const OtRequestContent = () => {
    return (
        <div className="card p-3 bg-white mx-auto" style={{minHeight: '20rem', minWidth: '20rem', maxWidth: "80rem"}}>
            <div className="px-2">
                <h4 className="mb-0 text-bold">
                    <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
                    Mis solicitudes
                </h4>
            </div>

            <hr className="my-3" />
            <ListRequestClient url='/OrdenTrabajo/MisSolicitudes' parameters={{}}/>
        </div>
    );
}

export default OtRequest;