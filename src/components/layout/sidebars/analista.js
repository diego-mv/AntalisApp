import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faToolbox, faArchive, faBusinessTime, faChartPie
} from "@fortawesome/free-solid-svg-icons";

const SidebarAnalista = () => {
    return (
        <>
            <div className="sb-sidenav-menu-heading">ÓRDENES DE TRABAJO</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Solicitudes de OT
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBusinessTime} /></div>
                OTs en curso
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faArchive} /></div>
                OTs archivadas
            </a>

            <div className="sb-sidenav-menu-heading">SOLICITUDES DE REPUESTOS</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faToolbox} /></div>
                Solicitudes
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faArchive} /></div>
                Solicitudes archivadas
            </a>

            <div className="sb-sidenav-menu-heading">ESTADÍSTICAS</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartPie} /></div>
                Dashboard
            </a>
        </>
    );
}

export default SidebarAnalista;