import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelWithAnimation from './components/Model3Ds/ModelWithAnimation';

export default function CandidateInterviewLivePage() {
	const [isShowModel, setIsShowModel] = useState(false);
	return (
		<>
			<div>
				<button onClick={() => setIsShowModel(!isShowModel)}>Toggle Model</button>
			</div>
			{(isShowModel == true) && (
				<Suspense fallback={<div>Loading...</div>}>
					<Canvas
						style={{
							aspectRatio: "auto",
							height: "100vh",
							zIndex: "-1",
						}}
						shadows
						camera={{ position: [0, 0, 8], fov: 42 }}
					>
						<ModelWithAnimation />
					</Canvas>
				</Suspense>
			)
			}
		</>
	);
}
