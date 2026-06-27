
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import {
  Form,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    shouldUnregister: false,
  });

  
  const handleNext = async () => {
    const step1Fields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dob",
      "gender",
      "skills",
      "address",
    ];

    const valid = await trigger(step1Fields);

    if (valid) {
      toast.success("Step 1 completed!");
      setStep(2);
    } else {
      toast.error("Please fix errors in Personal Info");
    }
  };

  // FINAL SUBMIT
//  const onSubmit = async (data) => {
//   const step2Fields = [
//     "companyName",
//     "panNumber",
//     "gstNumber",
//     "companyAddress",
//   ];

//   const valid = await trigger(step2Fields);

//   if (!valid) {
//     toast.error("Please fix Company Info errors");
//     return;
//   }

//   try {
//     const response = await fetch("http://127.0.0.1:8000/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();

//     console.log(result);

//     toast.success(result.message);

//     setStep(1);

//   } catch (error) {
//     console.log(error);
//     toast.error("Submission Failed!");
//   }
// };

const onSubmit = async (data) => {
  const payload = {
    personalInformation: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      skills: data.skills,
      address: data.address,
    },

    companyInformation: {
      companyName: data.companyName,
      panNumber: data.panNumber,
      gstNumber: data.gstNumber,
      companyAddress: data.companyAddress,
    },
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/company/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    toast.success(result.message);
  } catch (err) {
    toast.error("Submission Failed");
  }
};

  const inputClass = "form-control";

  const ErrorText = ({ msg }) =>
    msg ? <small className="text-danger">{msg}</small> : null;

  return (
    <div className="d-flex justify-content-center py-4 rounded-5">
      <ToastContainer position="top-right" autoClose={2000} />

      <Card className="shadow-lg border-0  w-100" style={{ maxWidth: "700px" }}>

        {/* HEADER */}
        <div className="bg-gradient bg-primary  rounded-3 text-dark text-center p-4">
          
          <h2>
            {step === 1 ? "Personal Information" : "Company Information"}
          </h2>

          <ProgressBar
            now={step === 1 ? 50 : 100}
            className="mt-3"
            variant="success"
          />
        </div>

        <div className="p-4 bg-light">

      
          <div className="d-flex justify-content-between mb-4">

            <div className="d-flex align-items-center">
              <div className={`rounded-circle fw-bold text-white d-flex align-items-center justify-content-center ${
                step >= 1 ? "bg-success" : "bg-secondary"
              }`} style={{ width: 40, height: 40 }}>
                1
              </div>
              <span className="ms-2 fw-semibold">Personal</span>
            </div>

            <div className="flex-grow-1 mx-3 mt-3" style={{ height: 3, background: step > 1 ? "green" : "#ccc" }} />

            <div className="d-flex align-items-center">
              <div className={`rounded-circle fw-bold text-white d-flex align-items-center justify-content-center ${
                step >= 2 ? "bg-success" : "bg-secondary"
              }`} style={{ width: 40, height: 40 }}>
                2
              </div>
              <span className="ms-2 fw-semibold">Company</span>
            </div>

          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>

           
            {step === 1 && (
              <Row className="g-3">

                <Col md={6}>
                  <Form.Label>First Name</Form.Label>
                  <input className={inputClass} {...register("firstName", { required: "First name required" })} />
                  <ErrorText msg={errors.firstName?.message} />
                </Col>

                <Col md={6}>
                  <Form.Label>Last Name</Form.Label>
                  <input className={inputClass} {...register("lastName", { required: "Last name required" })} />
                  <ErrorText msg={errors.lastName?.message} />
                </Col>

                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <input className={inputClass} {...register("email", { required: "Email required" })} />
                  <ErrorText msg={errors.email?.message} />
                </Col>

                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <input className={inputClass} {...register("phone", { required: "Phone required" })} />
                  <ErrorText msg={errors.phone?.message} />
                </Col>

                <Col md={6}>
                  <Form.Label>DOB</Form.Label>
                  <Flatpickr
                    className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                    onChange={(date) =>
                      setValue("dob", date[0], { shouldValidate: true })
                    }
                  />
                  <ErrorText msg={errors.dob?.message} />
                </Col>

                <Col md={6}>
                  <Form.Label>Gender</Form.Label>
                  <select className={inputClass} {...register("gender", { required: "Gender required" })}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <ErrorText msg={errors.gender?.message} />
                </Col>

                <Col md={12}>
                  <Form.Label>Skills</Form.Label>
                  <input className={inputClass} {...register("skills", { required: "Skills required" })} />
                  <ErrorText msg={errors.skills?.message} />
                </Col>

                <Col md={12}>
                  <Form.Label>Address</Form.Label>
                  <textarea className={inputClass} rows={2} {...register("address", { required: "Address required" })} />
                  <ErrorText msg={errors.address?.message} />
                </Col>

                <Col md={12} className="text-end">
                  <Button onClick={handleNext} variant="primary">
                    Next →
                  </Button>
                </Col>

              </Row>
            )}

          
            {step === 2 && (
              <Row className="g-3">

                <Col md={6}>
                  <Form.Label>Company Name</Form.Label>
                  <input className={inputClass} {...register("companyName", { required: "Required" })} />
                  <ErrorText msg={errors.companyName?.message} />
                </Col>

                

                <Col md={6}>
                  <Form.Label>PAN Number</Form.Label>
                  <input className={inputClass} {...register("panNumber", { required: "Required" })} />
                  <ErrorText msg={errors.panNumber?.message} />
                </Col>

                <Col md={12}>
                  <Form.Label>GST Number</Form.Label>
                  <input className={inputClass} {...register("gstNumber", { required: "Required" })} />
                  <ErrorText msg={errors.gstNumber?.message} />
                </Col>

                <Col md={12}>
                  <Form.Label>Company Address</Form.Label>
                  <textarea className={inputClass} rows={3} {...register("companyAddress", { required: "Required" })} />
                  <ErrorText msg={errors.companyAddress?.message} />
                </Col>

                <Col md={12} className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                     Previous
                  </Button>

                  <Button type="submit" variant="success">
                    Submit 
                  </Button>
                </Col>

              </Row>
            )}

          </Form>
        </div>
      </Card>
    </div>
  );
}

