import moment from "moment";
import "moment/locale/es-mx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Backend from "../../backend";
import OverlayAlertOnLoad from "../../layout/utils/overlay_alert_onload";
import OverlayAlert from "../../layout/utils/overlay_alert";
import { Link } from "react-router-dom";

const ListRequestClient = ({ url , parameters}) => {
    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(null);
    moment().locale('es')
    const search_ref = useRef();

    const onSearch = () => {
        setAlert(<OverlayAlertOnLoad
            variant="info"
            duration="500"
        />);
        Backend.get(url, { 
            params:{
                Solicitud: search_ref.current.value
            }
        })
        .then(res => {

            setRequests(res.data);
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

    useEffect(() => {
        setAlert(<OverlayAlertOnLoad
            variant="info"
            duration="500"
        />);
        Backend.get(url, parameters)
        .then(res => {
            console.log(res.data);
            setRequests(res.data);
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
            <div className="w-100" style={{position: "relative"}}>
                <div className="input-group mb-3" style={{width: "22rem" , marginRight: "0px", marginLeft: "auto"}}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="buttonSearch" ref={search_ref} onKeyDown={e => e.key==="Enter" ? onSearch() : null}/>
                    <button className="btn btn-outline-secondary" type="button" id="buttonSearch" onClick={onSearch}>
                        <FontAwesomeIcon icon={faSearch} className="" />
                    </button>
                </div>
            </div>
            {requests.map((request)=>(
                <div className="card mb-4" style={{minHeight:"15rem"}} key={request.id}>
                    <div className="card-body" style={{position: "relative"}}>
                        <h3 className="text-secondary h3-request">Solicitud <span className="text-primary">{request.marca} {request.modelo}</span> <span className="text-muted h3-span-request">Serie: {request.serie}</span></h3>
                        <hr/>
                        {request.estadoId === "79b12fb2-f9ff-4a7a-ba4a-0da48637442f" ? <span className="badge bg-info" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue ingresada en el sistema pero no ha sido atendida.">{request.estado}</span> : null}
                        {request.estadoId === "7b6aba68-70e6-4174-98b5-67232808b29d" ? <span className="badge bg-success" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue atendida y está en curso.">{request.estado}</span> : null}
                        {request.estadoId === "bc4edb94-0c87-4845-85a3-4b9317a2923e" ? <span className="badge bg-dark" style={{fontSize:"1rem", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="La solicitud ya fue completada y está cerrada.">{request.estado}</span> : null}

                        <div className="text-muted dates-request" >
                            Fecha de creación: {moment(request.fechaCreacion).format("DD-MM-yyyy HH:mm")} 
                        </div>

                        <Link className="btn btn-primary float-btn-request" to={request.estadoId === "79b12fb2-f9ff-4a7a-ba4a-0da48637442f" ? `/otrequest/view/${request.id}` : `/ot/view/${request.id}`}>Abrir</Link>
                    </div>
                </div>    
            
            
            ))}
        </div>
    );
}

export default ListRequestClient;