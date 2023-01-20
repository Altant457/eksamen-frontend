import {Accordion} from "react-bootstrap"
import {useEffect, useState} from "react";
import facade from "../apiFacade.js";

const Events = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    facade.fetchData("/info/events", null, "GET", null, null)
        .then(res => {
          setEvents(res.all)
        })
  }, [])

  return (
      <>
        {events.length !== 0 ?
            <Accordion defaultActiveKey="0">
              {events.map(event => (
                  <Accordion.Item key={event.id} eventKey={event.id}>
                    <Accordion.Header>
                      Dish: {event.dish}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>Location: {event.location}</p>
                      <p>Date and time: {event.time}</p>
                      <p>Members joining: {event.assignments}</p>
                      <p>Price per member: {event.pricePerPerson}</p>
                    </Accordion.Body>
                  </Accordion.Item>
              ))}
            </Accordion> :
            <div>
              There are currently no events planned.
            </div>
        }
      </>
  )
}

export default Events
