import { useAppSelector } from "../../../store/hooks/useTypedSelector";

const SelectedCompany = () => {
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );

  return <div>{currentCompany?.title}</div>;
};

export default SelectedCompany;
