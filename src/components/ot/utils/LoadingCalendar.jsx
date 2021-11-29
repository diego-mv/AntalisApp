import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingCalendar = () => {
    return (
      <div style={{borderRadius: "5%", border: "1px solid #dddddd", background: "#F3F3F3"}}>
        <table style={{height: "4rem" , textAlign: "center", width: "100%"}}>
          <tbody>
            <tr>
              <td className="align-middle text-primary">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando agenda
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    );
}

export default LoadingCalendar;