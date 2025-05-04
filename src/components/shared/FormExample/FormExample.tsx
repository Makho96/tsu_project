import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import FormInput from "../FormInput/FormInput";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const FormExample: React.FC = () => {
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Form Example
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 3 }}>
              <FormInput
                name="name"
                label="Name"
                placeholder="John Doe"
                helperText="Enter your full name"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormInput
                name="email"
                label="Email"
                placeholder="john@example.com"
                type="email"
                helperText="We'll never share your email"
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <FormInput
                name="password"
                label="Password"
                placeholder="Your secure password"
                type="password"
                helperText="Password must be at least 8 characters"
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormExample;
