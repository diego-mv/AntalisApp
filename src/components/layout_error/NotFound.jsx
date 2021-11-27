import React from "react";
import Layout from "../layout";

const NotFound = () => {
    return <Layout content={<NotFoundContent />} />;
}

const NotFoundContent = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound404">
                    <h3>UPS! Esta página no existe. ☹️</h3>
                    <h1>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                    
                </div>
                <h2>Lo sentimos, puede que esta página no exista o no esté disponible, siga navegando.</h2>
            </div>
        </div>
    );
}

export default NotFound;