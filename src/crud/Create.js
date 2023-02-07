import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./create.css";
import { remove, edit } from "./dataSlice";
import { v4 as uuidv4 } from "uuid";
import CrudModal from "./CrudModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Create() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [crud, setCrud] = useState({
    id: uuidv4(),
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const crudlist = useSelector((state) => state.value);
  const dispatch = useDispatch();

  const onRemove = (id) => {
    dispatch(remove(id));
  };

  const onEdit = (editedCrud) => {
    setShow(true);
    setCrud(editedCrud);
  };

  const onSave = () => {
    dispatch(edit(crud));

    setCrud({
      id: uuidv4(),
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });

    setShow(false);
  };

  const onTodoChange = (property, value) => {
    let newEdit = { ...crud };

    newEdit[property] = value;
    setCrud(newEdit);
  };

  return (
    <div className="crud">
      <div>
        <CrudModal />
      </div>

      <table className="crud-table">
        <thead className="crud-thead">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {crudlist.map((crud) => (
          <tbody className="crud-tbody" key={crud.id}>
            <tr>
              <td>{crud.firstname}</td>
              <td>{crud.lastname}</td>
              <td>{crud.email}</td>
              <td>{crud.phone}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(crud)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onRemove(crud.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <>
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
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Create;
