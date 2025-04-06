import { Canvas } from "@react-three/fiber";
import { Experience as Female } from "./Female/Experience";
import {Experience as Male} from "./Experience";
import Navbar from "../../components/Navbar";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { services } from './service'
import { Input } from "@mui/material";
import CircularWithValueLabel from "./loading";
import InterviewManager from "./interviewManager";
import { Question } from "./models";
const interviewID = "123";

function Interview() {
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);
  const loadingRef = useRef(false);
  const [libsync, setLibsync] = useState(null);
  const libsyncRef = useRef(null);
  const inputRef = useRef(null);
  const interviewManager = useRef(new InterviewManager(interviewID));
  const currentQuestion = useRef(new Question());
  const [character, setCharacter] = useState(1);

useEffect(async () => {
  loadingRef.current = true;

  await interviewManager.current.requestInitQuestions();

  loadingRef.current = false;

   currentQuestion.current = await interviewManager.current.getQuestion();

   playLibsync();
}, []);

const handleAnswer = async () => {
  const text = inputRef.current.value;
  console.log(text);
  interviewManager.current.submitAnswer(text);
  if (currentQuestion.current.isEnd) {
    alert("Kết thúc phỏng vấn");
    return;
  }
  currentQuestion.current = await interviewManager.current.getQuestion();
  playLibsync();
}

function playLibsync() {
  audioRef.current = (new Audio(currentQuestion.current.audio));
  libsyncRef.current = currentQuestion.current.libsync.data.json_result;
  // audioRef.current.play();
  playMp3FromBase64(currentQuestion.current.audio);
}

function changeCharacter() {
  let newCharacter = character + 1;
  if (newCharacter > 2) {
    newCharacter = 1;
  }
  setCharacter(newCharacter)
}

function playMp3FromBase64(base64) {
  try {
    const decodedBytes = base64ToUint8Array(base64);
    const blob = new Blob([decodedBytes], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.addEventListener('error', (error) => {
      console.error('Audio playback error:', error);
      document.getElementById("result").innerText = "Error playing audio.";
    });
    audio.play();

    audio.onended = () => URL.revokeObjectURL(url);
    document.getElementById("result").innerText = "Audio played successfully!";
  } catch (error) {
      console.error("Error playing MP3:", error);
      document.getElementById("result").innerText = "Error playing audio.";
  }
}

function base64ToUint8Array(base64) {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (error) {
    console.error("Base64 decoding error:", error);
    document.getElementById("result").innerText = "Error decoding audio.";
    return null;
  }
}

  // function fetchVoice(text) {
  //   loadingRef.current = true;
  //   Promise.all([
  //     service.ConvertTextToSpeech(text, "en", "male"),
  //     service.GetLibSync(text, "en", "male")
  //   ])
  //     .then(([audioRes, libSyncRes]) => {
  //       if (audioRes) {
  //         audioRef.current = (new Audio(audioRes));
  //       } else {
  //         console.error("Không thể phát âm thanh");
  //       }
  //       loadingRef.current = false;

  //       libsyncRef.current = libSyncRes.data.json_result;
  //       audioRef.current.play();

  //     })
  //     .catch((err) => {
  //       console.error("Lỗi khi fetch dữ liệu:", err);
  //     }).finally(() => {
  //     }
  //     );
  // }

  return (
    <>
      <Navbar />

      <div style={{ width: "100%", height: "100vh", zIndex: "0", position: "fixed", top: "100px", backgroundColor: "transparent" }}>
        <div style={{ backgroundColor: "white" }}>
          <Input multiline sx={{ width: "300px" }} inputRef={inputRef} placeholder="Nhập nội dung" />
          <button onClick={handleAnswer}>Trả lời</button>
          <button onClick={() => changeCharacter()}>Đổi nhân vật</button>
          <br></br>
          <CircularWithValueLabel isLoading={loadingRef} />
        </div>
        {/* <WebcamComponent /> */}
      </div >

      <Canvas style={{ width: "100%", height: "100vh", zIndex: "-1", position: "fixed", top: "50px" }} shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={["#ececec"]} />
        { (character == 1) &&
          <Male            audioRef={audioRef} libsyncRef={libsyncRef}
          />}
        {(character == 2) &&
        <Female/ >}
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
