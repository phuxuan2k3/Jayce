import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { startTransition } from "react";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function Experience(props) {
  const texture = useTexture("textures/room.jpeg");
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <OrbitControls />
      <Avatar
        audioRef={props.audioRef}
        libsyncRef={props.libsyncRef}
        position={[0, -4, 6]}
        scale={2.5}
      />
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
}
