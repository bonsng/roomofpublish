import "./TtsComponent.css";

const TtsComponent = ({ firstLine, length, createdAt, onClick, content }) => {
  return (
    <div onClick={onClick} className="ttscomponent-container">
      <div className="first-line-container">
        <h3 className="first-line-h3">{firstLine}</h3>
      </div>
      <div>
        <p className="created-p">{createdAt}</p>
      </div>
    </div>
  );
};

export default TtsComponent;
