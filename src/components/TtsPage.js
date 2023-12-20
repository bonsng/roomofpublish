import "./TtsPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import sample_audio from "./sample.wav";
import Button from "@mui/material/Button";
import TtsComponent from "./TtsComponent";
import IconButton from "@mui/material/IconButton";
import AddCircle from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import Loading from "./Loading";
import Spinner from "../assets/Spinner.gif";
import { CompressOutlined } from "@mui/icons-material";

const TtsPage = ({ name, id }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  // useState
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [pageState, setPageState] = useState(false);
  const [voices, setVoices] = useState([]);
  const [textPlace, setTextPlace] = useState("듣고 싶은 말을 적어주세요..");
  const [viewText, setViewText] = useState("텍스트가 없습니다...");
  const [newVoice, setNewVoice] = useState({
    firstLine: "",
    length: 0,
    content: "",
    writtenDate: "2023-11-17",
    url: "",
  });
  const { firstLine, length, content, writtenDate } = newVoice;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let get_url = `http://3.39.166.51:8080/room/ttssound?roomId=${id}`;
    let token = localStorage.getItem("access-token");
    await axios
      .get(get_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const voice_urls = [];

        response.data.result.ttsSounds.map((item, index) => {
          const new_voice = {
            length: 0,
            firstLine: item.title,
            content: item.content,
            writtenDate: item.generatedDate,
            url: item.url,
          };
          voice_urls.push(new_voice);
          console.log(new_voice);
        });
        const new_voices = [...voices, ...voice_urls];
        setVoices(new_voices);
        console.log(voices);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 버튼들 핸들링 함수
  const handleAddButton = (e) => {
    e.preventDefault();
    setPageState(false);
    setTextPlace("듣고 싶은 말을 적어주세요..");
  };

  const handleTextareaChange = (event) => {
    const { value, name } = event.target;
    setNewVoice({
      ...newVoice,
      firstLine: `${content.slice(0, 12)}...`,
      length: content.length + 1,
      writtenDate: formattedDate,
      [name]: value,
    });
  };

  const handleCreateVoice = async () => {
    try {
      setLoading(true);
      let body = {
        memberId: "johnk7795",
        roomId: "1",
        text: `${newVoice.content}`,
      };
      const response = await axios.post(
        "http://3.39.166.51:8080/room/ttssound/generate",
        body
      );
      setAudioUrl(response.data.result.url);
      console.log(audioUrl);
      setViewText(response.data.result.content);
    } catch (e) {
      console.log(e);
    }

    setNewVoice((prevVoice) => ({ ...prevVoice, url: audioUrl }));
    setVoices([...voices, newVoice]);
    setLoading(false);
    setPageState(true);
  };

  const handleVoiceButton = (index) => {
    console.log(voices[index]);
    setPageState(true);
    setAudioUrl(voices[index].url);
    setViewText(voices[index].content);
  };

  return (
    <>
      <div className="tts-container">
        <div className="multiple-container">
          <div className="title-heading">{name}님의 목소리</div>
          <div className="tts-textarea">
            {pageState ? (
              <div>
                <div className="voice-textfield">
                  <p className="text-detail">{viewText}</p>
                </div>
                <div className="add-voice-button">
                  <IconButton
                    onClick={handleAddButton}
                    aria-label="add"
                    size="medium"
                  >
                    <AddCircle
                      color="primary"
                      fontSize="medium"
                      sx={{ color: "#a09185" }}
                    />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div>
                {loading ? (
                  <div className="tts-loading">
                    <div>목소리 생성중입니다...</div>
                    <div>
                      <img src={Spinner} alt="로딩중" width="25%" />
                    </div>
                  </div>
                ) : (
                  <>
                    <textarea
                      className="ttstextarea"
                      name="content"
                      cols="87"
                      rows="14"
                      placeholder={textPlace}
                      value={content}
                      onChange={handleTextareaChange}
                    />
                    <div className="create-voice-div">
                      <Button
                        onClick={handleCreateVoice}
                        variant="contained"
                        size="small"
                        sx={{
                          color: "white",
                          fontSize: "10px",
                          marginRight: "5px",
                          backgroundColor: "#a09185",
                          "&:hover": {
                            backgroundColor: "#60574f", // 마우스를 올렸을 때 배경색
                          },
                          "&:active": {
                            backgroundColor: "#60574f", // 클릭했을 때 배경색
                          },
                        }}
                      >
                        목소리 생성하기
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="audio-player">
            <AudioPlayer
              className="audioplayer"
              autoPlay={false}
              src={audioUrl}
              onPlay={(e) => console.log("onPlay")}
            />
          </div>
        </div>
        <div className="audio-container">
          {voices.map((content, index) => (
            <TtsComponent
              key={index}
              firstLine={content.firstLine}
              length={content.length}
              createdAt={content.writtenDate}
              content={content.content}
              onClick={() => handleVoiceButton(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TtsPage;
