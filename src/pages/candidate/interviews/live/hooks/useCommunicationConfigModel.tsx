import { useEffect, useMemo, useRef } from "react";
import { GetInterviewQuestionResponse } from "../../../../../features/interviews/api/interview.api";
import { LIPSYNC_MAP, ModelRender } from "../types/render";
import { useFrame } from "@react-three/fiber";

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
	const lipsyncValues = useMemo(() => Object.values(LIPSYNC_MAP), []);
	const currentMouthCuesIndex = useRef<number>(0);

	// Initializing morphs
	useEffect(() => {
		lipsyncValues.forEach((value) => {
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
	}, []);

	// Setting up the audio and event listeners
	useEffect(() => {
		if (!audio) return;
		const handleCanPlay = () => {
			audio.play().catch((error) => {
				console.error("Error playing audio:", error);
			});
		}
		const handleAudioEnded = () => {
			const key = getKeyFromLipsyncKey(mouthCues[currentMouthCuesIndex.current].value);
			if (!key) return;
			updateInfluenceWeight(nodes, key, 0);
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
		const currentTime = audio.currentTime;
		const currentCue = mouthCues[currentMouthCuesIndex.current];
		if (!currentCue) return;
		for (let i = currentMouthCuesIndex.current; i < mouthCues.length; i++) {
			const mouthCue = mouthCues[i];
			if (currentTime >= mouthCue.start && currentTime <= mouthCue.end) {
				const prevKey = getKeyFromLipsyncKey(mouthCues[currentMouthCuesIndex.current].value);
				if (prevKey) {
					updateInfluenceWeight(nodes, prevKey, 0);
				}
				const newKey = getKeyFromLipsyncKey(mouthCue.value);
				if (newKey) {
					updateInfluenceWeight(nodes, newKey, 1);
				}
				currentMouthCuesIndex.current = i;
				break;
			}
		}
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

const updateInfluenceWeight = (nodes: ModelRender["nodes"], key: string, value: number) => {
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

const getKeyFromLipsyncKey = (lipsyncKey: string) => {
	if (!lipsyncKey) return null;
	const key = LIPSYNC_MAP[lipsyncKey as keyof typeof LIPSYNC_MAP];
	return key || null;
}