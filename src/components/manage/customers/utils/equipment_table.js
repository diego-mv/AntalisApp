import { faEdit, faSearch, faSortAmountUp, faSortAmountDown, faUserMinus, faUserPlus, faPlus, faListAlt, faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import Backend from "../../../backend";
import LoadingContent from "../../../layout/loading_content";

const EquipmentTable = ({match}) => {
    const [equipmentData, setEquipmentData] = useState([]);

    useEffect(() => {
        Backend.get('/OrdenTrabajo/GetEquipos', {
            params: {
                IdCliente: match.params.id
            }
        })
        .then(_users => {
            console.log(_users.data);
            setEquipmentData(_users.data);
        })
        .catch(err => {
            // console.log('ERROR');
            setEquipmentData({
                itemsCount: 0,
                pageIndex: 1
            });
        });
    }, []);

    return !equipmentData ? <LoadingContent /> : <EquipmentTableContent equipmentData={equipmentData} match={match} />
}

const EquipmentTableContent = ({ equipmentData, match }) => {
    const itemsPerPage = 5;
    const [totalItems, setTotalItems] = useState(equipmentData.itemsCount);
    const [numOfPages, setNumOfPages] = useState(Math.ceil(totalItems / itemsPerPage));

    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState({
        columnName: 'marca',
        dir: 'asc'
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        console.log(match.params.id)
        Backend.get('/OrdenTrabajo/GetEquipos', {
            params: {
                IdCliente: match.params.id,
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
            setCustomers(res.data.data);
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
                <a href={'/manage/equipment/add/' + match.params.id} className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} />
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
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'marca'}>
                            Marca
                            {currentFilter.columnName == 'marca' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'modelo'}>
                            Modelo
                            {currentFilter.columnName == 'modelo' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'serie'}>
                            Número de serie
                            {currentFilter.columnName == 'serie' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'contrato'}>
                            Contrato
                            {currentFilter.columnName == 'contrato' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem', cursor: 'pointer'}} onClick={filterUsers} col={'vigencia'}>
                            Vigencia
                            {currentFilter.columnName == 'vigencia' ?
                                <FontAwesomeIcon icon={currentFilter.dir == 'asc' ? faSortAmountUp : faSortAmountDown} className="ms-2" />
                                : <></>}
                        </th>
                        <th className="text-center" style={{minWidth: '8rem'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((equipment, index) => {
                        return (
                            <tr key={index}>
                                <td>{equipment.marca}</td>
                                <td>{equipment.modelo}</td>
                                <td>{equipment.serie}</td>
                                <td className="text-center">
                                    <Badge pill bg={equipment.contrato ? 'success' : 'warning'}>
                                        {equipment.contrato ? 'SI' : 'NO'}
                                    </Badge>
                                </td>
                                <td className="text-center">{equipment.vigencia === "--" ? <Badge pill bg='warning'>No Aplica</Badge> : equipment.vigencia}</td>
                                <td className="text-center">
                                    <OverlayTrigger placement="left"
                                        overlay={<Tooltip>Editar Equipo</Tooltip>}>

                                        <a className="btn btn-outline-secondary text-center me-2"
                                            href={'/manage/equipment/edit/' + equipment.id}>
                                            <FontAwesomeIcon icon={faEdit} />
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

export default EquipmentTable;