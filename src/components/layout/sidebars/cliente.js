import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, faTools } from "@fortawesome/free-solid-svg-icons";

const SidebarCliente = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">VISITAS TÉCNICAS</div>
            <a className="nav-link" href="/otrequest">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Mis solicitudes
            </a>
            <a className="nav-link" href="/otrequest/create">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTools} /></div>
                Crear solicitud de visita
            </a>
        </>
    );
}

export default SidebarCliente;