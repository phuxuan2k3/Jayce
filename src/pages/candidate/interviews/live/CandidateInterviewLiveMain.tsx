import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ModelDisplay from "./components/Model3Ds/ModelDisplay";
import SpinnerLoading from "../../../../components/ui/loading/SpinnerLoading";
import Background from "./components/Background";
import Overlay from "./components/Overlay/Overlay";
import { useBackgroundContext } from "./contexts/background-context";
import { useModelContext } from "./contexts/model-context";

export default function CandidateInterviewLiveMain() {
  const [isStarting, setIsStarting] = useState(false);
  const { background } = useBackgroundContext();
  const { model } = useModelContext();

  return (
    <div
      className="fixed top-0 left-0"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Model */}
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-10">
        {isStarting === false ? (
          <button
            className="bg-primary-toned-600 text-white font-semibold px-4 py-2 font-asap rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => setIsStarting(!isStarting)}
          >
            Let's Start
          </button>
        ) : (
          <Suspense
            fallback={
              <div className="bg-gray-200 rounded-lg shadow-md  flex items-center justify-center w-fit h-fit px-8 py-4">
                <SpinnerLoading />
              </div>
            }
          >
            {/* Overlay menu */}
            <div className="absolute top-0 left-0 w-full h-full">
              <Overlay />
            </div>

            {/* Main Model Display */}
            <Canvas
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "-1",
              }}
              shadows
              camera={{ position: [0, 0, 8], fov: 42 }}
            >
              <ModelDisplay model={model} />
            </Canvas>
          </Suspense>
        )}
      </div>

      {/* Blur background */}
      {isStarting === false ? (
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-50 z-0 backdrop-blur-md"></div>
      ) : undefined}

      {/* Background */}
      <div className="absolute left-0 top-0 w-full h-full ">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <SpinnerLoading />
            </div>
          }
        >
          <Canvas
            style={{
              aspectRatio: "auto",
              height: "100%",
              zIndex: "-1",
            }}
            shadows
            camera={{ position: [0, 0, 8], fov: 42 }}
          >
            <color attach="background" args={["#ececec"]} />
            <Background backgroundId={background} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
