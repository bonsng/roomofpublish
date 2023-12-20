import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import "./App.font.css";
import Nav from "./Nav";

function App() {
  return (
    <>
      <div className={styles.body}>
        <Nav />
        <Outlet />
      </div>
    </>
  );
}

export default App;
