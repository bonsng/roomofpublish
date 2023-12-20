import ImageGallery from "react-image-gallery";
import "./ExampleRoomItemsPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function UserRoomItemsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [imageItems, setImageItems] = useState([
    { original: "", thumbnail: "" },
  ]);
  const { original, thumbnail } = imageItems;
  const [loading, setLoading] = useState(false);
  const backButton = () => {
    navigate(`/userRoom?id=${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://3.39.166.51:8080/room/image?roomId=${id}&ifRandom=false`
        );
        let image_urls = [];
        response.data.result.imageUrls.forEach((element) => {
          let image_form = { original: "", thumbnail: "" };
          image_form.original = element;
          image_form.thumbnail = element;
          image_urls.push(image_form);
        });
        console.log(image_urls);
        setImageItems([...image_urls]);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="items-bg"></div>
      <div className="back-button" onClick={backButton}>{`Back`}</div>
      <ImageGallery items={imageItems} />
    </>
  );
}

export default UserRoomItemsPage;
