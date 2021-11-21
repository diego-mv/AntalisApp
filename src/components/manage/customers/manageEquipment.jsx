import { faLaptopHouse,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout";
import Backend from "../../backend";
import EquipmentTable from "./utils/equipment_table";

const ManageEquipment = ({match}) => {
    const [nameCustomer, setNameCustomer] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        Backend.get('/Accounts/getUser', {
            params: {
                IdUser: match.params.id
            }
        })
        .then(res => {
            setNameCustomer(res.data.fullname)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);
    return <Layout content={<ManageEquipmentContent name={nameCustomer} match={match}/>} />;
}

const ManageEquipmentContent = ({name, match}) => {
    return (
        
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faLaptopHouse} className="me-2" />
                    Gestionar equipos: <span className="text-primary">{name}</span>
                </h4>
                <div className="my-2">
                <a className="link-primary" href="/manage/customers">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Volver atrás
                </a>
            </div>
            </div>

            <hr className="my-3" />

            <EquipmentTable match={match}/>
        </div>
    );
}

export default ManageEquipment;