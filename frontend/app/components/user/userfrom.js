"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { savePersonal, updatePersonal } from "@/services/personalServices";
import { useRouter } from "next/navigation";

export default function UserForm({ edit, onClose, reload }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    
    
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // ✅ PREFILL DATA (EDIT MODE)
  useEffect(() => {
    if (edit) {
      reset({
        firstName: edit.firstName,
        lastName: edit.lastName,
        email: edit.email,
        phone: edit.phone,
        dob: edit.dob,
        gender: edit.gender,
        skills: edit.skills,
        address: edit.address,
      });
    }
  }, [edit, reset]);

  // ✅ SUBMIT (ADD + UPDATE)
  const onSubmit = async (data) => {
    try {
      if (edit?.id) {
        await updatePersonal(edit.id, data);
        toast.success("Updated Successfully");
      } else {
        await savePersonal(data);
        toast.success("Saved Successfully");
      }

      reload;
      onClose;
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const ErrorText = ({ msg }) =>
    msg ? <small className="text-danger">{msg}</small> : null;

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #eef2ff, #f8fafc, #dbeafe)" }}>

      <ToastContainer position="top-right" autoClose={2000} />

      <Card className="border-0 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "950px", width: "100%" }}>

        {/* HEADER (same UI) */}
        <div className="text-white text-center p-5"
          style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>

          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow"
            style={{ width: 60, height: 60, fontSize: 35 }}>
            👤
          </div>

          <h2 className="fw-bold mb-2">
            {edit ? "Update Personal Information" : "Personal Information"}
          </h2>

          <p className="mb-1 text-white-50">
            Fill all required employee information
          </p>

        </div>

        <Card.Body className="p-5">

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-4">

              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    {...register("firstName", { required: "Required" })}
                    placeholder="Enter First Name"
                  />
                  <ErrorText msg={errors.firstName?.message} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    {...register("lastName", { required: "Required" })}
                    placeholder="Enter Last Name"
                  />
                  <ErrorText msg={errors.lastName?.message} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", { required: "Required" })}
                  />
                  <ErrorText msg={errors.email?.message} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    {...register("phone", { required: "Required" })}
                  />
                  <ErrorText msg={errors.phone?.message} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>DOB</Form.Label>

                  <input type="hidden" {...register("dob")} />

                  <Flatpickr
                    className="form-control"
                    options={{ dateFormat: "Y-m-d" }}
                    onChange={(date, str) => setValue("dob", str)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select {...register("gender")}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Skills</Form.Label>
                  <Form.Control {...register("skills")} />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={3} {...register("address")} />
                </Form.Group>
              </Col>

              <Col md={12} className="d-flex justify-content-between mt-3">

                <Button variant="outline-secondary" onClick={() => router.back()}>
                  ← Previous
                </Button>

                <Button type="submit" className="px-4">
                  {edit ? "Update" : "Save"}
                </Button>

              </Col>

            </Row>
          </Form>

        </Card.Body>
      </Card>
    </div>
  );
}