import { AxiosError } from "axios";
import { toast } from "react-toastify";

const showApiError = (error: AxiosError) => {
  toast.error(error.message);
};

export default showApiError;
