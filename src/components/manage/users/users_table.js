import { faEdit, faSearch, faSortAmountUp, faSortAmountDown, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination } from "react-bootstrap";
import Backend from "../../backend";
import LoadingContent from "../../layout/loading_content";

const UsersTable = () => {
    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUsers', {})
        .then(_users => {
            setUsersData(_users.data);
            setLoading(false);
        })
        .catch(err => {
            // console.log('ERROR');
            setUsersData({
                itemsCount: 0,
                pageIndex: 1
            });
            setLoading(false);
        });
    }, []);

    return loading ? <LoadingContent /> : <UsersTableContent usersData={usersData} />
}

const UsersTableContent = ({ usersData }) => {
    const itemsPerPage = 2;
    const totalItems = usersData.itemsCount;
    const numOfPages = Math.ceil(totalItems / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(usersData.pageIndex);
    const [currentFilter, setCurrentFilter] = useState('fullname');
    const [filterDir, setFilterDir] = useState('asc');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUsers', {
            params: {
                pageSize: itemsPerPage,
                pageIndex: currentPage,
                OrderBy: currentFilter,
                Order: filterDir
            }
        })
        .then(res => {
            console.log(res.data.data);
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [currentPage, currentFilter, filterDir]);

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

    const filterUsers = (filterCol) => {
        // setCurrentFilter(filterCol);
        // let filter_dir = 'asc';
        // if(currentFilter == filterCol && filterDir == 'asc') {
        //     filter_dir = 'desc';
        // }
        // setFilterDir(filter_dir);
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
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers('fullname')}>
                            Nombre
                            {currentFilter == 'fullname' ?
                                <FontAwesomeIcon icon={filterDir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers('role')}>
                            Rol
                            {currentFilter == 'role' ?
                                <FontAwesomeIcon icon={filterDir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '12rem', cursor: 'pointer'}} onClick={filterUsers('email')}>
                            Correo electrónico
                            {currentFilter == 'email' ?
                                <FontAwesomeIcon icon={filterDir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers('phone')}>
                            Teléfono
                            {currentFilter == 'phone' ?
                                <FontAwesomeIcon icon={filterDir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers('isEnabled')}>
                            Estado
                            {currentFilter == 'isEnabled' ?
                                <FontAwesomeIcon icon={filterDir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
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
                                    <a className="btn btn-outline-secondary rounded-circle text-center me-2">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </a>
                                    <a className="btn btn-outline-secondary rounded-circle text-center">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <caption className="pb-0">
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            Mostrando elementos {currentPage * itemsPerPage - itemsPerPage + 1} &ndash; {currentPage * itemsPerPage} de {totalItems}
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