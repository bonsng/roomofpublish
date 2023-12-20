import "./RoomNavigation.css";
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const RoomNavigation = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate({ pathname: "/" });
  };
  return (
    <div className="room-navigation">
      <IconButton
        onClick={handleClick}
        aria-label="delete"
        size="large"
        sx={{
          marginLeft: "15px",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "#60574f", // 마우스를 올렸을 때 배경색
          },
        }}
      >
        <HomeIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default RoomNavigation;
