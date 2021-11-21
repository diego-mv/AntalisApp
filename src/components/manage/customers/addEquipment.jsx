import { faArrowLeft, faUserPlus, faLaptopHouse} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout";
import LoadingContent from "../../layout/loading_content";
import Backend from "../../backend";
import OverlayAlert from "../../layout/utils/overlay_alert";
import { useHistory } from "react-router";

const AddEquipment = ({ match }) => {
    const [loading, setLoading] = useState(true);
    const [nameCustomer, setNameCustomer] = useState("");

    useEffect(() => {
        Backend.get('/Accounts/getUser', {
            params: {
                IdUser: match.params.id
            }
        })
        .then(res => {
            setNameCustomer(res.data.fullname)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return loading ? <LoadingContent /> : <Layout content={<AddEquipmentForm match={match} name={nameCustomer}/>} />;
}

const AddEquipmentForm = ({ match, name}) => {
    const history = useHistory();
    const brand_ref = useRef();
    const model_ref = useRef();
    const serie_ref = useRef();
    const contract_ref = useRef();
    const contractVig_ref = useRef();
    const contractVigShow_ref = useRef();

    const [alert, setAlert] = useState(null);

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    const trimFields = () => {
        document.querySelectorAll('.field').forEach(elem => {
            elem.value = elem.value.trim();
        });
    }

    const handleHasContract = (event) => {
        if(event.target.checked) {
            contractVigShow_ref.current.classList.remove('d-none');
        } else {
            contractVigShow_ref.current.classList.add('d-none');
        }
    }

    const submitEquipment = (event) => {
        event.preventDefault();
        trimFields();

        let parameters = {}
        let alert_required = false;

        if(contract_ref.current.checked){
            const required_fields = [brand_ref, model_ref, serie_ref, contractVig_ref];
            required_fields.map(field => {
                field.current.classList.remove('required-field');
                if(!field.current.value) {
                    alert_required = true;
                    field.current.classList.add('required-field');
                }
            });
            parameters = {
                marca: brand_ref.current.value,
                modelo: model_ref.current.value,
                serie: serie_ref.current.value,
                contrato: contract_ref.current.checked,
                vigencia:  contractVig_ref.current.value,
                clienteId: match.params.id
            }
        }
        else{
            const required_fields = [brand_ref, model_ref, serie_ref];
            required_fields.map(field => {
                field.current.classList.remove('required-field');
                if(!field.current.value) {
                    alert_required = true;
                    field.current.classList.add('required-field');
                }
            });
            parameters = {
                marca: brand_ref.current.value,
                modelo: model_ref.current.value,
                serie: serie_ref.current.value,
                contrato: contract_ref.current.checked,
                clienteId: match.params.id
            }
        }

        if(alert_required) {
            setAlert(
                <OverlayAlert
                    variant="danger"
                    message="Debes llenar los campos requeridos"
                    duration="3000"
                />
            );
            return;
        }        
        Backend.post('/OrdenTrabajo/CreateEquipo', parameters)
            .then(res => {
                setAlert(<OverlayAlert
                    variant="success"
                    message="El equipo ha sido agregado correctamente"
                    duration="3000"
                />);
                // setInterval( () => {
                //     history.push("/manage/customers")
                // }, 3000 )

                brand_ref.current.value = ""
                model_ref.current.value = ""
                serie_ref.current.value = ""
                contract_ref.current.value = ""
                contractVig_ref.current.checked = ""
            })
            .catch(err => {
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar agregar el equipo. Por favor intente nuevamente más tarde"
                    duration="3000"
                />);
            });
        
    }

    return (
        <div>
            {alert}
            <div className="my-2">
                <a className="link-primary" href="/manage/customers">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Volver atrás
                </a>
            </div>
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '30rem'}}>
                <div className="px-2">
                    <h4 className="mb-0">
                        <FontAwesomeIcon icon={faLaptopHouse} className="me-2" />
                        <strong className="text-primary">{name}</strong><br/> 
                        <p className="text-muted">Agregar equipo</p>       
                    </h4>
                </div>

                <hr className="my-3" />

                <form onSubmit={submitEquipment}>
                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input type="text" name="brand" maxLength="50" className="form-control field" ref={brand_ref} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Modelo</label>
                        <input type="text" name="model" className="form-control field" ref={model_ref} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de Serie</label>
                        <input type="text" name="serie" maxLength="30" className="form-control field" ref={serie_ref} />
                    </div>
                    <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="contractCheck" ref={contract_ref} onChange={handleHasContract} />
                            <label className="form-check-label" Htmlfor="contractCheck">¿Con contrato?</label>
                    </div>
                    <div className="mb-3 d-none" ref={contractVigShow_ref}>
                        <label className="form-label">Vigencia</label>
                        <input type="date" name="vigencia" maxLength="30" className="form-control field" ref={contractVig_ref} />
                    </div>

                    <div className="d-grid">
                        <input type="submit" className="btn btn-primary" value="Confirmar" />
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddEquipment;