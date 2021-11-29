import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState , useEffect, Fragment} from "react";
import Layout from "../layout";
import Backend from "../backend";
import LoadingContent from "../layout/loading_content";
import ButtonBack from "../layout/ButtonBack";
import Select from "react-select";
import customStyleSelect from "../layout/utils/custom_style_select";
import CalendarTechnical from "./utils/CalendarTechnical";

const CreateOT = () => {
    const [loading, setLoading] = useState(true);
    const [technicals, setTechnicals] = useState([]);

    useEffect(() => {
        Backend.get('/Accounts/getTecnicos', {})
        .then(res => {
            setTechnicals(res.data.data.map(tec => {
                return {
                    value: tec.id,
                    label: `${tec.fullname} (${tec.email})`,
                    technical: tec.fullname
                }
            }));

            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);
    
    return loading ? <LoadingContent /> : <Layout content={<CreateOTContent technicals={technicals}/>} />;
}

const CreateOTContent = ({technicals}) => {
    const [technicalAsiggned, setTechnicalAssigned] = useState("");

    const HandleTechnical = (e) => {
        console.log(e.value);
        setTechnicalAssigned(e.value);
    }

    return (
        <Fragment>
            <ButtonBack to="/otrequest/pending" />
            <div className="card p-3 bg-white mx-auto" style={{minHeight: '20rem', minWidth: '20rem', maxWidth: "45rem"}}>
                <div className="px-2">
                    <h4 className="mb-0 text-bold">
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        Crear orden de trabajo
                    </h4>
                </div>
                <hr className="my-3" />
                <form className="m-4">
                    <div className="mb-3">
                        <label className="form-label"></label>
                        <input type="text" maxLength="50" className="form-control field"  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo de actividad</label>
                        <select className="form-select">
                            <option defaultValue>Seleccione el tipo de actividad...</option>
                            <option value="1">Actividad 1</option>
                            <option value="2">Actividad 2</option>
                            <option value="3">Actividad 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Técnico</label>
                        <Select options={technicals} styles={customStyleSelect} onChange={HandleTechnical}
                            placeholder={'Seleccione un tecnico para asignar OT'} isSearchable={false} noOptionsMessage={() => 'Sin resultados'}
                        />
                    </div>
                    
                    {technicalAsiggned !== "" ? <CalendarTechnical technicalId={technicalAsiggned}/> : null}

                </form>
            </div>
        </Fragment>
    );
}

export default CreateOT;