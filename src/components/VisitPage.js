import { useEffect, useState } from "react";
import VisitComponent from "./VisitComponent";
import "./VisitPage.css";
import axios from "axios";
import { ReactComponent as MyIcon } from "./user-circle.svg";

export default function VisitPage({ name, id }) {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const write_url = "http://3.39.166.51:8080/room/text/write";
  const get_url = "http://3.39.166.51:8080/room/text/search";
  const delete_url = "http://3.39.166.51:8080/room/text/delete";
  const [board, setBoard] = useState([]);
  const [newBoard, setNewBoard] = useState({
    createdBy: "guest",
    contents: "",
    writtenDate: "2023-11-17",
  });
  const { createdBy, contents } = newBoard;

  const onChange = (event) => {
    const { value, name } = event.target;
    setNewBoard({
      ...newBoard,
      [name]: value,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let body = {
      memberId: localStorage.getItem("loginId"),
      roomId: `${id}`,
      ifMine: `false`,
    };
    let token = localStorage.getItem("access-token");
    await axios
      .post(get_url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let make_board = [];
        for (let i = 0; i < response.data.result.texts.length; i++) {
          const new_board = {
            createdBy: response.data.result.texts[i].writerId,
            contents: response.data.result.texts[i].content,
            writtenDate: response.data.result.texts[i].writtenDate,
          };
          make_board.push(new_board);
        }
        console.log(make_board);
        setBoard([...board, ...make_board]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    if (newBoard.contents === "") {
      alert("내용을 입력해주세요!");
    } else {
      let written_id = "";
      if (id === 1) {
        written_id = "guest";
      } else {
        written_id = localStorage.getItem("loginId");
      }
      newBoard.writtenDate = formattedDate;
      let token = localStorage.getItem("access-token");
      let body = {
        writerId: written_id,
        roomId: `${id}`,
        writtenDate: `${today.getFullYear()}${
          today.getMonth() + 1
        }${today.getDate()}`,
        content: newBoard.contents,
      };
      await axios
        .post(write_url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setBoard([...board, newBoard]);
            setNewBoard({ createdBy: "", contents: "", writtenDate: "" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleDelete = (index) => {
    const updateBoard = [...board];
    updateBoard.splice(index, 1);
    setBoard(updateBoard);
  };

  return (
    <div className="container-name">
      <h3 className="title-h3">{name}님을 방문한 사람들</h3>
      <form className="form-container">
        <div className="form-wrapper">
          <div className="writer-span">
            <MyIcon className="my-icon" />
          </div>
          <br />
          <div className="contents-container">
            <textarea
              className="visit-input text-area"
              name="contents"
              cols="70"
              rows="9"
              placeholder="방명록 작성란..."
              value={contents}
              onChange={onChange}
            />
          </div>
          <button className="save-button" onClick={handleAddButton}>
            방명록 작성
          </button>
        </div>
      </form>
      <div className="visitcomponent-container">
        {board.map((content, index) => (
          <VisitComponent
            key={index}
            name={content.createdBy}
            date={content.writtenDate}
            contents={content.contents}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}
