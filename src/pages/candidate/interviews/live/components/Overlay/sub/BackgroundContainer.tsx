import { useBackgroundContext } from "../../../contexts/background-context";
import { Backgrounds } from "../../../types/render";

export default function BackgroundContainer() {
	const backgroundIds = [1, 2, 3, 4] as const;
	const { background, setBackground } = useBackgroundContext();

	return (
		<div className="bg-gray-200 flex items-center rounded-lg p-2 gap-x-2 overflow-x-auto overflow-y-hidden h-fit shadow-md w-full">
			{backgroundIds.map((backgroundId) => (
				<BackgroundItem
					isChosen={background === backgroundId}
					key={backgroundId}
					backgroundId={backgroundId}
					onBackgroundChange={setBackground}
				/>
			))}
		</div>
	);
}

function BackgroundItem({
	backgroundId,
	onBackgroundChange,
	isChosen,
}: {
	backgroundId: Backgrounds;
	onBackgroundChange: (backgroundId: Backgrounds) => void;
	isChosen: boolean;
}) {
	return (
		<div
			className={`w-24 h-16 rounded-lg cursor-pointer ${isChosen ? "border-2 border-primary-toned-600" : ""}`}
			style={{
				opacity: isChosen ? 1 : 0.5,
				transition: "all 0.3s ease-in-out",
			}}
		>
			<img
				src={`/textures/room${backgroundId}.jpeg`}
				alt={`room${backgroundId}`}
				className='w-24 h-16 rounded-lg cursor-pointer'
				onClick={() => onBackgroundChange(backgroundId)}
			/>
		</div>
	);
}