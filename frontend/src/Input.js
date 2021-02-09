import React, { useState } from "react";
import { useField } from "formik";

export default function Input({ label, type, ...props }) {
  const [field, meta] = useField(props);
  const { name } = props;

  const { error, touched } = meta;

  const theError = touched && error;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        {...field}
        {...props}
        id={name}
        type={type}
        className={`form-control ${theError ? "is-invalid" : ""}`}
      />
      {theError && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

