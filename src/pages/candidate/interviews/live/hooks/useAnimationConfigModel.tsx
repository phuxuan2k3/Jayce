import { useAnimations, useFBX } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export function useAnimationConfigModel({
	groupRef
}: {
	groupRef: React.MutableRefObject<THREE.Group | null>;
}) {
	const fbx = useFBX('/animations/Jenny_Idle.fbx');
	const animations = useAnimations(fbx.animations, groupRef);
	useEffect(() => {
		if (animations.actions && animations.actions[fbx.animations[0].name] != null) {
			const action = animations.actions[fbx.animations[0].name];
			if (action) {
				action.reset().fadeIn(0.5).play();
			}
		}
	}, [animations.actions, fbx.animations, groupRef]);
}