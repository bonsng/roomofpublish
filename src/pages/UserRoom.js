import React, { Suspense, useRef, useEffect, useState, createRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  useCursor,
  Image,
  Text,
  Html,
  Sky,
} from "@react-three/drei";
import { useRoute } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";
import * as THREE from "three";
import Model from "./Model";
import styles from "./ExampleRoom.module.css";
import { ControlledInput } from "../components/ControlledInputs";
import VisitPage from "../components/VisitPage";
import { VideoMaterial } from "../components/VideoComponents";
import axios from "axios";
import TtsPage from "../components/TtsPage";
import { useSearchParams } from "react-router-dom";
import "./UserRoom.css";
import RoomNavigation from "../components/RoomNavigation";
import Loading from "../components/Loading";

const GOLDENRATIO = 1.61803398875;

function UserRoom() {
  const frameSize = { width: 5.2, height: 5.2 };
  const images_position = [
    [3.5, 0, -12],
    [6, 0, -12],
    [8.5, 0, -12],
    [4.5, -4, -12],
    [7, -4, -12],
    [3.5, -8, -12],
    [6, -8, -12],
    [8.5, -8, -12],
  ];
  const video_position = [-4, -3, -12];
  const [searchParams] = useSearchParams();
  const inputValue = searchParams.get("id");
  console.log(inputValue);
  const ref = createRef();
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imagesInfo, setImagesInfo] = useState([]);
  const newImage = [];

  useEffect(() => {
    fetchData();
    fetchName();
    fetchVideo();
    console.log(imageUrl);
  }, []);

  const fetchName = async () => {
    await axios
      .get(`http://3.39.166.51:8080/room/info?roomId=${inputValue}`)
      .then((response) => {
        let searchName = response.data.result.name;
        setUserName(searchName);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchVideo = async () => {
    setLoading(true);
    await axios
      .get(
        `http://3.39.166.51:8080/room/video?roomId=${inputValue}&ifRandom=true`
      )
      .then((response) => {
        let video_url = "";
        video_url = response.data.result.videoUrls[0];
        setVideoUrl(video_url);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(
        `http://3.39.166.51:8080/room/image?roomId=${inputValue}&ifRandom=false`
      )
      .then((response) => {
        let image_url = [];
        response.data.result.imageUrls.forEach((element) => {
          image_url.push(element);
        });
        setImageUrl([...image_url]);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
  console.log(imageUrl);

  const image_urls = imageUrl.map((image, index) => ({
    position: images_position[index],
    rotation: [0, 0, 0],
    url: image,
  }));
  console.log(image_urls);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomNavigation />
      <div className={styles.roomCanvas}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ fov: 50, position: [0, 2, 10] }}
        >
          {/* <axesHelper scale={1} /> */}
          <color attach="background" args={["#E0E0E0"]} />
          <Suspense fallback={null}>
            <Stage
              controls={ref}
              preset="rembrandt"
              intensity={0.9}
              environment="sunset"
            >
              false
              <Model />
              false
            </Stage>
            <group position={[13, 0, 0]} rotation={[Math.PI / 2, 0, 1.6]}>
              <mesh>
                {/* Drei's HTML component can "hide behind" canvas geometry */}
                <Html
                  className="content"
                  rotation-x={-Math.PI / 2}
                  position={[0, 0.05, -0.09]}
                  transform
                  occlude
                >
                  <div
                    className="wrapper"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <VisitPage name={userName} id={inputValue} />
                  </div>
                </Html>
              </mesh>
            </group>
            <group position={[-13, 0, 0]} rotation={[Math.PI / 2, 0, -1.6]}>
              <mesh>
                {/* Drei's HTML component can "hide behind" canvas geometry */}
                <Html
                  className="content"
                  rotation-x={-Math.PI / 2}
                  position={[0, 0.05, -0.09]}
                  transform
                  occlude
                >
                  <div
                    className="wrapper"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <TtsPage name={userName} id={inputValue} />
                  </div>
                </Html>
              </mesh>
            </group>
            <Frames images={image_urls} id={inputValue} />
          </Suspense>
          {videoUrl !== "" && (
            <Video
              scale={[6, 6 * GOLDENRATIO, 0.1]}
              url={videoUrl}
              position={video_position}
              frameSize={frameSize}
            />
          )}
          <ambientLight intensity={0.4} />
          <Sky inclination={0.52} scale={40} />
          <OrbitControls enableZoom={true} enablePan={false} maxZoom={0.05} />;
        </Canvas>
      </div>
    </>
  );
}

export default UserRoom;

function Video({ scale, url, position, frameSize }) {
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  return (
    <group onClick={() => (window.location.href = "/exampleRoom/items")}>
      <mesh
        className={styles.videoCanvas}
        scale={scale}
        position={position}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry />
        <Suspense fallback={null}>
          <VideoMaterial url={url} />
        </Suspense>
      </mesh>
      <mesh position={[-4, -3, -12.1]} scale={[1.25, 2, 0.1]}>
        <planeGeometry args={[frameSize.width, frameSize.height]} />
        <meshBasicMaterial color="#3c312f" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Frames({ images, id }) {
  const ref = useRef();
  return (
    <group
      ref={ref}
      onClick={() => (window.location.href = `/userRoom/items?id=${id}`)}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "orange" : "white",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[2, 2 * GOLDENRATIO, 0.1]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
    </group>
  );
}

function Input(props) {
  const [text, setText] = useState(`TTS Text input`);
  return (
    <group {...props}>
      <Text
        position={[-1.2, -0.022, 0]}
        anchorX="0px"
        fontSize={0.01}
        letterSpacing={-0.0}
      >
        {text}
        <meshStandardMaterial color="black" />
      </Text>
      <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <Html transform>
        <ControlledInput
          type={text}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </Html>
    </group>
  );
}
