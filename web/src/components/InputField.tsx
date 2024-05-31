import { TextField } from "@mui/material";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({ color, size, ...props }) => {
  const [field, { error, touched }] = useField(props);
  return (
    <>
      <TextField
        {...field}
        {...props}
        className="w-full mb-4"
        label={props.label}
        variant="outlined"
        error={!!error && touched}
      />
      {error && touched && (
        <p className="mt-1 ml-2 text-xs text-red-600">{error}</p>
      )}
    </>
  );
};

export default InputField;
