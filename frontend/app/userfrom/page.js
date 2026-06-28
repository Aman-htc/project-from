
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
import { saveCompany } from "@/services/companyServices";
import { savePersonal } from "@/services/personalServices";
import { useRouter } from "next/navigation";

export default function MultiStepForm({ data = 2 }) {
    const router = useRouter();
    const [step, setStep] = useState(data);

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        shouldUnregister: false,
    });


    const handleNext = async () => {
        const valid = await trigger([
            "firstName",
            "lastName",
            "email",
            "phone",
            "dob",
            "gender",
            "skills",
            "address",
        ]);

        if (!valid) return;

        const personalData = {
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            email: getValues("email"),
            phone: getValues("phone"),
            dob: getValues("dob"),
            gender: getValues("gender"),
            skills: getValues("skills"),
            address: getValues("address"),
        };
        console.log(personalData)

        try {
            const result = await savePersonal(personalData);

            toast.success(result.message);

            setStep(2);
        } catch (error) {
            toast.error("Failed to save personal information");
            console.error(error);
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.message);
            throw error;


        }
    };




    const inputClass = "form-control";

    const ErrorText = ({ msg }) =>
        msg ? <small className="text-danger">{msg}</small> : null;

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center "
            style={{
                background: "linear-gradient(135deg, #eef2ff, #f8fafc, #dbeafe)",
            }}
        >
            <ToastContainer position="top-right" autoClose={2000} />

            <Card
                className="border-0 shadow-lg rounded-4 overflow-hidden"
                style={{ maxWidth: "950px", width: "100%" }}
            >
                {/* Header */}
                <div
                    className="text-white text-center p-5"
                    style={{
                        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                    }}
                >
                    <div
                        className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow"
                        style={{
                            width: 60,
                            height: 60,
                            fontSize: 35,
                        }}
                    >
                        👤
                    </div>

                    <h2 className="fw-bold mb-2">Personal Information</h2>

                    <p className="mb-1 text-white-50">
                        Fill all required employee information
                    </p>


                </div>

                <Card.Body className="p-5">

                    {/* Step */}
                    <div className="d-flex justify-content-center align-items-center mb-5">



                    </div>

                    <Form>

                        <Row className="g-4">

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        First Name
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="Enter First Name"
                                        {...register("firstName", {
                                            required: "First Name required",
                                        })}
                                    />

                                    <ErrorText msg={errors.firstName?.message} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Last Name
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="Enter Last Name"
                                        {...register("lastName", {
                                            required: "Last Name required",
                                        })}
                                    />

                                    <ErrorText msg={errors.lastName?.message} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Email
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        {...register("email", {
                                            required: "Email required",
                                        })}
                                    />

                                    <ErrorText msg={errors.email?.message} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Phone Number
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="9876543210"
                                        {...register("phone", {
                                            required: "Phone required",
                                        })}
                                    />

                                    <ErrorText msg={errors.phone?.message} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>

                                    <Form.Label className="fw-semibold">
                                        Date of Birth
                                    </Form.Label>

                                    <input
                                        type="hidden"
                                        {...register("dob", {
                                            required: "DOB required",
                                        })}
                                    />

                                    <Flatpickr
                                        className={`form-control form-control-lg ${errors.dob ? "is-invalid" : ""
                                            }`}
                                        options={{
                                            dateFormat: "Y-m-d",
                                            disableMobile: true,
                                        }}
                                        onChange={(selectedDates, dateStr) =>
                                            setValue("dob", dateStr, {
                                                shouldValidate: true,
                                            })
                                        }
                                    />

                                    <ErrorText msg={errors.dob?.message} />

                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>

                                    <Form.Label className="fw-semibold">
                                        Gender
                                    </Form.Label>

                                    <Form.Select
                                        size="lg"
                                        {...register("gender", {
                                            required: "Gender required",
                                        })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Form.Select>

                                    <ErrorText msg={errors.gender?.message} />

                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group>

                                    <Form.Label className="fw-semibold">
                                        Skills
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="React, Node, Java..."
                                        {...register("skills", {
                                            required: "Skills required",
                                        })}
                                    />

                                    <ErrorText msg={errors.skills?.message} />

                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group>

                                    <Form.Label className="fw-semibold">
                                        Address
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter complete address..."
                                        {...register("address", {
                                            required: "Address required",
                                        })}
                                    />

                                    <ErrorText msg={errors.address?.message} />

                                </Form.Group>
                            </Col>

                            <Col md={12}>


                                <div className="d-flex justify-content-between mt-3">
                                    <Button
                                        variant="outline-secondary"
                                        size="lg"
                                        className="px-5 rounded-pill"
                                        onClick={() => router.back()}
                                    >
                                        ← Previous
                                    </Button>


                                    <Button
                                        size="lg"
                                        onClick={handleNext}
                                        className="px-5 rounded-pill shadow"
                                        style={{
                                            background: "#2563eb",
                                            border: "none",
                                        }}
                                    >
                                        Submit
                                    </Button>

                                </div>

                            </Col>

                        </Row>

                    </Form>

                </Card.Body>
            </Card>
        </div>
    );
}



