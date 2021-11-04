import { faEdit, faSearch, faSort, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination } from "react-bootstrap";
import Backend from "../../backend";
import LoadingContent from "../../layout/loading_content";

const UsersTable = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getUsers', {})
        .then(_users => {
            setUsers(_users);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return loading ? <LoadingContent /> : <UsersTableContent users={users} />
}

const UsersTableContent = ({ users }) => {
    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <a href="/manage/users/new" className="btn btn-primary">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Nuevo
                </a>

                <div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text" className="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <Table striped hover borderless responsive>
                <thead>
                    <tr>
                        <th>
                            Nombre
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                        </th>
                        <th>
                            Rol
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                        </th>
                        <th>
                            Correo electrónico
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                        </th>
                        <th className="text-center">
                            Teléfono
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                        </th>
                        <th className="text-center">
                            Estado
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                        </th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.fullname}</td>
                                <td>{user.rol}</td>
                                <td>{user.email}</td>
                                <td className="text-center">{user.telefono || <>&ndash;</>}</td>
                                <td className="text-center">
                                    <Badge pill bg={user.accountEnabled ? 'success' : 'danger'}>
                                        {user.accountEnabled ? 'Activo' : 'Inactivo'}
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
                <caption>
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            Mostrando elementos # &ndash; # de #
                        </div>

                        <div>
                            <Pagination size="sm">
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    </div>
                </caption>
            </Table>

        </div>
    );
}

export default UsersTable;