import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.mainBackground}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Fakebook</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.content}>
        <h2>Welcome to the Internship & Collaboration Portal</h2>
        <p>Manage your connections, profiles, and more from here.</p>
      </div>
    </div>
  );
};

export default Main;