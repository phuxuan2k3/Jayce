import { useAudioContext } from "../contexts/audio.context";
import { ModelRender } from "../types/render";
import { useAnimationConfigModel } from "./useAnimationConfigModel";
import useCommunicationConfigModel from "./useCommunicationConfigModel";
import * as THREE from "three";

export function useConfigModel({
	groupRef,
	modelRender,
}: {
	groupRef: React.MutableRefObject<THREE.Group | null>;
	modelRender: ModelRender;
}) {
	const { mouthCues, audio } = useAudioContext();

	useAnimationConfigModel({ groupRef });
	useCommunicationConfigModel({
		audio,
		mouthCues,
		modelRender,
	});
}