import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSection.css";

function RegisterSection() {
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setComformPassword] = useState("");
  const navigate = useNavigate();

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onIDHandler = (e) => {
    setID(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setComformPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }
    let body = {
      email: Email,
      name: Name,
      loginPwd: Password,
      loginId: ID,
    };
    axios
      .post("http://3.39.166.51:8080/member/join", body)
      .then((res) => {
        console.log(res);
        navigate({ pathname: "/login" });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(body);
  };
  return (
    <>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={onSubmitHandler}>
              <h2>회원가입</h2>
              <div className="inputBox">
                <input
                  type="Name"
                  value={Name}
                  onChange={onNameHandler}
                  required
                />
                <label htmlFor="">이름</label>
              </div>
              <div className="inputBox">
                <input type="ID" value={ID} onChange={onIDHandler} required />
                <label htmlFor="">아이디</label>
              </div>
              <div className="inputBox">
                <input
                  type="Email"
                  value={Email}
                  onChange={onEmailHandler}
                  required
                />
                <label htmlFor="">이메일</label>
              </div>
              <div className="inputBox">
                <input
                  type="Password"
                  value={Password}
                  onChange={onPasswordHandler}
                  required
                />
                <label htmlFor="">비밀번호</label>
              </div>
              <div className="inputBox">
                <input
                  type="Password"
                  value={ConfirmPassword}
                  onChange={onConfirmPasswordHandler}
                  required
                />
                <label htmlFor="">비밀번호 확인</label>
              </div>

              <button className="registerBtn" formAction="">
                가입하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterSection;
