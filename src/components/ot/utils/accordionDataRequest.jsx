import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AccordionDataRequest = ({defaultActiveKey,fullnameCliente, emailCliente, phoneCliente, marca, modelo, serie, fechaCreacion, descripcion, region, comuna, calle}) => {
    return (
        <Accordion {...defaultActiveKey}>
            <Accordion.Item eventKey="0">
                <Accordion.Header><span className="text-bold"><FontAwesomeIcon icon={faInfoCircle} className="me-2" /> Datos solicitud</span></Accordion.Header>
                <Accordion.Body>
                    <div className="mb-2">
                        <span className="text-bold">Cliente: </span> {fullnameCliente} (<a href={`mailto:${emailCliente}`}>{emailCliente}</a>)
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Teléfono: </span> {phoneCliente}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Marca Equipo:</span> {marca}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Modelo Equipo:</span> {modelo}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Serie Equipo:</span> {serie}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Fecha de ingreso solicitud: </span> {moment(fechaCreacion).format("DD-MM-yyyy HH:mm")}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Región: </span> {region}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Comuna: </span> {comuna}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Calle: </span> {calle}
                    </div>
                    <div className="mb-2">
                        <span className="text-bold">Descripción: </span><br/>
                        {descripcion}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
} 

export default AccordionDataRequest;