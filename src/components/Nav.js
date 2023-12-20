import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : undefined,
  };
}

function Nav() {
  const navigate = useNavigate();
  const loginId = localStorage.getItem("loginId");
  const logOut = (e) => {
    localStorage.clear("loginId");
    navigate({ pathname: "/" });
  };
  console.log(loginId);
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.container}>
          <ul className={styles.menu}>
            <li>
              <NavLink to="/about" style={getLinkStyle}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" style={getLinkStyle}>
                Contact
              </NavLink>
            </li>
          </ul>

          <p className={styles.title}>
            <Link to="/">RoomOf</Link>
          </p>

          <ul className={styles.menu}>
            {loginId ? (
              <li className={styles.loginIdStyle}>{loginId} 님</li>
            ) : (
              <li>
                <NavLink to="/login" style={getLinkStyle}>
                  로그인
                </NavLink>
              </li>
            )}
            {loginId ? (
              <li>
                <NavLink to="/" style={getLinkStyle} onClick={logOut}>
                  로그아웃
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/register" style={getLinkStyle}>
                  회원가입
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
