import styles from "./Sidebar.module.scss";
import classNames from "classnames";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar = (props: SidebarProps) => {
  const { isOpen, onToggle } = props;

  return (
    <div className={classNames(styles.sidebar, { [styles.open]: isOpen })}>
      <button onClick={onToggle}>{isOpen ? "close" : "open"}</button>
    </div>
  );
};

export default Sidebar;
