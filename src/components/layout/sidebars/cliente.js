import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, faTools } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarCliente = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">VISITAS TÉCNICAS</div>
            <NavLink className="nav-link" to="/otrequest">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Mis solicitudes
            </NavLink>
            <NavLink className="nav-link" to="/otrequest/create">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTools} /></div>
                Crear solicitud de visita
            </NavLink>
        </>
    );
}

export default SidebarCliente;