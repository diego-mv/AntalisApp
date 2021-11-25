import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState , useEffect} from "react";
import Layout from "../layout";
import ListRequest from "./utils/ListRequest";
import Backend from "../backend";
import LoadingContent from "../layout/loading_content";

const OtRequest = () => {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    

    useEffect(() => {
        Backend.get('/OrdenTrabajo/MisSolicitudes', {

        })
        .then(equipment => {
            setRequests(equipment.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    
    }, []);
    return loading ? <LoadingContent /> : <Layout content={<OtRequestContent requests={requests} />} />;
}

const OtRequestContent = ({requests}) => {
    return (
        <div className="card p-3 bg-white mx-auto" style={{minHeight: '20rem', minWidth: '20rem', maxWidth: "80rem"}}>
            <div className="px-2">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
                    Mis solicitudes
                </h4>
            </div>

            <hr className="my-3" />
            <ListRequest requests={requests}/>
        </div>
    );
}

export default OtRequest;