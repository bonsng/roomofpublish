import styles from "./HomePage.module.css";
import CustomButton from "../components/CustomButton";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
  const navigate = useNavigate();
  const loginId = localStorage.getItem("loginId");
  const handleCreate = (e) => {
    if (!loginId) {
      alert("로그인을 먼저 해주세요.");
      navigate({ pathname: "/login" });
    } else {
      navigate({ pathname: "/createRoom/1" });
    }
  };
  const handleEnter = () => {
    if (!loginId) {
      alert("로그인을 먼저 해주세요.");
      navigate({ pathname: "/login" });
    } else {
      navigate({ pathname: "/enterRoom" });
    }
  };
  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.overlay_group}>
          <div className={styles.text_group}>
            <div>
              <h1 className={styles.title1}>사랑하는 사람과의 재회</h1>
              <p className={styles.subtitle}>
                사랑하는 사람을 만날 수 있는 3D 가상 공간
              </p>
            </div>
            <div className={styles.button}>
              {/* <CustomButton onClick={handleCreate}>
                추모공간 생성하기
              </CustomButton> */}
              <Button
                variant="outlined"
                size="large"
                onClick={handleCreate}
                sx={{
                  width: "200px",
                  height: "50px",
                  color: "white",
                  border: "transparent ",
                  boxShadow: "0 0 10px rgba(0,0,0,0.8)",
                  marginBottom: "10px",
                  "&:hover": {
                    border: "1px solid rgba(0,0,0,0.8)",
                  },
                }}
              >
                추모공간 생성하기
              </Button>
            </div>
            <div className={styles.button}>
              {/* <CustomButton onClick={handleEnter}>
                추모공간 입장하기
              </CustomButton> */}
              <Button
                variant="outlined"
                size="large"
                onClick={handleEnter}
                sx={{
                  width: "200px",
                  height: "50px",
                  color: "white",
                  border: "transparent ",
                  boxShadow: "0 0 10px rgba(0,0,0,0.8)",
                  marginBottom: "10px",
                  "&:hover": {
                    border: "1px solid rgba(0,0,0,0.8)",
                  },
                }}
              >
                추모공간 입장하기
              </Button>
            </div>
          </div>
          <div className={styles.side_button}>
            <button className={styles.button1}>
              <Link to={"/exampleRoom"} className={styles.link_button}>
                <div className={styles.frame}>
                  <div className={styles.overlap_group}>
                    <div className={styles.text_wrapper}>RoomOF</div>
                    <div className={styles.div}>
                      예시 가상공간
                      <br />
                      보기
                    </div>
                    <img
                      className={styles.vector}
                      alt="Vector"
                      src="https://c.animaapp.com/5GSItYbF/img/vector.svg"
                    />
                  </div>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
