enum FormFields {
  Username = "username",
  Password = "password",
}

type FormValues = {
  [FormFields.Username]: string;
  [FormFields.Password]: string;
};

export { FormFields };
export type { FormValues };
