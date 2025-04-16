import { Environment } from '@react-three/drei';
import { lazy, Suspense, useMemo } from 'react';

export default function ModelDisplay({
	model = "Alice",
}: {
	model?: "Jenny" | "Alice";

}) {
	const Model = useMemo(() => {
		switch (model) {
			case "Jenny":
				return lazy(() => import('./Jenny/Model'));
			case "Alice":
				return lazy(() => import('./Alice/Model'));
			default:
				return lazy(() => import('./Alice/Model'));
		}
	}, [model]);

	return (
		<>
			<Suspense fallback={null}>
				<Model
					position={[0, -4, 5]}
					scale={2.5}
				/>
			</Suspense>

			<Environment preset="sunset" />
		</>
	)
}
