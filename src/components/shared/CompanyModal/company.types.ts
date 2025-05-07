enum FormFields {
  Name = "name",
  Email = "email",
  Phone = "phone",
}

type FormValues = {
  [FormFields.Name]: string;
  [FormFields.Email]: string;
  [FormFields.Phone]: string;
};

export { FormFields };
export type { FormValues };
