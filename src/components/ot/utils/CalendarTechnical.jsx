import React, {useState , useEffect, Fragment} from "react";
import {Calendar, momentLocalizer, dateFnsLocalizer  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import "moment/locale/es-mx";

const CalendarTechnical = ({technicalId}) => {
    const [loading, setLoading] = useState(true);
    
    const localizer = momentLocalizer(moment)
    const myEventsList = [
        {
          title: "",
          start: new Date("2021/11/28 10:22:00"),
          end: new Date("2021/11/28 12:22:00"),
        },
        {
          title: "string",
          start: new Date("2019-05-05 12:22:00"),
          end: new Date("2019-05-05 13:42:00"),
        },
      ]
    
    return (
        <Calendar className="mt-4 mb-4" localizer={localizer} view={"month"} defaultView={"month"} events={myEventsList} style={{ height: 500 }} />
    );
}

export default CalendarTechnical;