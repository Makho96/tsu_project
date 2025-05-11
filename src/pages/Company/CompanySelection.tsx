import { useState } from "react";
import CompanySelectionModal from "../../components/shared/CompanySelectionModal/CompanySelectionModal";

const CompanySelection = () => {
  const [isCompanySelectionModalOpen, setIsCompanySelectionModalOpen] =
    useState<boolean>(true);

  return (
    <CompanySelectionModal
      open={isCompanySelectionModalOpen}
      handleClose={() => setIsCompanySelectionModalOpen(false)}
    />
  );
};

export default CompanySelection;
