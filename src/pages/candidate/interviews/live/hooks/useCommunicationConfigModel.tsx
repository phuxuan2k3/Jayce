import { useEffect, useMemo, useRef } from "react";
import { GetInterviewQuestionResponse } from "../../../../../features/interviews/api/interview.api";
import { LIPSYNC_MAP, ModelRender } from "../types/render";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function useCommunicationConfigModel({
	base64Audio,
	mouthCues,
	modelRender: { nodes },
}: {
	mouthCues: GetInterviewQuestionResponse["lipsync"]["mouthCues"];
	base64Audio: string;
	modelRender: ModelRender;
}) {
	const audio = useMemo(() => transcribeAudioFromBase64(base64Audio), [base64Audio]);
	const currentMouthCuesIndex = useRef<number>(0);

	// Setting up the audio and event listeners
	useEffect(() => {
		if (!audio) {
			resetInfluenceWeight(nodes);
			return
		}
		const handleCanPlay = () => {
			audio.play().catch((error) => {
				console.error("Error playing audio:", error);
			});
		}
		const handleAudioEnded = () => {
			resetInfluenceWeight(nodes);
			currentMouthCuesIndex.current = 0;
		};
		audio.preload = "none";
		audio.addEventListener("canplay", handleCanPlay);
		audio.addEventListener("ended", handleAudioEnded);
		return () => {
			audio.removeEventListener("canplay", handleCanPlay);
			audio.removeEventListener("ended", handleAudioEnded);
		}
	}, [audio]);

	useFrame(() => {
		let found = false;
		for (let i = currentMouthCuesIndex.current; i < mouthCues.length; i++) {
			if (
				audio.currentTime >= mouthCues[i].start &&
				audio.currentTime <= mouthCues[i].end
			) {
				if (currentMouthCuesIndex.current != i) {
					updateInfluenceWeight(nodes, mouthCues[currentMouthCuesIndex.current].value, 0);
					currentMouthCuesIndex.current = i;
				}
				found = true;
			}
		}
		if (!found) { return; };
		const currentMouthCue = mouthCues[currentMouthCuesIndex.current];
		const timeMedium = (currentMouthCue.end + currentMouthCue.start) / 2;
		const ratio = easeInOut(audio.currentTime, timeMedium);
		const influenceWeight = Math.max(0, Math.min(1, ratio));
		const influenceOldValue = getInfluenceWeight(nodes, currentMouthCue.value);
		if (influenceOldValue === null) return;
		const influenceNewValue = THREE.MathUtils.lerp(influenceOldValue, influenceWeight, 0.1);
		updateInfluenceWeight(nodes, currentMouthCue.value, influenceNewValue);
	});
}

function transcribeAudioFromBase64(base64: string): HTMLAudioElement {
	try {
		const binaryString = atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		const blob = new Blob([bytes], { type: "audio/mpeg" });
		const url = URL.createObjectURL(blob);

		const audio = new Audio(url);
		return audio;
	}
	catch (error) {
		console.error("Error transcribing audio from base64:", error);
		return new Audio();
	}
}

const updateInfluenceWeight = (nodes: ModelRender["nodes"], lipsyncKey: string, value: number) => {
	if (!lipsyncKey) return;
	const key = LIPSYNC_MAP[lipsyncKey as keyof typeof LIPSYNC_MAP];
	if (
		!key ||
		!nodes.Wolf3D_Head.morphTargetInfluences ||
		!nodes.Wolf3D_Head.morphTargetDictionary?.[key] ||
		!nodes.Wolf3D_Teeth.morphTargetInfluences ||
		!nodes.Wolf3D_Teeth.morphTargetDictionary?.[key]
	) return;
	nodes.Wolf3D_Head.morphTargetInfluences[
		nodes.Wolf3D_Head.morphTargetDictionary[key]
	] = value;
	nodes.Wolf3D_Teeth.morphTargetInfluences[
		nodes.Wolf3D_Teeth.morphTargetDictionary[key]
	] = value;
}

const resetInfluenceWeight = (nodes: ModelRender["nodes"]) => {
	Object.values(LIPSYNC_MAP).forEach((value) => {
		if (
			!nodes.Wolf3D_Head.morphTargetInfluences ||
			!nodes.Wolf3D_Head.morphTargetDictionary?.[value] ||
			!nodes.Wolf3D_Teeth.morphTargetInfluences ||
			!nodes.Wolf3D_Teeth.morphTargetDictionary?.[value]
		) return;

		nodes.Wolf3D_Head.morphTargetInfluences[
			nodes.Wolf3D_Head.morphTargetDictionary[value]
		] = 0;
		nodes.Wolf3D_Teeth.morphTargetInfluences[
			nodes.Wolf3D_Teeth.morphTargetDictionary[value]
		] = 0;
	});
}

function easeInOut(x: number, peak: number) {
	const radians = (Math.PI * x) / (2 * peak);
	return Math.pow(Math.sin(radians), 2);
}

const getInfluenceWeight = (nodes: ModelRender["nodes"], lipsyncKey: string) => {
	if (!lipsyncKey) return null;
	const key = LIPSYNC_MAP[lipsyncKey as keyof typeof LIPSYNC_MAP];
	if (
		!key ||
		!nodes.Wolf3D_Head.morphTargetInfluences ||
		!nodes.Wolf3D_Head.morphTargetDictionary?.[key] ||
		!nodes.Wolf3D_Teeth.morphTargetInfluences ||
		!nodes.Wolf3D_Teeth.morphTargetDictionary?.[key]
	) return null;
	// They have the same value, so we can return one of them
	return nodes.Wolf3D_Head.morphTargetInfluences[
		nodes.Wolf3D_Head.morphTargetDictionary[key]
	]
}	