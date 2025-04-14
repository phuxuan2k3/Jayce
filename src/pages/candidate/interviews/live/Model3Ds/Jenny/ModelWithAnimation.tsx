import { useThree } from '@react-three/fiber';
import { Model } from './Model'
import { Environment, useTexture } from '@react-three/drei';

export default function ModelWithAnimation() {
	const viewport = useThree((state) => state.viewport);
	const textture = useTexture('/textures/room1.jpeg');

	return (
		<>
			{/* Default background */}
			<color attach="background" args={["#ececec"]} />

			<Model
				position={[0, -4, 5]}
				scale={2.5}
			/>

			<Environment preset="sunset" />

			<mesh>
				<planeGeometry args={[viewport.width, viewport.height]} />
				<meshBasicMaterial map={textture} />
			</mesh>
		</>
	)
}
