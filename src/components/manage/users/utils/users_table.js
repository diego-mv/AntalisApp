import { faEdit, faSearch, faSortAmountUp, faSortAmountDown, faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import Backend from "../../../backend";
import LoadingContent from "../../../layout/loading_content";

const UsersTable = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUsers', {})
        .then(_users => {
            console.log(_users.data);
            setUsersData(_users.data);
        })
        .catch(err => {
            // console.log('ERROR');
            setUsersData({
                itemsCount: 0,
                pageIndex: 1
            });
        });
    }, []);

    return !usersData ? <LoadingContent /> : <UsersTableContent usersData={usersData} />
}

const UsersTableContent = ({ usersData }) => {
    const itemsPerPage = 5;
    const [totalItems, setTotalItems] = useState(usersData.itemsCount);
    const [numOfPages, setNumOfPages] = useState(Math.ceil(totalItems / itemsPerPage));

    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState({
        columnName: 'fullname',
        dir: 'asc'
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUsers', {
            params: {
                pageSize: itemsPerPage,
                pageIndex: currentPage,
                OrderBy: currentFilter.columnName,
                Order: currentFilter.dir
            }
        })
        .then(res => {
            // console.log(res.data);
            setTotalItems(res.data.itemsCount);
            setNumOfPages(Math.ceil(res.data.itemsCount / itemsPerPage));
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [currentPage, currentFilter]);

    const nextPage = () => {
        if(currentPage < numOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const previousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const firstPage = () => {
        if(currentPage != 1) {
            setCurrentPage(1);
        }
    }

    const lastPage = () => {
        if(currentPage != numOfPages) {
            setCurrentPage(numOfPages);
        }
    }

    const filterUsers = (event) => {
        const filterCol = event.target.getAttribute('col');
        let filter_dir = 'asc';
        if(currentFilter.columnName == filterCol && currentFilter.dir == 'asc') {
            filter_dir = 'des';
        }
        setCurrentFilter({
            columnName: filterCol,
            dir: filter_dir
        });
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <a href="/manage/users/new" className="btn btn-primary">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span className="d-none d-md-inline ms-2">Nuevo</span>
                </a>

                <div style={{width: '12rem'}}>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text" className="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <Table striped hover borderless responsive className="mb-0">
                <thead>
                    <tr>
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'fullname'}>
                            Nombre
                            {currentFilter.columnName == 'fullname' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'role'}>
                            Rol
                            {currentFilter.columnName == 'role' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '12rem', cursor: 'pointer'}} onClick={filterUsers} col={'email'}>
                            Correo electrónico
                            {currentFilter.columnName == 'email' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'phone'}>
                            Teléfono
                            {currentFilter.columnName == 'phone' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'isEnabled'}>
                            Estado
                            {currentFilter.columnName == 'isEnabled' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.fullname}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td className="text-center">{user.phone || <>&ndash;</>}</td>
                                <td className="text-center">
                                    <Badge pill bg={user.isEnabled ? 'success' : 'danger'}>
                                        {user.isEnabled ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </td>
                                <td className="text-center">
                                    <OverlayTrigger placement="left"
                                        overlay={<Tooltip>Editar usuario</Tooltip>}>

                                        <a className="btn btn-outline-secondary text-center me-2"
                                            href={'/manage/users/edit/' + user.id}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </a>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="left"
                                        overlay={<Tooltip>Desactivar cuenta</Tooltip>}>

                                        <a className="btn btn-outline-secondary text-center">
                                            <FontAwesomeIcon icon={faUserMinus} />
                                        </a>
                                    </OverlayTrigger>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <caption className="pb-0">
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            Mostrando elementos {currentPage * itemsPerPage - itemsPerPage + 1} &ndash; {currentPage * itemsPerPage < totalItems ? currentPage * itemsPerPage : totalItems} de {totalItems}
                        </div>

                        <div>
                            <Pagination size="sm">
                                <Pagination.First onClick={firstPage} />
                                <Pagination.Prev  onClick={previousPage} />

                                {/* {currentPage > 1 ? <Pagination.Ellipsis /> : <></>} */}

                                <Pagination.Item active>{currentPage}</Pagination.Item>

                                {/* {numOfPages - currentPage >= 1 ? <Pagination.Ellipsis /> : <></>} */}

                                <Pagination.Next onClick={nextPage} />
                                <Pagination.Last onClick={lastPage} />
                            </Pagination>
                        </div>
                    </div>
                </caption>
            </Table>

        </div>
    );
}

export default UsersTable;