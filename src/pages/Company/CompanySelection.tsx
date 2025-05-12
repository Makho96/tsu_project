import { useState } from "react";
import CompanySelectionModal from "../../components/shared/CompanySelectionModal/CompanySelectionModal";

const CompanySelection = () => {
  const [isCompanySelectionModalOpen, setIsCompanySelectionModalOpen] =
    useState<boolean>(true);

  return isCompanySelectionModalOpen ? (
    <CompanySelectionModal
      handleClose={() => setIsCompanySelectionModalOpen(false)}
    />
  ) : null;
};

export default CompanySelection;
