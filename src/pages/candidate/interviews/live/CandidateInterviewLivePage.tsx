import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelWithAnimation from './Model3Ds/Jenny/ModelWithAnimation';

export default function CandidateInterviewLivePage() {


	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Canvas
				style={{
					width: "100%",
					height: "100vh",
					zIndex: "-1",
					position: "fixed",
					top: "50px",
				}}
				shadows
				camera={{ position: [0, 0, 8], fov: 42 }}
			>
				<ModelWithAnimation />
			</Canvas>
		</Suspense>
	);
}
