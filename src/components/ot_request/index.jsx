import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../layout";

const OtRequest = () => {
    return <Layout content={<OtRequestContent />} />;
}

const OtRequestContent = () => {
    return (
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
                    Mis solicitudes
                </h4>
            </div>

            <hr className="my-3" />

        </div>
    );
}

export default OtRequest;