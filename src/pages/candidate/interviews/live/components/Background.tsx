import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Backgrounds } from '../types/render';

export default function Background({
	backgroundId = 1,
}: {
	backgroundId?: Backgrounds;
}) {
	const viewport = useThree((state) => state.viewport);
	const texture = useTexture(`/textures/room${backgroundId}.jpeg`);

	return (
		<mesh>
			<planeGeometry args={[viewport.width, viewport.height]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	)
}
