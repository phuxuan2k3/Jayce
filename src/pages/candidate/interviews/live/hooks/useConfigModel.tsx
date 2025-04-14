import { useGetQuestionQuery } from "../../../../../features/interviews/api/interview.api";
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
	const query = useGetQuestionQuery({
		interviewId: "1",
		questionIndex: 1,
	});
	useAnimationConfigModel({ groupRef });
	useCommunicationConfigModel({
		base64Audio: query.data?.audio || "",
		mouthCues: query.data?.lipsync.mouthCues || [],
		modelRender,
	});
}