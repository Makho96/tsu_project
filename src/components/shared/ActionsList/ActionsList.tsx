import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";
import { getActions } from "../../../store/actions/actions.thunks";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/hooks/useTypedSelector";
import { SliceStatuses } from "../../../store/types";
import { FullPageLoader } from "../Loader";
import ActionListItem from "./ActionListItem";

type ActionsListProps = {
  showActions?: boolean;
};

const ActionsList = ({ showActions = true }: ActionsListProps) => {
  const { id } = useParams();
  const actions = useAppSelector((state) => state.actions.actions);
  const isLoading = useAppSelector((state) =>
    [SliceStatuses.LOADING, SliceStatuses.IDLE].includes(state.actions.status)
  );

  const dispatch = useAppDispatch();

  const fetchActions = useEvent(async () => {
    await dispatch(getActions(Number(id)));
  });

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  console.log(actions);

  return (
    <Box>
      {actions.map((action) => (
        <Box key={action.id}>
          <ActionListItem action={action} showActions={showActions} />
        </Box>
      ))}
    </Box>
  );
};

export default ActionsList;
