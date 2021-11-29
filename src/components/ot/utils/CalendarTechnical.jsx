import React, {useState , useEffect, Fragment} from "react";
import {Calendar, momentLocalizer, dateFnsLocalizer  } from 'react-big-calendar'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import "moment/locale/es-mx";
import LoadingCalendar from "./LoadingCalendar";
import { Accordion } from "react-bootstrap";

const CalendarTechnical = ({technicalId}) => {
    const [loading, setLoading] = useState(true);

    
    const myEventsList = [
        {
          title: "HP Model 12345",
          start: new Date("2021/11/28 10:22:00"),
          end: new Date("2021/11/28 12:22:00"),
        },
        {
          title: "EPSON Model 12345",
          start: new Date("2021/11/30 10:22:00"),
          end: new Date("2021/11/30 12:22:00"),
        },
        {
          title: "Intel Model 12345",
          start: new Date("2021/11/30 12:30:00"),
          end: new Date("2021/11/30 17:22:00"),
        },
      ];

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000)

    }, []);
    
    return loading ? <LoadingCalendar/> : <CalendarContent myEventsList={myEventsList}/>;
}

const CalendarContent = ({myEventsList}) => {
  const localizer = momentLocalizer(moment);
  const MessagesCalendar = {
    next:"Siguiente",
    previous:"Atrás",
    today:"Ahora", 
    month: "Mes", 
    week: "Semana", 
    day: "Día", 
    yesterday: "Ayer", 
    tomorrow: "Mañana", 
    noEventsInRange: "No hay eventos en este rango."
  };
  return (
    <Accordion>
      <Accordion.Item eventKey="1">
          <Accordion.Header><span className="text-bold"><FontAwesomeIcon icon={faCalendar} className="me-2" /> Agenda Técnico</span></Accordion.Header>
          <Accordion.Body style={{height: 550}}>
            <Calendar className="p-2" localizer={localizer} events={myEventsList} 
              style={{ height: "100%",borderRadius: "2%", border: "1px solid #dddddd", background: "#F3F3F3" }} 
              messages={MessagesCalendar}  />
          </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );  
}

export default CalendarTechnical;