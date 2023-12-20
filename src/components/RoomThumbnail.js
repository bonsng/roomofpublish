import "./RoomThumbnail.css";
import lock_img from "./299105_lock_icon.png";

function RoomThumbnail({ birthDate, name, onClick, ifPublic }) {
  const editedBirth_year = birthDate.slice(0, 4);
  const editedBirth_month = birthDate.slice(4, 6);
  const editedBirth_day = birthDate.slice(6, 8);
  return (
    <>
      <div onClick={onClick} className="thumbs-container">
        <div className="thumb-container">
          <div className="info-container">
            <h3 className="thumb-h3">{name} 님의 방</h3>
            <p className="thumb-p">
              생년월일 : {editedBirth_year}-{editedBirth_month}-
              {editedBirth_day}
            </p>
          </div>
          {ifPublic ? <img src={lock_img} className="lock-img" /> : null}
        </div>
      </div>
    </>
  );
}

export default RoomThumbnail;
