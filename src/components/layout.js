import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/sb-admin/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import brand from '../img/antalis-brand-white.png';
import { ValidateToken } from './backend';
import { useHistory } from 'react-router';
import Loading from './loading';
import Cookies from 'universal-cookie';
import LoggedAs from './layout/logged_as';
import SidebarCliente from './layout/sidebars/cliente';
import SidebarTecnico from './layout/sidebars/tecnico';
import SidebarCoordinador from './layout/sidebars/coordinador';
import SidebarAnalista from './layout/sidebars/analista';
import SidebarAdmin from './layout/sidebars/admin';
import LoadingContent from './layout/loading_content';
import { getCurrentRole } from '../helpers/getData';
import { NavLink } from 'react-router-dom';


const switchSideBar = (role) => {
    switch (role) {
        case "Admin":
            return <SidebarAdmin/>;    
        case "Analista":
            return <SidebarAnalista/>;   
        case "Cliente":
            return <SidebarCliente/>;   
        case "Coordinador":
            return <SidebarCoordinador/>;   
        case "Tecnico":
            return <SidebarTecnico/>;   
        default:
            return null;
    }
}

const Layout = ({ content }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        const checkSession = async () => {
            const valid_token = await ValidateToken(cookies.get('session_jwt', { path: '/' }));
            valid_token ? setLoading(false) : history.push('/');
        }
        checkSession();
    }, []);

    return loading ? <Loading /> : <LayoutPage content={content} />
}

const LayoutPage = ({ content }) => {
    const layout_wrapper = useRef();
    const cookies = new Cookies();
    const history = useHistory();
    const currentRole = getCurrentRole();
    const sidebarToggle = e => {
        e.preventDefault();
        layout_wrapper.current.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', layout_wrapper.current.classList.contains('sb-sidenav-toggled'));
    }
    

    const handleLogout = () => {
        cookies.remove('session_jwt', {
            path: '/'
        });
        localStorage.removeItem("current_user");
        history.push('/');
    }

    return (
        <div className="vh-100 sb-nav-fixed" ref={layout_wrapper}>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-primary shadow-sm">
                <NavLink className="navbar-brand ps-3" to="/home">
                    <img src={brand} id="navbar-brand-img" height="30" className="my-auto" />
                </NavLink>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle"
                    onClick={sidebarToggle} href="#!">
                    <FontAwesomeIcon icon={faBars} className="text-white" />
                </button>

                <Dropdown className="ms-auto me-3 me-lg-4">
                    <Dropdown.Toggle id="user-toggle" className="border-0">
                        <FontAwesomeIcon icon={faUser} className="fa-fw" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/configureaccount">
                            <FontAwesomeIcon icon={faUserCog} className="me-1" />
                            Configuraci??n de cuenta
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                            Cerrar sesi??n
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark bg-secondary" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                {switchSideBar(currentRole)}
                            </div>
                        </div>
                        <div className="sb-sidenav-footer" id="logged-as">
                            <LoggedAs />
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content" className="bg-lightgray">
                    <main>
                        {content}
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">&copy; {new Date().getFullYear()} &ndash; Antalis</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Layout;