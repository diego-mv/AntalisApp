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

const Layout = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        const checkSession = async () => {
            const valid_token = await ValidateToken(cookies.get('session_jwt'));
            valid_token ? setLoading(false) : history.push('/');
        }
        checkSession();
    }, []);

    return loading ? <Loading /> : <LayoutPage />
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
        cookies.remove('session_jwt');
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
                                <div className="sb-sidenav-menu-heading">Core</div>
                                <a className="nav-link" href="index.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </a>
                                <div className="sb-sidenav-menu-heading">Interface</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Layouts
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                        <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Pages
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                            Authentication
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="login.html">Login</a>
                                                <a className="nav-link" href="register.html">Register</a>
                                                <a className="nav-link" href="password.html">Forgot Password</a>
                                            </nav>
                                        </div>
                                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                            Error
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="401.html">401 Page</a>
                                                <a className="nav-link" href="404.html">404 Page</a>
                                                <a className="nav-link" href="500.html">500 Page</a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Addons</div>
                                <a className="nav-link" href="charts.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                    Charts
                                </a>
                                <a className="nav-link" href="tables.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                    Tables
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer" id="logged-as">
                            <LoggedAs />
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content" className="bg-lightgray">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Sidenav Light</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li className="breadcrumb-item active">Sidenav Light</li>
                            </ol>
                            <div className="card mb-4">
                                <div className="card-body">
                                    This page is an example of using the light side navigation option. By appending the
                                    <code>.sb-sidenav-light</code>
                                    class to the
                                    <code>.sb-sidenav</code>
                                    class, the side navigation will take on a light color scheme. The
                                    <code>.sb-sidenav-dark</code>
                                    is also available for a darker option.
                                </div>
                            </div>
                        </div>
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