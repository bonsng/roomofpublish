import ImageGallery from "react-image-gallery";
import "./ExampleRoomItemsPage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const images = [
  {
    original:
      "https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg",
    thumbnail:
      "https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg",
  },
];

function ExampleRoomItemsPage() {
  const [imageItems, setImageItems] = useState([]);
  const { original, thumbnail } = imageItems;
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "http://3.39.166.51:8080/room/video?roomId=1&ifRandom=true"
      );
      let video_urls = [];
      response.data.result.videoUrls.forEach((element) => {
        let video_form = { original: "", thumbnail: "" };
        video_form.original = element;
        video_form.thumbnail = element;
        video_urls.push(video_form);
      });
      console.log(video_urls);
      setImageItems((previtems) => [...previtems, ...video_urls]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://3.39.166.51:8080/room/image?roomId=1&ifRandom=false"
        );
        let image_urls = [];
        response.data.result.imageUrls.forEach((element) => {
          let image_form = { original: "", thumbnail: "" };
          image_form.thumbnail = element;
          image_form.original = element;
          image_urls.push(image_form);
        });
        console.log(image_urls);
        setImageItems((prevItems) => [...prevItems, ...image_urls]);
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
      <a className="back-button" href="/exampleRoom">
        {`Back`}
      </a>
      <ImageGallery items={imageItems} />
    </>
  );
}

export default ExampleRoomItemsPage;
