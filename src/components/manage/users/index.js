import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../../layout";
import UsersTable from "./utils/users_table";

const ManageUsers = () => {
    return <Layout content={<ManageUsersContent />} />;
}

const ManageUsersContent = () => {
    return (
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Gestionar usuarios
                </h4>
            </div>

            <hr className="my-3" />

            <UsersTable />
        </div>
    );
}

export default ManageUsers;