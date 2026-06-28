






"use client";

import { useEffect, useState } from "react";
import { Table, Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { getPersonal } from "@/services/personalServices";
import { getCompany } from "@/services/companyServices";

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
const [data,setData] =useState()

  const compaynedit =(data)=>{
    setData(data)

    router.push("/companyfrom")


  }

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

      </Card>



      <Card className="shadow border-0">

        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Company Details</h4>

          <Button onClick={() => router.push("/companyfrom")}>
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

                   

                    <Button size="sm" variant="warning"  onClick={()=>{compaynedit(item)}} className="me-2">
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

        </Card.Body>

      </Card>

    </div>
  );
}


