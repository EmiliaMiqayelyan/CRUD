import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { create } from "./dataSlice";

function CrudModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const [crud, setCrud] = useState({
    id: uuidv4(),
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const onTodoChange = (property, value) => {
    let newEdit = { ...crud };

    newEdit[property] = value;
    setCrud(newEdit);
  };

  const onSave = () => {
    dispatch(create(crud));

    setCrud({
      id: uuidv4(),
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });

    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CRUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstname"
                value={crud.firstname}
                placeholder="Enter your firstname..."
                onChange={(e) => onTodoChange("firstname", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastname"
                value={crud.lastname}
                placeholder="Enter your lastname..."
                onChange={(e) => onTodoChange("lastname", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={crud.email}
                placeholder="Enter your email..."
                onChange={(e) => onTodoChange("email", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                value={crud.phone}
                placeholder="Enter your phone..."
                onChange={(e) => onTodoChange("phone", e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CrudModal;
