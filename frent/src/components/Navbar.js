import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './Navbar.css'; 

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date()); 
  const [description, setDescription] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const add = () => {
    axios.post('http://localhost:5000/events', { date, description })
      .then(() => {
        window.location.reload(); 
      })
      .catch(err => {
        console.error('Error adding event:', err);
      });
  };
  function datefunction(selectedDate) {
    setDate(selectedDate);
  }
  const descriptionFunction = e => {
    setDescription(e.target.value);
  };
  return (
    <div className="navbar">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <br />
              <DatePicker
                selected={date}
                onChange={datefunction}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Event</Form.Label>
              <Form.Control
                type="text"
                onChange={descriptionFunction}
                placeholder="Enter your event Description"
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={add}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <div className='d-flex w-25 justify-content-around'>
        <div onClick={() => { window.location.href = '/events' }} className="calendar-events">Calendar Events</div>
        <div onClick={() => { window.location.href = '/' }}>Home</div>
      </div>
      <div className="links-nav">
        <div><button variant="primary" onClick={handleShow}>Add events</button></div>
      </div>
    </div>
  );
};
export default Navbar;