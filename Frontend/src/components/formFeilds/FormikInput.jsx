import { Field } from "formik";
import React from "react";

const FormikInput = ({ type, name, placeholder, className }) => {
  return (
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${
        className ? className : ""
      } p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-gray-700 text-sm placeholder-gray-400 placeholder-opacity-100 `}
    />
  );
};

export default FormikInput;
