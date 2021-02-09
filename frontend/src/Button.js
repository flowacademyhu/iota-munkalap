import React from "react";
export default function Button({ children }) {
  return (
    <button type="submit" className="btn btn-primary w-100 mb-3">
      {children}
    </button>
  );
}