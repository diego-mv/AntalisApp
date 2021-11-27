import { faHardHat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../../layout";
import TechnicalsTable from "./utils/technicals_table";

const ManageTechnicals = () => {
    return <Layout content={<ManageTechnicalsContent />} />;
}

const ManageTechnicalsContent = () => {
    return (
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            <div className="px-2">
                <h4 className="mb-0 text-bold">
                    <FontAwesomeIcon icon={faHardHat} className="me-2" />
                    Gestionar técnicos
                </h4>
            </div>

            <hr className="my-3" />

            <TechnicalsTable />
        </div>
    );
}

export default ManageTechnicals;