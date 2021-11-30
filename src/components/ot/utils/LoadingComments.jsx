import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComments = () => {
    return (
      <div style={{borderRadius: "5%", border: "1px solid #dddddd", background: "#F3F3F3"}}>
        <table style={{height: "40rem" , textAlign: "center", width: "100%"}}>
          <tbody>
            <tr>
              <td className="align-middle text-primary">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando comentarios
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    );
}

export default LoadingComments;