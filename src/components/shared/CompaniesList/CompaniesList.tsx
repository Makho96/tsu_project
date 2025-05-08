import { Box } from "@mui/material";
import CompanyItem from "./companyItem";
import { useAppSelector } from "../../../store/hooks/useTypedSelector";

const CompaniesList = () => {
  const companies = useAppSelector((state) => state.companies.companies);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {companies.map((company) => {
        return <CompanyItem key={company.id} companyData={company} />;
      })}
    </Box>
  );
};

export default CompaniesList;
