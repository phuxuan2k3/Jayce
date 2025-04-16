import * as THREE from 'three'

export type ModelRender = {
	nodes: {
		Wolf3D_Hair: THREE.SkinnedMesh
		Wolf3D_Body: THREE.SkinnedMesh
		Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
		Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
		Wolf3D_Outfit_Top: THREE.SkinnedMesh
		EyeLeft: THREE.SkinnedMesh
		EyeRight: THREE.SkinnedMesh
		Wolf3D_Head: THREE.SkinnedMesh
		Wolf3D_Teeth: THREE.SkinnedMesh
		Hips: THREE.Bone
	};
	materials: {
		Wolf3D_Hair: THREE.MeshStandardMaterial
		Wolf3D_Body: THREE.MeshStandardMaterial
		Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial
		Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial
		Wolf3D_Outfit_Top: THREE.MeshStandardMaterial
		Wolf3D_Eye: THREE.MeshStandardMaterial
		Wolf3D_Skin: THREE.MeshStandardMaterial
		Wolf3D_Teeth: THREE.MeshStandardMaterial
	};
};

export const LIPSYNC_MAP = {
	A: "viseme_PP",
	B: "viseme_kk",
	C: "viseme_I",
	D: "viseme_AA",
	E: "viseme_O",
	F: "viseme_U",
	G: "viseme_FF",
	H: "viseme_TH",
	X: "viseme_sil",
} as const;

export type Models = "Jenny" | "Alice";
export type Backgrounds = 1 | 2 | 3 | 4;
export type MouthCue = {
	start: number;
	end: number;
	value: string;
};