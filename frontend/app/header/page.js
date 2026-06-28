"use client";

import React from "react";
import { ProgressBar } from "react-bootstrap";

const FormHeader = ({
  title,
  subtitle,
  icon,
  step,
  totalSteps = 2,
}) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div
      className="position-relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
        borderRadius: "20px 20px 0 0",
      }}
    >
      {/* Background Circle */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          top: -70,
          right: -70,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255,255,255,.06)",
          bottom: -50,
          left: -40,
        }}
      ></div>

      <div className="position-relative p-5 text-center">

        <div
          className="bg-white shadow-lg rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
          style={{
            width: 85,
            height: 85,
            fontSize: 38,
          }}
        >
          {icon}
        </div>

        <h2 className="fw-bold mb-2">
          {title}
        </h2>

        <p className="text-white-50 mb-4">
          {subtitle}
        </p>

        <ProgressBar
          now={progress}
          style={{
            height: 8,
            borderRadius: 20,
            background: "#5b7cfa",
          }}
        />

        <div className="d-flex justify-content-between mt-4">

          {/* Step 1 */}

          <div className="text-center">

            <div
              className={`rounded-circle fw-bold d-flex justify-content-center align-items-center mx-auto ${
                step >= 1
                  ? "bg-success text-white"
                  : "bg-light text-dark"
              }`}
              style={{
                width: 45,
                height: 45,
              }}
            >
              {step > 1 ? "✓" : "1"}
            </div>

            <small className="d-block mt-2">
              Personal
            </small>

          </div>

          <div
            className="flex-grow-1 mx-3 mt-4"
            style={{
              height: 3,
              background:
                step >= 2 ? "#22c55e" : "#8ea9ff",
            }}
          ></div>

          {/* Step 2 */}

          <div className="text-center">

            <div
              className={`rounded-circle fw-bold d-flex justify-content-center align-items-center mx-auto ${
                step >= 2
                  ? "bg-success text-white"
                  : "bg-light text-dark"
              }`}
              style={{
                width: 45,
                height: 45,
              }}
            >
              2
            </div>

            <small className="d-block mt-2">
              Company
            </small>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FormHeader;