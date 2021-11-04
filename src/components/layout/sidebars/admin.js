import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faToolbox, faArchive, faBusinessTime, faHardHat,
    faUserTie, faCog, faChartPie, faUsers
} from "@fortawesome/free-solid-svg-icons";

const SidebarAdmin = () => {
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

            <div className="sb-sidenav-menu-heading">GESTIONAR</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCog} /></div>
                Repuestos
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faHardHat} /></div>
                Técnicos
            </a>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUserTie} /></div>
                Clientes
            </a>
            <a className="nav-link" href="/manage/users">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers} /></div>
                Usuarios
            </a>

            <div className="sb-sidenav-menu-heading">ESTADÍSTICAS</div>
            <a className="nav-link" href="#">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartPie} /></div>
                Dashboard
            </a>
        </>
    );
}

export default SidebarAdmin;