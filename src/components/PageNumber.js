import "./PageNumber.css";

function PageNumber({ num }) {
  return (
    <>
      <div className="pageNumber-box">
        <div className={`pageNumber ${num === 1 ? "selected" : ""}`}>1</div>
        <div className={`pageNumber ${num === 2 ? "selected" : ""}`}>2</div>
        <div className={`pageNumber ${num === 3 ? "selected" : ""}`}>3</div>
        <div className={`pageNumber ${num === 4 ? "selected" : ""}`}>4</div>
        <div className={`pageNumber ${num === 5 ? "selected" : ""}`}>5</div>
        <div className={`pageNumber ${num === 6 ? "selected" : ""}`}>6</div>
      </div>
    </>
  );
}

export default PageNumber;
