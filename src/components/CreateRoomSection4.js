import { useNavigate } from "react-router-dom";
import "./CreateRoomSection4.css";
import PageNumber from "./PageNumber";
import arrow from "../images/arrow.png";
import { useState } from "react";

export let scopeDetail = "";
export let roomPwdDetail = "";

function CreateRoomSection4() {
  const [scope, setScope] = useState("공개");
  const [roomPwd, setRoomPwd] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    setScope(e.target.value);
  };
  const checkSignUp = (e) => {
    e.preventDefault();
    if (scope === "비공개" && roomPwd === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      roomPwdDetail = roomPwd;
      scopeDetail = scope;
      navigate({ pathname: "/createRoom/5" });
    }
  };
  const onRoomPwdChange = (e) => {
    setRoomPwd(e.currentTarget.value);
  };
  return (
    <>
      <section className="section1">
        <div className="section-box1">
          <div className="form-value1">
            <PageNumber num={5} />
            <div className="form-box1">
              <form>
                <h2>공개범위 설정</h2>
                <div className="scope-container">
                  <div className="labelBox">
                    <label className="radio-label" for="id_1">
                      <span className="scope-text">공개</span>
                      <div className="info-div">
                        이름을 검색하는 누구나 방에 입장할 수 있습니다.
                      </div>
                      <div className="empty-div">d</div>
                      <input
                        className="radio"
                        name="scope"
                        type="radio"
                        id="id_1"
                        checked={scope === "공개"}
                        value="공개"
                        onChange={handleInput}
                      />
                    </label>
                    <label className="radio-label" for="id_2">
                      <span className="scope-text">비공개</span>
                      <div className="info-div">
                        비밀번호를 입력해야 방을 입장할 수 있습니다.
                      </div>
                      <div className="pwd-div">
                        <input
                          type="password"
                          value={roomPwd}
                          onChange={onRoomPwdChange}
                          disabled={scope !== "비공개"}
                          placeholder="비밀번호"
                        />
                      </div>
                      <input
                        className="radio"
                        name="scope"
                        type="radio"
                        id="id_2"
                        checked={scope === "비공개"}
                        value="비공개"
                        onChange={handleInput}
                      />
                    </label>
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

export default CreateRoomSection4;
