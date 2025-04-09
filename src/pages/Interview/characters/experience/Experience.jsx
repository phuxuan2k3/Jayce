import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { startTransition } from "react";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import { Avatar as Alice } from "../Alice/Avatar";
import { Avatar as John } from "../John/Avatar";
import { Avatar as Jenny } from "../Jenny/Avatar";
import { Avatar as Peter } from "../Peter/Avatar";
import { Experience as Male } from "./characters/John/Experience";
import { Experience as Jenny } from "./characters/Jenny/Experience";
import { Experience as Peter } from "./characters/Peter/Experience";


function getCharactor(props) {
  if (props.character == 1) {
    <Avatar audioRef={props.audioRef} libsyncRef={props.libsyncRef} position={[0, -4, 5]} scale={2.5} />
  }
}

export function Experience(props) {
  const viewport = useThree((state) => state.viewport)
  return (
    <>
      <OrbitControls />
      <Avatar audioRef={props.audioRef} libsyncRef={props.libsyncRef} position={[0, -4, 5]} scale={2.5} />
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={props.texture} />
      </mesh>
    </>
  );
};
