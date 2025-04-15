import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Background({
	backgroundId = 1,
}: {
	backgroundId?: number;
}) {
	const realBackgroundId = (backgroundId > 5 || backgroundId < 1) ? 1 : backgroundId;
	const viewport = useThree((state) => state.viewport);
	const texture = useTexture(`/textures/room${realBackgroundId}.jpeg`);

	return (
		<mesh>
			<planeGeometry args={[viewport.width, viewport.height]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	)
}
