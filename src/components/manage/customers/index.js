import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../../layout";
import CustomersTable from "./utils/customers_table";

const ManageCustomers = () => {
    return <Layout content={<ManageCustomersContent />} />;
}

const ManageCustomersContent = () => {
    return (
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faUserTie} className="me-2" />
                    Gestionar clientes
                </h4>
            </div>

            <hr className="my-3" />

            <CustomersTable />
        </div>
    );
}

export default ManageCustomers;