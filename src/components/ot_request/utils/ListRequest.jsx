import React, { useState, useEffect, useRef } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/es-mx"

const ListRequest = ({ requests }) => {
    moment().locale('es')
    return (
        <div>
            {requests.map((request)=>(
                <div className="card mb-4" style={{minHeight:"15rem"}} key={request.id}>
                    <div className="card-body" style={{position: "relative"}}>
                        <h3 className="text-secondary h3-request">Solicitud <span className="text-primary">{request.marca} {request.modelo}</span> <span className="text-muted h3-span-request">Serie: {request.serie}</span></h3>
                        <hr/>
                        {request.estadoId === "79b12fb2-f9ff-4a7a-ba4a-0da48637442f" ? <span className="badge bg-info" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue ingresada en el sistema pero no ha sido atendida.">{request.estado}</span> : null}
                        {request.estadoId === "7b6aba68-70e6-4174-98b5-67232808b29d" ? <span className="badge bg-success" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue atendida y está en curso.">{request.estado}</span> : null}
                        {request.estadoId === "bc4edb94-0c87-4845-85a3-4b9317a2923e" ? <span className="badge bg-dark" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue completada y está cerrada.">{request.estado}</span> : null}

                        <div className="text-muted dates-request" >
                            Fecha de creación: {moment(request.fechaCreacion).format("DD-MM-yyyy HH:mm")} 
                            <br/>
                            Última actualización: {moment(request.fechaCreacion).fromNow()} 
                        </div>
                        <button className="btn btn-primary float-btn-request">Abrir</button>
                    </div>
                </div>    
            
            
            ))}
        </div>
    );
}

export default ListRequest;