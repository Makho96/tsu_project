import { useEffect } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { FullPageLoader } from "../components/shared/Loader";
import useEvent from "../hooks/useEvent";
import { setSelectedCompany } from "../store/companies/companies.slice";
import { getCompany } from "../store/companies/companies.thunks";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks/useTypedSelector";
import { SliceStatuses } from "../store/types";

const CompanyRoutingWrapper = () => {
  const { id } = useParams();
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );
  const loading = useAppSelector((state) =>
    [SliceStatuses.LOADING, SliceStatuses.IDLE].includes(state.companies.status)
  );
  const dispatch = useAppDispatch();

  const fetchCompany = useEvent(async () => {
    if (id && !isNaN(+id) && !currentCompany) {
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

  if (id && isNaN(+id)) {
    return <Navigate to="/company/" />;
  }

  if (loading) {
    return <FullPageLoader />;
  }

  return <Outlet />;
};

export default CompanyRoutingWrapper;
