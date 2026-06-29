






"use client";

import { useEffect, useState } from "react";
import { Table, Button, Card, Spinner, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { getPersonal } from "@/services/personalServices";
import { getCompany } from "@/services/companyServices";
import Companyfrom from "./components/company/companyfrom";
import UserForm from "./components/user/userfrom";

export default function Home() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loadcomapany, setLoadcompany] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    loadcomapanydata()
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getPersonal();
      console.log(response)
      setUsers(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const loadcomapanydata = async () => {
    try {
      const response = await getCompany();

      console.log(response)
      setLoadcompany(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const [show, setShow] = useState(false);
  const [companyEdit, setCompanyEdit] = useState(null);

  const companyEditData = (item) => {
    setCompanyEdit(
      item,

    );

    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setCompanyEdit(null);
  };


  const [showPersonal, setShowPersonal] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(null);
  const personalEditData = (item) => {
    setPersonalEdit(item);
    setShowPersonal(true);
  };

  const closePersonalModal = () => {
    setShowPersonal(false);
    setPersonalEdit(null);
  };
  return (
    <div className="container py-5">

      <Card className="shadow border-0">

        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">

          <h3 className="mb-0">Employee Details</h3>

          <Button
            variant="light"
            onClick={() => router.push("/userfrom")}
          >
            Add Employee
          </Button>

        </Card.Header>

        <Card.Body>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table bordered hover responsive>

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        {user.firstName} {user.lastName}
                      </td>

                      <td>{user.email}</td>

                      <td>{user.phone}</td>

                      <td>{user.gender}</td>

                      <td>

                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => personalEditData(user)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                        >
                          Delete
                        </Button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>


            </Table>
          )}

        </Card.Body>
        <Modal
          show={showPersonal}
          onHide={closePersonalModal}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {personalEdit ? "Update Employee" : "Add Employee"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UserForm
              edit={personalEdit}
              onClose={closePersonalModal}
              reload={loadUsers}
            />
          </Modal.Body>
        </Modal>

      </Card>



      <Card className="shadow border-0">

        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Company Details</h4>

          <Button onClick={() => router.push("/company")}>
            Add Company
          </Button>
        </Card.Header>

        <Card.Body>

          <Table bordered hover responsive>

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>PAN Number</th>
                <th>GST Number</th>
                <th>Company Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loadcomapany.map((item, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>

                  <td>{item.companyName}</td>

                  <td>{item.panNumber}</td>

                  <td>{item.gstNumber}</td>

                  <td>{item.companyAddress}</td>

                  <td>



                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => companyEditData(item)}
                    >
                      Edit
                    </Button>

                    <Button size="sm" variant="danger">
                      Delete
                    </Button>

                  </td>


                </tr>

              ))}

            </tbody>



          </Table>
          <Modal
            show={show}
            onHide={closeModal}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {companyEdit ? "Update Company" : "Add Company"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Companyfrom
                edit={companyEdit}
                onClose={closeModal}
                reload={loadcomapanydata}
              />
            </Modal.Body>
          </Modal>

        </Card.Body>

      </Card>

    </div>
  );
}


