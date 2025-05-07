import { Box } from "@mui/material";
import CompanyItem from "./companyItem";
import { useAppSelector } from "../../../store/hooks/useTypedSelector";

type CompaniesListProps = {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const CompaniesList = ({ onEdit, onDelete }: CompaniesListProps) => {
  const companies = useAppSelector((state) => state.companies.companies);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {companies.map((company) => {
        return (
          <CompanyItem
            key={company.id}
            companyData={company}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </Box>
  );
};

export default CompaniesList;
