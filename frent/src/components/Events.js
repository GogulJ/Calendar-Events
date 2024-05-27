import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import './Events.css';

export default function Events() {
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setDate] = useState(false);
  const [description, setDescription] = useState(false);

  function update(d){
    axios.put(`http://localhost:5000/update/${d}`, {date, description})
    .catch(err =>{
      console.log(err);
    });
    window.location.reload();
  }
  function det(d){
    axios.delete(`http://localhost:5000/delete/${d}`);
    window.location.reload();
  }
  function datefunction(e){
    setDate(e.target.value);
  }
  function descriptionfunction(e){
    setDescription(e.target.value);
  } 
  useEffect(() => {
    axios.get("http://localhost:5000/events").then(response => {
      setdata(response.data.events);
      console.log(data)
    }).catch(err => {
      console.log(err);
    })
  },[data])
  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {
          data.map((item, i) => (
            <div>
              <Col key={i}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.date.slice(0,10)}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <button onClick={handleShow} className='card-button'>Edit</button>
                    <button onClick={()=>{det(item.id)}} className='card-button' style={{backgroundColor:'red'}}>Delete</button>
                  </Card.Body>
                </Card>
              </Col>
              <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="email" onChange={datefunction} placeholder="Enter your Date" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Event</Form.Label>
                      <Form.Control type="text" onChange={descriptionfunction} placeholder="Enter your event Description" />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={()=>{update(item.id)}}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ))}
      </Row>
    </div>
)}