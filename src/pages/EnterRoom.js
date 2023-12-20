import { useState } from "react";
import "./EnterRoom.css";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import RoomThumbnail from "../components/RoomThumbnail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterRoom() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchRoomIds, setSearchRoomIds] = useState(null);
  const [checkPwd, setCheckPwd] = useState(true);
  const [searchpwd, setSearchpwd] = useState("");
  const [checkId, setCheckId] = useState(0);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const search = searchName;
      const response = await axios.get(
        `http://3.39.166.51:8080/room/search?name=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchRoomIds(null);
      if (searchName === "") {
        alert("검색어를 입력해주세요.");
      } else {
        if (response.data.result.rooms.length === 0) {
          alert("검색하신 이름으로 생성된 방이 없습니다!");
        } else {
          setSearchRoomIds(response.data.result.rooms);
          console.log(searchRoomIds);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleButton = (id, ifPublic) => {
    if (ifPublic) {
      setCheckPwd(false);
      setCheckId(id);
    } else {
      navigate(`/userRoom?id=${id}`);
    }
  };
  const handlePasswordButton = async (id) => {
    try {
      const token = localStorage.getItem("access-token");
      const search_id = id;
      let body = {
        roomId: `${search_id}`,
        roomPwd: searchpwd,
      };
      const response = await axios.post(
        "http://3.39.166.51:8080/room/enter",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.result.ifCorrect === true) {
        navigate(`/userRoom?id=${search_id}`);
      } else {
        alert("비밀번호가 틀립니다!");
      }
    } catch (e) {
      console.log(e);
      alert("비밀번호가 틀렸습니다!");
    }
  };

  if (!checkPwd) {
    return (
      <>
        <div className="bg"></div>
        <div className="pwd-container">
          <div className="pwd-header">해당 방의 비밀번호를 입력하세요</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="pwd-input"
            value={searchpwd}
            onChange={(e) => setSearchpwd(e.target.value)}
          />
          <Button
            variant="filled"
            onClick={() => handlePasswordButton(checkId)}
          >
            확인
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg"></div>
      <div className="enter-container">
        <div className="enterroom-title">
          <h3 className="enter-h3">방 검색하기</h3>
          <p className="enter-p">들어가고 싶은 방을 검색해보세요.</p>
        </div>
        <div className="search-container">
          <Input
            color="neutral"
            placeholder="이름을 입력해 주세요."
            size="md"
            variant="soft"
            sx={{ width: "230px" }}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button
            variant="filled"
            onClick={handleSearch}
            sx={{ color: "white" }}
          >
            검색
          </Button>
        </div>
        <div className="result-container">
          {searchRoomIds
            ? searchRoomIds.map((item, index) => (
                <RoomThumbnail
                  key={index}
                  name={searchName}
                  birthDate={item.birthDate}
                  onClick={() => handleButton(item.id, item.ifPublic)}
                  ifPublic={item.ifPublic}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default EnterRoom;
