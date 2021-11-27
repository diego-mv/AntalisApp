import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faToolbox, faArchive, faBusinessTime, faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarAnalista = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">ÓRDENES DE TRABAJO</div>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Solicitudes de OT
            </NavLink>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBusinessTime} /></div>
                OTs en curso
            </NavLink>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faArchive} /></div>
                OTs archivadas
            </NavLink>

            <div className="sb-sidenav-menu-heading">SOLICITUDES DE REPUESTOS</div>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Solicitudes
            </NavLink>
            <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faArchive} /></div>
                Solicitudes archivadas
            </NavLink>
            <div className="sb-sidenav-menu-heading">ESTADÍSTICAS</div>
            <NavLink className="nav-link" to="/stats">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartPie} /></div>
                Dashboard
            </NavLink>
        </>
    );
}

export default SidebarAnalista;