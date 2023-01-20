import {Accordion, Button, Form} from "react-bootstrap";
import {useState} from "react"
import facade from "../apiFacade.js";

const Admin = () => {

  const [newEvent, setNewEvent] = useState({})
  const [errors, setErrors] = useState({})

  const addEvent = (evt) => {
    evt.preventDefault()
    const newErrors = findFormErrors()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      facade.fetchData("/info/event/add", null, "POST", newEvent, null)
          .then(() => alert("Successfully added the event"))
    }
  }

  const findFormErrors = () => {
    const {time, pricePerPerson} = newEvent
    const newErrors = {}
    // time errors
    if (!/\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/g.test(time)) newErrors.time = "yyyy-mm-dd hh:mm"
    // price errors
    if (pricePerPerson < 0) newErrors.pricePerPerson = "Please input a positive number"
    return newErrors
  }

  const setField = (field, value) => {
    setNewEvent({...newEvent, [field]: value})
    if (!!errors[field]) setErrors({...errors, [field]: null})
  }

  return (
      <>
        <Accordion>
          <Accordion.Item eventKey={"1"}>
            <Accordion.Header>
              Add new dinner event
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={addEvent}>
                <Form.Group className="mb-3" controlId="formDish">
                  <Form.Label>Dish</Form.Label>
                  <Form.Control type="text" onChange={e => setField('dish', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" onChange={e => setField('location', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTime">
                  <Form.Label>Date and time</Form.Label>
                  <Form.Control type="text"
                                onChange={e => setField('time', e.target.value + ":00")}
                                isInvalid={!!errors.time}
                                placeholder={"yyyy-mm-dd hh:mm"} />
                  <Form.Control.Feedback type='invalid'>
                    {errors.time}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price per person (DKK)</Form.Label>
                  <Form.Control type="number" step={0.01} min={0} onChange={e => setField('pricePerPerson', e.target.value)} isInvalid={!!errors.pricePerPerson} />
                  <Form.Control.Feedback type='invalid'>
                    {errors.pricePerPerson}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add event
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
  )
}

export default Admin
