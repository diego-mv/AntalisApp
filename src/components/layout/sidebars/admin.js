import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faToolbox, faArchive, faBusinessTime, faHardHat,
    faUserTie, faCog, faChartPie, faUsers
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";

const SidebarAdmin = () => {
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

            <div className="sb-sidenav-menu-heading">GESTIONAR</div>
            <NavLink className="nav-link" to="/manage/spare">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCog} /></div>
                Repuestos
            </NavLink>
            <NavLink className="nav-link" to="/manage/technicals">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faHardHat} /></div>
                Técnicos    
            </NavLink>
            <NavLink className="nav-link" to="/manage/customers">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUserTie} /></div>
                Clientes
            </NavLink>
            <NavLink className="nav-link" to="/manage/users">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers} /></div>
                Usuarios
            </NavLink>

            <div className="sb-sidenav-menu-heading">ESTADÍSTICAS</div>
            <NavLink className="nav-link" to="/stats">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartPie} /></div>
                Dashboard
            </NavLink>
            
        </>
    );
}

export default SidebarAdmin;