import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const SidebarTecnico = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">ÓRDENES DE TRABAJO</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                OTs asignadas
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                Calendario de trabajo
            </a>
        </>
    );
}

export default SidebarTecnico;