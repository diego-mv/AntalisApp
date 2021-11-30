import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import {Tabs, Tab } from "react-bootstrap"
import AccordionDataRequest from "./utils/accordionDataRequest";
import CommentsOT from "./utils/CommentsOT";
import Backend from "../backend";
import LoadingContent from "../layout/loading_content";

const ViewOT = ({match}) => {
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataSolicitud, setDataSolicitud] = useState({
        idSolicitud : "fd971d67-69c1-4138-80b5-dcdd4db652ae",
        idOT: "fd971d67-69c1-4138-80b5-dcdd4db652ae",
        marca: "Acer",
        modelo: "Predator",
        serie: "AB781HA",
        fullnameCliente: "Alfredo",
        emailCliente: "dasas@fgsd.com",
        phoneCliente: "32323223",
        fechaCreacion: new Date(),
        descripcion: "sddsjaskdl;jdsakl;dsajkldasjasdkljdaskldsjaklasdjlkadsklj",
        region: "RM",
        comuna: "AAA",
        calle: "calle 123"
    });

    useEffect(() => {

        Backend.get('/OrdenTrabajo/getOT', {params: {
            idSolicitud: match.params.id
                 }})
                .then(res => {
                    setDataSolicitud(res.data)
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });

    }, []);

    return loading ? <LoadingContent/> : <Layout content={<ViewOTContent dataSolicitud={dataSolicitud} alert={alert} setAlert={setAlert}/>} />;
}

const ViewOTContent = ({dataSolicitud, alert, setAlert}) => {
    return (
        <div className="card p-3 bg-white" style={{minHeight: '20rem', minWidth: '20rem'}}>
            {alert}
            <div className="px-2">                    
                <h3 className="text-secondary h3-request"><FontAwesomeIcon icon={faBriefcase} className="me-2" /> Solicitud <span className="text-primary">{dataSolicitud.marca} {dataSolicitud.modelo}</span> <span className="text-muted h3-span-request">Serie: {dataSolicitud.serie}</span></h3>              
            </div>
            <hr className="my-3" />

            <div className="row">
                <div className="col-12 col-md-7 mb-3">
                    
                    <AccordionDataRequest 
                                          defaultActiveKey={{defaultActiveKey : "0"}}
                                          fullnameCliente={dataSolicitud.fullnameCliente} 
                                          emailCliente={dataSolicitud.emailCliente}
                                          phoneCliente={dataSolicitud.phoneCliente}
                                          marca={dataSolicitud.marca}
                                          modelo={dataSolicitud.modelo}
                                          serie={dataSolicitud.serie}
                                          fechaCreacion={dataSolicitud.fechaCreacion}
                                          descripcion={dataSolicitud.descripcion}
                                          region={dataSolicitud.region}
                                          comuna={dataSolicitud.comuna}
                                          calle={dataSolicitud.calle}/>

                </div>
                <div className="col-12 col-md-5 mb-3">
                    <CommentsOT idOT={dataSolicitud.idOT} setAlert={setAlert}/>
                </div>
            </div>

        </div>
    );
}

export default ViewOT;