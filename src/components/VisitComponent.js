import "./VisitComponent.css";
import { ReactComponent as MyIcon } from "./user-circle.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function VisitComponent({ name, date, contents, onDelete }) {
  return (
    <>
      <div className="visit-container">
        <div className="user-info">
          <div className="user-info-container">
            <MyIcon className="my-icon" />
            <div className="namedate-container">
              <h3 className="name-h3">{name}</h3>
              <div className="date-div">
                <p className="date-p">{date}</p>
              </div>
            </div>
          </div>
          <div className="delete-button">
            <IconButton aria-label="delete" size="small" onClick={onDelete}>
              <DeleteIcon size="small" />
            </IconButton>
          </div>
        </div>
        <div className="content-wrapper">
          <p>{contents}</p>
        </div>
      </div>
    </>
  );
}
