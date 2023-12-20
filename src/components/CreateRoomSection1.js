import "./CreateRoomSection1.css";
import PageNumber from "./PageNumber";
import { useState } from "react";
import { DAY, MONTH, RELATIONSHIP, YEAR } from "./constantTime";
import arrow from "../images/arrow.png";
import { useNavigate } from "react-router-dom";

export let userDetails = {
  name: "",
  gender: "",
  birthYear: "",
  birthMonth: "01",
  birthDay: "01",
  deathYear: null,
  deathMonth: null,
  deathDay: null,
  relationship: "",
};

export let userFormData = new FormData();

function CreateRoomSection1() {
  const navigate = useNavigate();
  const login_id = localStorage.getItem("loginId");
  const user_pwd = localStorage.getItem("userPwd");
  const [isDisabled, setIsDisabled] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    gender: "",
    birthYear: "",
    birthMonth: "01",
    birthDay: "01",
    deathYear: null,
    deathMonth: null,
    deathDay: null,
    relationship: "",
  });
  const {
    name,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    deathYear,
    deathMonth,
    deathDay,
    relationship,
  } = userInput;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    userDetails = { ...userDetails, [name]: value };
  };

  const handleCheckboxChange = () => {
    setIsDisabled(!isDisabled); // 체크박스 변경 시 상태를 토글하여 select 태그를 활성화/비활성화
  };

  const checkSignUp = (e) => {
    e.preventDefault();
    if (!(name === "")) {
      navigate({ pathname: "/createRoom/2" });
    } else {
      alert("사용자 정보를 입력해주세요!!");
    }
  };

  return (
    <>
      <section className="section1">
        <div className="section-box1">
          <div className="form-value1">
            <PageNumber num={1} />
            <div className="form-box1">
              <form>
                <h2>신상정보 기입</h2>
                {/* 이름 */}
                <div className="nameinputBox">
                  <input
                    className="userName input nameInput"
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요."
                    autoComplete="username"
                    onChange={handleInput}
                  />
                  <label htmlFor="" className="nameLabel">
                    이름
                  </label>
                </div>
                {/* 생년월일 */}
                <div className="userBirth inputBox1">
                  <label htmlFor="" className="title mustInput">
                    생년월일
                  </label>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="birthYear"
                      onChange={handleInput}
                    >
                      {YEAR.map((y) => {
                        return <option key={y}>{y}</option>;
                      })}
                    </select>
                    <select
                      className="select"
                      name="birthMonth"
                      onChange={handleInput}
                    >
                      {MONTH.map((m) => {
                        return <option key={m}>{m}</option>;
                      })}
                    </select>
                    <select
                      className="select"
                      name="birthDay"
                      onChange={handleInput}
                    >
                      {DAY.map((d) => {
                        return <option key={d}>{d}</option>;
                      })}
                    </select>
                  </div>
                </div>
                {/* 성별 */}
                <div className="inputBox1">
                  <label htmlFor="" className="userGender title mustInput">
                    성별
                  </label>
                  <div className="labelBox">
                    <label className="userMale label">
                      <input
                        className="radio"
                        name="gender"
                        type="radio"
                        value="man"
                        onChange={handleInput}
                      />
                      <span className="text">남자</span>
                    </label>
                    <label className="userFemale label">
                      <input
                        className="radio"
                        name="gender"
                        type="radio"
                        value="woman"
                        onChange={handleInput}
                      />
                      <span className="text">여자</span>
                    </label>
                  </div>
                </div>
                {/* 사망년일 */}
                <div className="userDeath inputBox1">
                  <label htmlFor="" className="title mustInput">
                    사망년일
                  </label>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="deathYear"
                      onChange={handleInput}
                      disabled={isDisabled}
                    >
                      {YEAR.map((y) => {
                        return <option key={y}>{y}</option>;
                      })}
                    </select>
                    <select
                      className="select"
                      name="deathMonth"
                      onChange={handleInput}
                      disabled={isDisabled}
                    >
                      {MONTH.map((m) => {
                        return <option key={m}>{m}</option>;
                      })}
                    </select>
                    <select
                      className="select"
                      name="deathDay"
                      onChange={handleInput}
                      disabled={isDisabled}
                    >
                      {DAY.map((d) => {
                        return <option key={d}>{d}</option>;
                      })}
                    </select>
                  </div>
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  <label htmlFor="" className="deathCheckbox">
                    아직 돌아가시지 않았습니다.
                  </label>
                </div>
                {/* 관계 */}
                <div className="userRelationship inputBox1">
                  <label htmlFor="" className="title mustInput">
                    관계
                  </label>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="relationship"
                      onChange={handleInput}
                    >
                      {RELATIONSHIP.map((r) => {
                        return <option key={r}>{r}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className={`signupBtn`} onClick={checkSignUp}>
                  <img className="arrow" alt="Arrow" src={arrow} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateRoomSection1;
