import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import LoadingComments from "./LoadingComments";
import InputEmoji from 'react-input-emoji'
import Comment from "./Comment"
import Backend from "../../backend";
import OverlayAlertOnLoad from "../../layout/utils/overlay_alert_onload";
import OverlayAlert from "../../layout/utils/overlay_alert";
import { getCurrentFullname } from "../../../helpers/getData";


const CommentsOT = ({idOT, setAlert}) => {
    const [myName, setMyName] = useState(getCurrentFullname())
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([
    ]);
    const [newComment, setNewComment] = useState(0);

    useEffect(()=> {
        Backend.get('/OrdenTrabajo/getComentarios', {
            params: {
                idOT: idOT
            }
        })
        .then(res => {
            setComments(res.data.map( comment => {
                return {
                    fullname: (comment.fullname === myName ? "Yo" : comment.fullname),
                    role: comment.role,
                    datetime: comment.datetime,
                    text: comment.text
                }
            }));
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setAlert(<OverlayAlert
                variant="danger"
                message="Ocurrió un error cargando los comentarios. Por favor intente nuevamente más tarde"
                duration="4000"
            />);
        });
    }, [newComment])

    return loading ? <LoadingComments/> : <CommentsOTContent comments={comments} setNewComment={setNewComment} NewComment={newComment} idOT={idOT} setAlert={setAlert} setLoading={setLoading}/>
}

const CommentsOTContent = ({comments, idOT, setAlert, setNewComment, NewComment}) => {
    const handleComment = (e) => {
        setAlert(
            <OverlayAlertOnLoad
            duration="1000"
        />);
        

        if(e.trim()){
            Backend.post('/OrdenTrabajo/createComentario', {
                idOT: idOT,
                texto: e
            })
            .then(res => {
                setNewComment(NewComment+1);
            })
            .catch(err => {
                console.log(err)
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar agregar el comentario. Por favor intente nuevamente más tarde"
                    duration="4000"
                />);
            });
        }
    }

    return (
        
        <div className="card p-3 bg-white" style={{minHeight: '45rem', maxHeight: '80vh'}}>
            
            <div className="card mb-2 p-4 overflow-auto" style={{background: "#efedfc", minHeight: "45rem"}}>
                {
                    comments.map(com => (
                        <Comment key={com.datetime} fullname={com.fullname} role={com.role} datetime={com.datetime} text={com.text}/>
                    ))
                }
                {
                    comments.length === 0 
                        ? (
                            <span className="text-center text-bold" style={{marginTop: "20rem", color: "#7672a0"}}>Aún no hay comentarios... <br/> ¡Empieza tú!😁</span>
                        )
                        : null
                }
            </div>
            <div className="w-100">
                <InputEmoji cleanOnEnter placeholder="Agrega un comentario en la solicitud..." onEnter={handleComment} borderColor="#C6C7C8"/>                
            </div>
        </div>
    );
}

export default CommentsOT;