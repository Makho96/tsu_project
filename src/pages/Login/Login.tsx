import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../store/auth/auth.thunks";
import { useAppDispatch } from "../../store/hooks/useTypedSelector";
import { Box, Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import FormInput from "../../components/shared/FormInput/FormInput";
import { initialValues, validationSchema } from "./Login.consts";
import { FormFields, FormValues } from "./Login.types";
import { useCallback } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async ({
      [FormFields.Username]: username,
      [FormFields.Password]: password,
    }: FormValues) => {
      try {
        debugger;
        const result = await dispatch(loginThunk({ username, password }));
        if (loginThunk.fulfilled.match(result)) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, navigate]
  );

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 1 }}>
              <FormInput
                name={FormFields.Username}
                label="Username"
                helperText="Username must be at least 3 characters"
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormInput
                name={FormFields.Password}
                label="Password"
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

export default Login;
