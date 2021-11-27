import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarTecnico = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">ÓRDENES DE TRABAJO</div>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                OTs asignadas
            </NavLink>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                Calendario de trabajo
            </NavLink>
        </>
    );
}

export default SidebarTecnico;