import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import CompanySelectionModal from "../components/shared/CompanySelectionModal/CompanySelectionModal";
import useEvent from "../hooks/useEvent";
import { setSelectedCompany } from "../store/companies/companies.slice";
import { getCompany } from "../store/companies/companies.thunks";
import { useAppDispatch } from "../store/hooks/useTypedSelector";

const CompanyRoutingWrapper = () => {
  const { id } = useParams();
  const [isCompanySelectionModalOpen, setIsCompanySelectionModalOpen] =
    useState<boolean>(!id);

  const dispatch = useAppDispatch();

  const fetchCompany = useEvent(async () => {
    if (id) {
      try {
        const company = await dispatch(getCompany(+id)).unwrap();
        console.log(company);
        dispatch(setSelectedCompany(company));
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return isCompanySelectionModalOpen ? (
    <CompanySelectionModal
      open={isCompanySelectionModalOpen}
      handleClose={() => setIsCompanySelectionModalOpen(false)}
    />
  ) : (
    <Outlet />
  );
};

export default CompanyRoutingWrapper;
