import { logout } from "../store/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks/useTypedSelector";

const Dashboard = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Dashboard;