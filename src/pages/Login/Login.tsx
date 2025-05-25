import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Box, Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { initialValues, validationSchema } from "./Login.consts";
import { FormFields, FormValues } from "./Login.types";
import FormInput from "../../components/shared/FormInput/FormInput";
import Translator from "../../components/shared/Translator";
import Routes from "../../routing/Routing.types";
import { loginThunk } from "../../store/auth/auth.thunks";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/useTypedSelector";

const Login = () => {
  console.log("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async ({
      [FormFields.Username]: username,
      [FormFields.Password]: password,
    }: FormValues) => {
      try {
        const result = await dispatch(loginThunk({ username, password }));
        if (loginThunk.fulfilled.match(result)) {
          navigate("/company");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, navigate]
  );

  if (token) return <Navigate to={Routes.Login} />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="blue.1000"
      position="relative"
    >
      <Box position="absolute" top={10} right={10}>
        <Translator />
      </Box>
      <Box
        margin="auto"
        width="500px"
        bgcolor="common.white"
        padding={4}
        borderRadius={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          width={64}
          height={64}
          bgcolor="blue.1000"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ShieldOutlinedIcon sx={{ color: "common.white", fontSize: 40 }} />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          marginBlock={4}
          color="blue.900"
        >
          {t("login.title")}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Box sx={{ mb: 3 }}>
                <FormInput
                  name={FormFields.Username}
                  label={t("login.username")}
                  helperText={t("login.usernameHelperText")}
                  inputLabelStyle={{
                    color: "blue.900",
                  }}
                  style={{
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      color: "blue.900",
                    },
                  }}
                  helperTextStyle={{
                    color: "blue.900",
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormInput
                  name={FormFields.Password}
                  label={t("login.password")}
                  type="password"
                  helperText={t("login.passwordHelperText")}
                  helperTextStyle={{
                    color: "blue.900",
                  }}
                  inputLabelStyle={{
                    color: "blue.900",
                  }}
                  style={{
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      color: "blue.900",
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {t("login.login")}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
