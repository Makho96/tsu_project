import { object, string } from "yup";
import { FormFields, FormValues } from "./company.types";

const initialValues: FormValues = {
  [FormFields.Name]: "",
  [FormFields.Email]: "",
  [FormFields.Phone]: "",
};

const validationSchema = object({
  [FormFields.Name]: string().required("Name is required"),
  [FormFields.Email]: string()
    .email("Invalid email")
    .required("Email is required"),
  [FormFields.Phone]: string().required("Phone is required"),
});

export { initialValues, validationSchema };
