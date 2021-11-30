import moment from "moment";
import "moment/locale/es-mx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Backend from "../../backend";
import OverlayAlertOnLoad from "../../layout/utils/overlay_alert_onload";
import OverlayAlert from "../../layout/utils/overlay_alert";
import { Link } from "react-router-dom";

const ListRequest = ({ url }) => {
    const [requests, setRequests] = useState([]);
    const [pagination, setPagination] = useState(
        {
            itemsCount: "",
            pageIndex: "",
            pageSize: 4
        });
    const [alert, setAlert] = useState(null);
    const search_ref = useRef();
    moment().locale('es');

    const onSearch = () => {
        setAlert(<OverlayAlertOnLoad
            variant="info"
            duration="500"
        />);
        Backend.get(url, { 
            params:{
                Solicitud: search_ref.current.value,
                pageSize: pagination.pageSize
            }
        })
        .then(res => {
            
            setRequests(res.data.data);
            setPagination({
                ...
                {
                    itemsCount: res.data.itemsCount,
                    pageIndex: res.data.pageIndex,
                    pageSize: pagination.pageSize
                }
            });
        })
        .catch(err => {
            console.log(err);
            setAlert(<OverlayAlert
                variant="danger"
                message="Ha ocurrido un error. Intente nuevamente"
                duration="500"
            />);
        });
    };

    const handleChangePagination = (index) => {
        setAlert(<OverlayAlertOnLoad
            variant="info"
            duration="500"
        />);

        let params = {}

        if(search_ref.current.value !== ""){
            params = {
                Solicitud: search_ref.current.value,
                pageIndex: parseInt(index),
                pageSize: pagination.pageSize
            }
        }
        else{
            params = {
                pageIndex: parseInt(index),
                pageSize: pagination.pageSize
            }
        }
        Backend.get(url, { params
            
        })
        .then(res => {
            setRequests(res.data.data);
            setPagination({
                ...
                {
                    itemsCount: res.data.itemsCount,
                    pageIndex: res.data.pageIndex,
                    pageSize: pagination.pageSize
                }
            });
            
        })
        .catch(err => {
            console.log(err);
            setAlert(<OverlayAlert
                variant="danger"
                message="Ha ocurrido un error. Intente nuevamente"
                duration="500"
            />);
        });
    }

    useEffect(() => {
        setAlert(<OverlayAlertOnLoad
            variant="info"
            duration="500"
        />);
        Backend.get(url, {
            params:{
                pageSize: pagination.pageSize
            }
        })
        .then(res => {
            setRequests(res.data.data);
            setPagination({
                ...
                {
                    itemsCount: res.data.itemsCount,
                    pageIndex: res.data.pageIndex,
                    pageSize: pagination.pageSize
                }
            });
        })
        .catch(err => {
            console.log(err);
            setAlert(<OverlayAlert
                variant="danger"
                message="Ha ocurrido un error. Intente nuevamente"
                duration="500"
            />);
        });
    
    }, []);

    return (
        <div>
            {alert}
                <div className="col-12 col-md-6 input-group mb-3" style={{width: "22rem" , marginRight: "0px", marginLeft: "auto"}}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="buttonSearch" ref={search_ref} onKeyDown={e => e.key==="Enter" ? onSearch() : null}/>
                    <button className="btn btn-outline-secondary" type="button" id="buttonSearch" onClick={onSearch}>
                        <FontAwesomeIcon icon={faSearch} className="" />
                    </button>
                </div>
            
            {requests.map((request)=>(
                <div className="card mb-4" style={{minHeight:"15rem"}} key={request.id}>
                    <div className="card-body" style={{position: "relative"}}>
                        <h3 className="text-secondary h3-request">Solicitud <span className="text-primary">{request.marca} {request.modelo}</span> <span className="text-muted h3-span-request">Serie: {request.serie}</span></h3>
                        <hr/>
                        {request.estadoId === "79b12fb2-f9ff-4a7a-ba4a-0da48637442f" ? <span className="badge bg-info" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue ingresada en el sistema pero no ha sido atendida.">{request.estado}</span> : null}
                        {request.estadoId === "7b6aba68-70e6-4174-98b5-67232808b29d" ? <span className="badge bg-success" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue atendida y está en curso.">{request.estado}</span> : null}
                        {request.estadoId === "bc4edb94-0c87-4845-85a3-4b9317a2923e" ? <span className="badge bg-dark" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue completada y está cerrada.">{request.estado}</span> : null}
                        <div className="mt-2 text-bold" >
                            <p><span style={{color:"#3f3f3f"}}>Cliente: </span><span style={{color: "#727272"}}>{request.fullnameCliente} ({request.emailCliente}) </span></p>
                        </div>
                        <div className="text-muted dates-request" >
                            Fecha de creación: {moment(request.fechaCreacion).format("DD-MM-yyyy HH:mm")} 
                        </div>
                        <Link className="btn btn-primary float-btn-request text-bold" to={"/ot/create/"+request.id}>Atender</Link>
                    </div>
                </div>    
            
            
            ))}
            <div style={{width: "22rem" , marginRight: "0px", marginLeft: "auto"}}>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={pagination.pageIndex === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex-1))}>Anterior</button>
                        </li>
                        {
                            pagination.pageIndex !== 1 && pagination.pageIndex !== 2 ? 
                            (<li className="page-item" aria-current="page">
                                <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex-1))}>{pagination.pageIndex-2}</button>
                            </li>) 
                            : null
                        }
                        {
                            pagination.pageIndex !== 1 ? 
                            (<li className="page-item" aria-current="page">
                                <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex-1))}>{pagination.pageIndex-1}</button>
                            </li>) 
                            : null
                        }
                        <li className="page-item active" aria-current="page">
                        <button className="page-link" href="#">{pagination.pageIndex}</button>
                        </li>
                        {
                            pagination.pageIndex < Math.ceil(parseInt(pagination.itemsCount)/parseInt(pagination.pageSize)) ? 
                            (<li className="page-item" aria-current="page">
                                <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex+1))}>{pagination.pageIndex+1}</button>
                            </li>) 
                            : null
                        }
                        {
                            pagination.pageIndex < Math.ceil(parseInt(pagination.itemsCount)/parseInt(pagination.pageSize))-1? 
                            (<li className="page-item" aria-current="page">
                                <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex+1))}>{pagination.pageIndex+2}</button>
                            </li>) 
                            : null
                        }
                        <li className={pagination.pageIndex === parseInt(pagination.itemsCount)/parseInt(pagination.pageSize) || pagination.pageIndex >= parseInt(pagination.itemsCount)/parseInt(pagination.pageSize) ? "page-item disabled" : "page-item"}>
                            <button className="page-link" onClick={() => handleChangePagination(parseInt(pagination.pageIndex)+1)}>Siguiente</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ListRequest;