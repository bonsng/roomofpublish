import { useState } from "react";
import "./CreateRoomVoiceSection.css";
import PageNumber from "./PageNumber";
import arrow from "../images/arrow.png";
import { useNavigate } from "react-router-dom";
import { userFormData_new } from "./CreateRoomSection2";
import { userDetails } from "./CreateRoomSection1";

function CreateRoomVoiceSection() {
  const user_birth = userDetails.birthYear;
  const user_name = userDetails.name;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Filter only wav files
    const wavFiles = newFiles.filter((file) =>
      file.name.toLowerCase().endsWith(".wav")
    );

    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...wavFiles.map((file) => ({
        file: file,
        modifiedName: `${user_name}_${Date.now()}_audio.wav`,
      })),
    ]);
  };
  const handleDeleteFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleNext = () => {
    if (selectedFiles.length !== 0) {
      console.log(selectedFiles);
      for (const { file, modifiedName } of selectedFiles) {
        userFormData_new.append("sounds", file, modifiedName);
      }
      navigate({ pathname: "/createRoom/4" });
    } else {
      alert("음성 파일을 넣어주세요!");
    }
  };

  return (
    <>
      <section className="section1">
        <div className="section-box2">
          <div className="header-container">
            <div className="header-text">음성 파일 업로드</div>
            <div className="header-number">
              <PageNumber num={4} />
            </div>
          </div>
          <div className="voice-input-container">
            <h3 className="voice-h3">
              학습시킬 음성 파일들을 업로드 해주세요. (.wav 파일)
            </h3>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".wav"
            />
            <div>
              <p className="voice-p">포함된 음성파일들:</p>
              <div className="files-contain">
                {selectedFiles ? (
                  <ul>
                    {Array.from(selectedFiles).map(
                      ({ modifiedName }, index) => (
                        <div className="li-div">
                          <li className="voice-li" key={index}>
                            {modifiedName}
                            <div>
                              <button onClick={() => handleDeleteFile(index)}>
                                삭제
                              </button>
                            </div>
                          </li>
                        </div>
                      )
                    )}
                  </ul>
                ) : (
                  <p>선택된 파일이 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          <div className={`signupBtn`} onClick={handleNext}>
            <img className="arrow" alt="Arrow" src={arrow} />
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateRoomVoiceSection;
