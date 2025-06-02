import { object, string } from "yup";
import { FormFields, FormValues } from "./DepartmentsModal.types";

const initialValues: FormValues = {
  [FormFields.title]: "",
  [FormFields.contactPerson]: "",
  [FormFields.tell]: "",
  [FormFields.eMail]: "",
};

const validationSchema = object({
  [FormFields.title]: string().required("Title is required"),
  [FormFields.contactPerson]: string().required("Contact person is required"),
  [FormFields.tell]: string().required("Tell is required"),
  [FormFields.eMail]: string().required("Email is required"),
});

export { initialValues, validationSchema };
