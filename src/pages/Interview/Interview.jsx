import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import Navbar from "../../components/Navbar";
import { useState,useRef } from "react";
import Webcam from "react-webcam";

function Interview() {
  const [play, setPlay] = useState(false);
  const handlePlay = () => {
    setPlay(!play);
  }

  return (
    <>
    <Navbar/>
    <div style={{width:"100%", height:"100vh", zIndex:"0",position:"fixed", top:"100px", backgroundColor:"transparent"}}>
      <button onClick={handlePlay}>nút play here</button>
      <WebcamComponent/>
    </div>
    <Canvas style={{width:"100%", height:"100vh", zIndex:"-1", position:"fixed", top:"50px"}} shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience play={play}/>
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
      {isCameraOn && <Webcam style={{width:"300px", height:"200px"}} ref={webcamRef} />}
    </div>
  );
};


export default Interview;
