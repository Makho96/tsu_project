import { FormValues } from "./Login.types";
import { string, object } from "yup";

const initialValues: FormValues = {
  username: "",
  password: "",
};

const validationSchema = object({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export { initialValues, validationSchema };
