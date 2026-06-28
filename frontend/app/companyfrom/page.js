"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
    Card,
    Form,
    Row,
    Col,
    Button,
    ProgressBar,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { saveCompany } from "@/services/companyServices";

const Page = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const ErrorText = ({ msg }) =>
        msg ? <small className="text-danger">{msg}</small> : null;

    const onSubmit = async (data) => {
        const companyData = {
            companyName: data.companyName,
            panNumber: data.panNumber,
            gstNumber: data.gstNumber,
            companyAddress: data.companyAddress,
        };

        try {
            const result = await saveCompany(companyData);

            toast.success(result?.message || "Company saved successfully");

            
          
            router.push("/");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to save company information"
            );
        }
    };

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center py-5"
            style={{
                background:
                    "linear-gradient(135deg,#eef2ff,#f8fafc,#dbeafe)",
            }}
        >
            <ToastContainer position="top-right" autoClose={2000} />

            <Card
                className="border-0 shadow-lg rounded-4 overflow-hidden"
                style={{
                    maxWidth: "950px",
                    width: "100%",
                }}
            >
                {/* Header */}

                <div
                    className="text-center text-white p-5"
                    style={{
                        background:
                            "linear-gradient(135deg,#2563eb,#4f46e5)",
                    }}
                >
                    <div
                        className="bg-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3 shadow"
                        style={{
                            width: 80,
                            height: 80,
                            fontSize: 35,
                        }}
                    >
                        🏢
                    </div>

                    <h2 className="fw-bold">
                        Company Information
                    </h2>

                    <p className="text-white-50">
                        Fill all required company details
                    </p>

                </div>

                <Card.Body className="p-5">
                    {/* Step */}

                    

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="g-4">

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Company Name
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="Enter Company Name"
                                        {...register("companyName", {
                                            required: "Company Name is required",
                                        })}
                                    />

                                    <ErrorText
                                        msg={errors.companyName?.message}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        PAN Number
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="ABCDE1234F"
                                        style={{ textTransform: "uppercase" }}
                                        {...register("panNumber", {
                                            required: "PAN Number is required",
                                           
                                        })}
                                    />

                                    <ErrorText
                                        msg={errors.panNumber?.message}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        GST Number
                                    </Form.Label>

                                    <Form.Control
                                        size="lg"
                                        placeholder="22AAAAA0000A1Z5"
                                        style={{ textTransform: "uppercase" }}
                                        {...register("gstNumber", {
                                            required: "GST Number is required",
                                        })}
                                    />

                                    <ErrorText
                                        msg={errors.gstNumber?.message}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Company Address
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter Company Address"
                                        {...register("companyAddress", {
                                            required:
                                                "Company Address is required",
                                        })}
                                    />

                                    <ErrorText
                                        msg={errors.companyAddress?.message}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <div className="d-flex justify-content-between mt-4">

                                    <Button
                                        variant="outline-secondary"
                                        size="lg"
                                        className="px-5 rounded-pill"
                                        onClick={() => router.back()}
                                    >
                                        ← Previous
                                    </Button>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="px-5 rounded-pill"
                                        style={{
                                            background: "#16a34a",
                                            border: "none",
                                        }}
                                    >
                                        Submit ✔
                                    </Button>

                                </div>
                            </Col>

                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Page;