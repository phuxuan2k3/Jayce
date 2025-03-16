import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import Navbar from "../../components/Navbar";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { service } from './service'
import { ne } from "@faker-js/faker";
import { Input } from "@mui/material";
import { setTextRange } from "typescript";
import CircularWithValueLabel from "./loading";

function Interview() {
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);
  const loadingRef = useRef(false);
  const [libsync, setLibsync] = useState(null);
  const libsyncRef = useRef(null);
  const handlePlay = () => {
    const text = inputRef.current.value;
    console.log(text);
    fetchVoice(text);
  }
  const inputRef = useRef(null);
  // useEffect(() => {
  //   if (audioRef.current == null)
  //     return;
  //   console.log("Play audio");
  //   audioRef.current.play();
  // }, [audioRef.current]);

  function fetchVoice(text) {
    loadingRef.current = true;
    Promise.all([
      service.ConvertTextToSpeech(text, "en", "male"),
      service.GetLibSync(text, "en", "male")
    ])
      .then(([audioRes, libSyncRes]) => {
        if (audioRes) {
          audioRef.current = (new Audio(audioRes));
        } else {
          console.error("Không thể phát âm thanh");
        }
        loadingRef.current = false;

        libsyncRef.current = libSyncRes.data.json_result;
        audioRef.current.play();

      })
      .catch((err) => {
        console.error("Lỗi khi fetch dữ liệu:", err);
      }).finally(() => {
      }
      );
  }

  return (
    <>
      <Navbar />

      <div style={{ width: "100%", height: "100vh", zIndex: "0", position: "fixed", top: "100px", backgroundColor: "transparent" }}>
        <div style={{ backgroundColor: "white" }}>
          <Input multiline sx={{ width: "300px" }} inputRef={inputRef} placeholder="Nhập nội dung" />
          <button onClick={handlePlay}>Generate Voice</button>
          <br></br>
          <CircularWithValueLabel isLoading={loadingRef} />
        </div>
        {/* <WebcamComponent /> */}
      </div >

      <Canvas style={{ width: "100%", height: "100vh", zIndex: "-1", position: "fixed", top: "50px" }} shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience
          audioRef={audioRef} libsyncRef={libsyncRef}
        />
      </Canvas>
    </>
  );
}

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleCamera = () => {
    if (isCameraOn) {
      // Dừng camera
      const stream = webcamRef.current?.video?.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div>
      <button onClick={toggleCamera}>
        {isCameraOn ? "Tắt Camera" : "Bật Camera"}
      </button>
      {isCameraOn && <Webcam style={{ width: "300px", height: "200px" }} ref={webcamRef} />}
    </div>
  );
};


export default Interview;
