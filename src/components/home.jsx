import { faFacebook, faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getCurrentUser } from "../helpers/getData";
import Layout from "./layout";

const Home = () => {
    return <Layout content={<HomeContent />} />;
}

const HomeContent = () => {
    const currentUser = getCurrentUser();
    return (
        <div className="row p-4 justify-content-center">
            {alert}
            <h1 className="text-secondary text-center text-bold">¡BIENVENIDO <span className="text-primary">{currentUser.fullname.toUpperCase()}</span>!</h1>
            <div className="card col-12 col-md-5 m-3" style={{minHeight: "20rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-primary"><span className="text-secondary">Video:</span> ¿Sabía qué?</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Descubre por qué la industria del papel es una de las industrias más eco-responsable y contribuye a la reforestación. ¿Quieres saber más?</h6>
                    <div className="video-responsive">
                        <iframe src='https://www.youtube.com/embed/WSXhkV3FNqI'
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            title='video'
                        />
                    </div>
                </div>
            </div>
            <div className="card col-12 col-md-5 m-3" style={{minHeight: "15rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-primary">Card 2</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Subtitulo</h6>
                    
                    
                   
                </div>
            </div>
            <div className="card col-12 col-md-6 m-3" style={{minHeight: "15rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-primary">Card 1</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Subtitulo</h6>
                    
                   
                   
                </div>
            </div>
            <div className="card col-12 col-md-4 m-3" style={{minHeight: "15rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-primary">Síguenos</h3>
                    <h6 className="card-subtitle mb-2 text-muted">En nuestras redes sociales</h6>
                    
                    <div className="mt-5" style={{width:"100%", textAlign: "center", lineHeight: "100px"}}>
                        <a href="https://www.linkedin.com/company/antalis/" target="_blank" rel="noreferrer" className="card-link text-secondary"><FontAwesomeIcon size="3x" icon={faLinkedin} /></a>
                        <a href="https://twitter.com/Antalischile" target="_blank" rel="noreferrer" className="card-link text-secondary"><FontAwesomeIcon size="3x" icon={faTwitter} /></a>
                        <a href="https://www.facebook.com/AntalisChile/" target="_blank" rel="noreferrer" className="card-link text-secondary"><FontAwesomeIcon size="3x" icon={faFacebook} /></a>
                        <a href="https://www.instagram.com/antalischile/?hl=es" target="_blank" rel="noreferrer" className="card-link text-secondary"><FontAwesomeIcon size="3x" icon={faInstagram} /></a>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Home;