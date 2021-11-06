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

    const sidebarToggle = e => {
        e.preventDefault();
        layout_wrapper.current.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', layout_wrapper.current.classList.contains('sb-sidenav-toggled'));
    }

    useEffect(() => {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            layout_wrapper.current.classList.toggle('sb-sidenav-toggled');
        }
    });

    const handleLogout = () => {
        cookies.remove('session_jwt', {
            path: '/'
        });
        history.push('/');
    }

    return (
        <div className="vh-100 sb-nav-fixed" ref={layout_wrapper}>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-primary shadow-sm">
                <a className="navbar-brand ps-3" href="#">
                    <img src={brand} id="navbar-brand-img" height="30" className="my-auto" />
                </a>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle"
                    onClick={sidebarToggle} href="#!">
                    <FontAwesomeIcon icon={faBars} className="text-white" />
                </button>

                <Dropdown className="ms-auto me-3 me-lg-4">
                    <Dropdown.Toggle id="user-toggle" className="border-0">
                        <FontAwesomeIcon icon={faUser} className="fa-fw" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <FontAwesomeIcon icon={faUserCog} className="me-1" />
                            Configuración de cuenta
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                            Cerrar sesión
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark bg-secondary" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <SidebarAdmin />
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