import { useState } from "react";
import "./LoginSection.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSection() {
  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      loginId: ID,
      loginPwd: Password,
    };

    axios
      .post("http://3.39.166.51:8080/member/login", body)
      .then((response) => {
        if ((response.status = 200)) {
          localStorage.setItem("userPwd", Password);
          localStorage.setItem("loginId", response.data.result.loginId);
          localStorage.setItem(
            "access-token",
            response.data.result.token.accessToken
          );
          localStorage.setItem(
            "refresh-token",
            response.data.result.token.refreshToken
          );
          navigate({ pathname: "/" });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("해당 정보가 없습니다.");
      });

    console.log(body);
  };

  return (
    <>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={onSubmitHandler}>
              <h2>Login</h2>
              <div className="inputBox">
                <input type="ID" value={ID} onChange={onIDHandler} required />
                <label htmlFor="">아이디</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  value={Password}
                  onChange={onPasswordHandler}
                  required
                />
                <label htmlFor="">비밀번호</label>
              </div>
              <div className="forget">
                <a href="/">Forget Password?</a>
                <Link to="/register">회원가입</Link>
              </div>
              <button className="loginBtn" formAction={onSubmitHandler}>
                로그인
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginSection;
