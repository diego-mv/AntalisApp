import {faUser, faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import LoadingContent from "./layout/loading_content";
import Backend from "./backend";
import OverlayAlert from "./layout/utils/overlay_alert";
import userIcon from "../img/user-icon-secondary.svg"
import { getCurrentRole, getCurrentUser } from "../helpers/getData";

const ConfigureAccount = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        const currentUser = getCurrentUser();
        const currentRole = getCurrentRole();

        if(currentRole === "Tecnico"){
            Backend.get('/Accounts/GetTecnico', {
                params: {
                IdUser: currentUser.id
                }
            })
            .then(user => {
                setUserData(user.data)
                setLoading(false);
                console.log(userData)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
        else{            
            setUserData(getCurrentUser())
            setLoading(false);
        }
    }, [reloadData]);

    return loading ? <LoadingContent /> : <Layout content={<ConfigureAccountContent userData = {userData}  setReloadData = {setReloadData}/>} />;
}

const ConfigureAccountContent = ({ userData, setReloadData }) => {
        const [alert, setAlert] = useState(null);
        const [toggleChangePass, setToggleChangePass] = useState(true);
        const [toggleEditAccount, setToggleEditAccount] = useState(false);
        console.log(userData);
        const changepass_ref = useRef(false);
        const dataAccount_ref = useRef();
        const editAccount_ref = useRef();

        const userName_ref = useRef();
        const userEmail_ref = useRef();
        const userPhone_ref = useRef();
        const oldPass_ref = useRef();
        const newPass_ref = useRef();
        const confirmPass_ref = useRef();

        // const clientRegion_ref = useRef();
        // const clientComuna_ref = useRef();
        // const clientCity_ref = useRef();
        // const clientAddress_ref = useRef();


        const trimFields = () => {
            document.querySelectorAll('.field').forEach(elem => {
                elem.value = elem.value.trim();
            });
        }

        const handleChangePass = () => {
            setToggleChangePass(!toggleChangePass);
            switch(toggleChangePass) {
                case false:
                    changepass_ref.current.classList.remove('d-none');
                    changepass_ref.current.classList.add('d-none');
                    break;
                case true:
                    changepass_ref.current.classList.add('d-none');
                    changepass_ref.current.classList.remove('d-none');
                    break;
                default:
                    changepass_ref.current.classList.add('d-none');
                    changepass_ref.current.classList.add('d-none');
                    break;
            }
        }

        const handleEditAccount = () => {
            setToggleEditAccount(!toggleEditAccount);
            switch(toggleEditAccount) {
                case false:
                    dataAccount_ref.current.classList.remove('d-none');
                    dataAccount_ref.current.classList.add('d-none');

                    editAccount_ref.current.classList.add('d-none');
                    editAccount_ref.current.classList.remove('d-none');
                    break;
                case true:
                    dataAccount_ref.current.classList.add('d-none');
                    dataAccount_ref.current.classList.remove('d-none');

                    editAccount_ref.current.classList.remove('d-none');
                    editAccount_ref.current.classList.add('d-none');
                    break;
                default:
                    changepass_ref.current.classList.add('d-none');
                    changepass_ref.current.classList.add('d-none');
                    break;
            }
        }
        
        const SubmitChangePass = (event) => {
            event.preventDefault();
            trimFields();

            const patternPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;¡ñ])(?=.{6,})");
            let alert_required = false;
            const required_fields = [oldPass_ref, newPass_ref, confirmPass_ref];
            required_fields.map(field => {
                field.current.classList.remove('required-field');
                if(!field.current.value) {
                    alert_required = true;
                    field.current.classList.add('required-field');
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
            if(newPass_ref.current.value !== confirmPass_ref.current.value){
                setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="Los campos contraseña nueva y confirmar contraseña deben ser iguales"
                        duration="3000"
                    />
                );
                return;
            }
            if(!patternPass.test(newPass_ref.current.value)){
                setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La contraseña debe cumplir con los requisitos mencionados"
                        duration="3000"
                    />
                );
                return;
            }
            Backend.post('/Auth/ChangePassword', {
                currentPassword: oldPass_ref.current.value,
                newPassword: newPass_ref.current.value,
                confirmNewPassword: confirmPass_ref.current.value
            })
            .then(res => {
                oldPass_ref.current.value = "";
                newPass_ref.current.value = "";
                confirmPass_ref.current.value = "";
                setAlert(
                <OverlayAlert
                        variant="success"
                        message="La contraseña se ha actualizado correctamente"
                        duration="3000"
                    />
                );
            })
            .catch(err => {
                if(err.response.data.errors.includes("Optimistic concurrency failure, object has been modified.")){
                    setAlert(
                        <OverlayAlert
                                variant="success"
                                message="La contraseña se ha actualizado correctamente"
                                duration="3000"
                            />
                        );
                    return;
                }
                else if(err.response.data.errors.includes("Incorrect password.")){
                    setAlert(
                        <OverlayAlert
                            variant="danger"
                            message="La contraseña actual no es correcta."
                            duration="3000"
                        />);
                    return;
                }
                else if(err.response.data.errors.includes("Passwords must have at least one non alphanumeric character.")){
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La nueva contraseña debe tener almenos un caracter especial (!¡@#$%)"
                        duration="3000"
                    />);
                    return;
                }
                else if(err.response.data.errors.includes("Passwords must have at least one digit ('0'-'9').")){
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La contraseña debe tener al menos un dígito"
                        duration="3000"
                    />);
                    return;
                }
                else if(err.response.data.errors.includes("Passwords must have at least one uppercase ('A'-'Z').")){
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La contraseña debe tener al menos una letra mayúscula"
                        duration="3000"
                    />);
                    return;
                }
                else if(err.response.data.errors.includes("Passwords must have at least one lowercase ('a'-'z').")){
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La contraseña debe tener al menos una letra minúscula"
                        duration="3000"
                    />);
                    return;
                }
                else if(err.response.data.errors.includes("Passwords must be at least 6 characters.")){
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="La contraseña debe tener al menos un largo de 6 carácteres"
                        duration="3000"
                    />);
                    return;
                }
                else{
                    setAlert(
                    <OverlayAlert
                        variant="danger"
                        message="Ha ocurrido un error mientras se intentaba cambiar la contraseña, intente nuevamente"
                        duration="3000"
                    />);
                }
            });

        });
        }

        const submitForm = (event) => {
        event.preventDefault();
        trimFields();
        setAlert(
            <OverlayAlert
                variant="info"
                message="Cargando..."
                duration="3000"
            />
        );

        let alert_required = false;

        const required_fields = [userEmail_ref, userPhone_ref];
        required_fields.map(field => {
            field.current.classList.remove('required-field');
            if(!field.current.value) {
                alert_required = true;
                field.current.classList.add('required-field');
            }
        });

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
        Backend.post('/Accounts/EditMyAccount', {
            email: userEmail_ref.current.value,
            phone: userPhone_ref.current.value
            })
            .then(res => {
                Backend.get('/Accounts/currentUser', {
                })
                .then(_user => {
                    let user = _user.data;
                    localStorage.setItem('current_user', JSON.stringify(user));
                });
                userData.email = userEmail_ref.current.value;
                userData.phone = userPhone_ref.current.value;
                setAlert(<OverlayAlert
                    variant="success"
                    message="Se han cambiado los datos correctamente"
                    duration="3000"
                />);
                // setInterval( () => {
                //     history.push("/manage/customers")
                // }, 3000 )
                handleEditAccount()

            })
            .catch(err => {
                setAlert(<OverlayAlert
                    variant="danger"
                    message="Ocurrió un error al intentar editar sus datos. Por favor intente nuevamente más tarde"
                    duration="3000"
                />);
            });
    }

    return (
        <div>
            {alert}
            <div className="card p-4 bg-white mx-auto" style={{maxWidth: '30rem'}}>
                <div className="px-2">
                    <h4 className="mb-0 text-bold">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Mi cuenta
                    </h4>
                </div>

                <hr className="my-3" />
                <div className="mb-3" style={{textAlign: "center"}} ref={dataAccount_ref}>
                    <img className="mb-3" src={userIcon} alt="Logo" width="100" style={{color: "#ffff"}}/>
                    <div className="mb-4" style={{lineHeight: "0.8"}}>
                        <p style={{fontWeight: "bold"}}>Nombre</p>
                        <p className="pl-4 d-block">{userData.fullname}</p>
                    </div>
                    <div className="mb-3" style={{lineHeight: "0.8"}}>
                        <p style={{fontWeight: "bold"}}>Correo electrónico</p>
                        <p className="pl-4 d-block">{userData.email}</p>
                    </div>
                    <div className="mb-3" style={{lineHeight: "0.8"}}>
                        <p style={{fontWeight: "bold"}}>Télefono</p>
                        <p className="pl-4 d-block">{userData.phone ? userData.phone : "Sin datos"}</p>
                    </div>
                    {
                        userData.role == "TECNICO" && userData.esExterno === true ? 
                        (
                            <div className="mb-3" style={{lineHeight: "0.8"}}>
                                <p style={{fontWeight: "bold"}}>Empresa</p>
                                <p className="pl-4 d-block">{userData.empresa ? userData.empresa : "Sin datos"}</p>
                            </div>
                        )
                        :null
                    }

                    <div className="d-grid mt-5">
                        <button className="btn btn-primary" type="button" onClick={handleEditAccount}>
                        <FontAwesomeIcon icon={faEdit} className="me-2" />Editar cuenta
                        </button>
                    </div>
                </div>

                <form onSubmit={submitForm} className="mb-3 d-none" ref={editAccount_ref}>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" name="userEmail" className="form-control field" ref={userEmail_ref} defaultValue={userData.email}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="userPhone" maxLength="30" className="form-control field" ref={userPhone_ref} defaultValue={userData.phone}/>
                    </div>
                    <div className="d-grid">
                        <input type="submit" className="btn btn-primary" value="Confirmar cambios" />
                    </div>
                    <a className="link-primary mt-3 d-block" style={{cursor:"pointer"}} onClick={handleEditAccount}> <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Cancelar cambios</a>
                </form>
                
                <p className="d-grid">
                    <button className="btn btn-block text-white" type="button" onClick={handleChangePass} style={{background: "#5A6268"}}>
                        Cambiar contraseña
                    </button>
                </p>
                <div className="d-none" ref={changepass_ref} >
                    <form className="card card-body" onSubmit={SubmitChangePass}>
                        <div className="mb-3">
                            <label className="form-label">Contraseña actual</label>
                            <input type="password" name="userPhone" maxLength="30" className="form-control field" ref={oldPass_ref}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña nueva</label>
                            <input type="password" name="userPhone" maxLength="30" className="form-control field" ref={newPass_ref}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirme nueva contraseña</label>
                            <input type="password" name="userPhone" maxLength="30" className="form-control field" ref={confirmPass_ref}/>
                        </div>
                        <div className="d-grid">
                            <input type="submit" className="btn btn-secondary" value="Cambiar" />
                        </div>
                        <small className="text-muted mt-3">La contraseña debe contener al menos:</small>
                        <ul className="text-muted">
                            <li><small>Un largo mínimo de 6 carácteres</small></li>
                            <li><small>Una letra mayúscula</small></li>
                            <li><small>Una letra minúscula</small></li>
                            <li><small>Un carácter especial</small></li>
                            <li><small>Un número</small></li>
                        </ul>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ConfigureAccount;