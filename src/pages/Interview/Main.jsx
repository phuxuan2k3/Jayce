import { Canvas } from "@react-three/fiber";
import { Experience as Female } from "./characters/Alice/Experience";
import { Experience as Male } from "./characters/John/Experience";
import { Experience as Jenny } from "./characters/Jenny/Experience";
import { Experience as Peter } from "./characters/Peter/Experience";
import Navbar from "../../components/Navbar";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { services } from "./service";
import { Input } from "@mui/material";
import CircularWithValueLabel from "./loading";
import InterviewManager from "./interviewManager";
import { Question } from "./models";
import { useTexture } from "@react-three/drei";

function Interview(props) {
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);
  const loadingRef = useRef(false);
  const [libsync, setLibsync] = useState(null);
  const libsyncRef = useRef(null);
  const inputRef = useRef(null);
  const interviewManager = useRef();
  const currentQuestion = useRef(new Question());
  const [character, setCharacter] = useState(1);
  const [texture, setTexture] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      if (props.interviewID == "") {
        return;
      }
      console.log("Interview ID: ", props.interviewID);

      interviewManager.current = new InterviewManager(
        props.interviewID,
        null,
        0
      );

      loadingRef.current = true;

      currentQuestion.current = await interviewManager.current.getQuestion();

      // if currentQuestion.current.isLastQuestion == true;

      loadingRef.current = false;

      playLibsync();
    };

    fetchData();

  }, [props.interviewID]);


  const handleAnswer = async () => {
    const text = inputRef.current.value;
    console.log(text);
    interviewManager.current.submitAnswer(text);
    if (currentQuestion.current.isLastQuestion) {
      alert("Kết thúc phỏng vấn");
      return;
    }
    currentQuestion.current = await interviewManager.current.getQuestion();
    playLibsync();
  };

  function playLibsync() {
    // audioRef.current = new Audio(currentQuestion.current.audio);
    libsyncRef.current = currentQuestion.current.lipsync;
    // audioRef.current.play();
    playMp3FromBase64(currentQuestion.current.audio);
  }

  function changeCharacter() {
    let newCharacter = character + 1;
    if (newCharacter > 4) {
      newCharacter = 1;
    }
    setCharacter(newCharacter);
  }
  function changeTexture() {
    let newTexture = texture + 1;
    if (newTexture > 4) {
      newTexture = 1;
    }
    setTexture(newTexture);
  }

  function playMp3FromBase64(base64) {
    try {
      const decodedBytes = base64ToUint8Array(base64);
      const blob = new Blob([decodedBytes], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      audioRef.current = new Audio(url);
      audioRef.current.addEventListener("error", (error) => {
        console.error("Audio playback error:", error);
      });
      audioRef.current.play();

      audioRef.current.onended = () => URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error playing MP3:", error);
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

  function Character() {
    if (character == 1) {
      return <Male audioRef={audioRef} libsyncRef={libsyncRef} texture={useTexture(`textures/room${texture}.jpeg`)} />;
    }
    if (character == 2) {
      return <Female audioRef={audioRef} libsyncRef={libsyncRef} texture={useTexture(`textures/room${texture}.jpeg`)} />;
    }
    if (character == 3) {
      return <Jenny audioRef={audioRef} libsyncRef={libsyncRef} texture={useTexture(`textures/room${texture}.jpeg`)} />;
    }
    if (character == 4) {
      return <Peter audioRef={audioRef} libsyncRef={libsyncRef} texture={useTexture(`textures/room${texture}.jpeg`)} />;
    }
  }

  return (
    <>
      <Navbar />

      
      <div
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "0",
          position: "fixed",
          top: "100px",
          backgroundColor: "transparent",
        }}
      >
        <div style={{ backgroundColor: "white" }}>

          {
            props.started ? <>
              <Input
                multiline
                sx={{ width: "300px" }}
                inputRef={inputRef}
                placeholder="Nhập nội dung"
              />
              <button onClick={handleAnswer}>Trả lời</button>
            </>
              : <>
                <br></br>
                <button onClick={() => changeCharacter()}>Đổi nhân vật</button>
                <br></br>
                <button onClick={() => changeTexture()}>Đổi phòng</button>
                <br></br>
              </>
          }
          <CircularWithValueLabel isLoading={loadingRef} />
        </div>
      </div >
      

      <Canvas
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "-1",
          position: "fixed",
          top: "50px",
        }}
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
      >
        <color attach="background" args={["#ececec"]} />
        <Character />
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
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div>
      <button onClick={toggleCamera}>
        {isCameraOn ? "Tắt Camera" : "Bật Camera"}
      </button>
      {isCameraOn && (
        <Webcam style={{ width: "300px", height: "200px" }} ref={webcamRef} />
      )}
    </div>
  );
};

export default Interview;
