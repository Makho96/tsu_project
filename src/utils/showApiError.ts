import { AxiosError } from "axios";
import { toast } from "react-toastify";

const showApiError = (error: AxiosError) => {
  console.error(error);
  toast.error(error.message);
};

export default showApiError;
