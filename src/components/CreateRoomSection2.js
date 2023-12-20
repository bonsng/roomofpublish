import "./CreateRoomSection2.css";
import PageNumber from "./PageNumber";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import arrow from "../images/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export let userFormData_new = new FormData();

function CreateRoomSection2() {
  userFormData_new = new FormData();
  let values = userFormData_new.values();
  for (const pair of values) {
    console.log(pair);
  }
  const navigate = useNavigate();
  const upload_url = "http://3.39.166.51:8080/room/image/upload";
  const [images, setImages] = useState([]);

  const maxNumber = 100;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const emptyImageList = (imageList) => {
    if (images.length === 0) {
      return <div className="emptyImage">사진이 없습니다!</div>;
    }
  };
  const onClick = (e) => {
    e.preventDefault();
    // for (let i = 0; i < images.length; i++) {
    //   imageFile.push(images[i].file);
    // }
    // const test_file = new FormData();
    // test_file.append("file", imageFile[0]);
    // console.log(test_file);

    for (let i = 0; i < images.length; i++) {
      userFormData_new.append("images", images[i].file);
    }

    // let token = localStorage.getItem("access-token");
    // await axios
    //   .post(upload_url, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    navigate({ pathname: "/createRoom/3" });
  };

  return (
    <>
      <section className="section1">
        <div className="section-box2">
          <div className="header-container">
            <div className="header-text">사진 파일 업로드</div>
            <div className="header-number">
              <PageNumber num={2} />
            </div>
          </div>
          <div className="form-value2">
            <div className="form-box2">
              <ImageUploading
                multiple
                value={images}
                type="file"
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg", ".wav"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload-image-wrapper">
                    <div className="button-section">
                      <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="file-select-btn"
                      >
                        <br />
                        파일을 여기에 올려주세요
                        <br /> 혹은
                        <br /> 파일선택
                      </button>
                      <button onClick={onImageRemoveAll}>
                        사진 모두 지우기
                      </button>
                    </div>
                    <div className="images-container">
                      {emptyImageList()}
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            src={image.data_url}
                            alt=""
                            width="155"
                            height="100"
                          />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)}>
                              지우기
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          <div className={`signupBtn`} onClick={onClick}>
            <img className="arrow" alt="Arrow" src={arrow} />
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateRoomSection2;
