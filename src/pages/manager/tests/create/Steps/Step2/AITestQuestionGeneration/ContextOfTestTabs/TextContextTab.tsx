const MAX_TEXT_LENGTH = 2000;

export default function TextContextTab({
	text,
	onTextChange,
}: {
	text: string;
	onTextChange: (text: string) => void;
}) {
	return (
		<div className="h-fit mt-2 mb-4 rounded-lg flex flex-col gap-4 p-4">
			<textarea className="p-2 px-4 bg-gray-100 min-h-[160px]  rounded-lg w-full"
				value={text}
				onChange={(e) => onTextChange(e.target.value)}
				placeholder="Write your context here..."
				maxLength={MAX_TEXT_LENGTH}>
			</textarea>
			<div className=" text-gray-600 text-sm">
				{text.length}/{MAX_TEXT_LENGTH}
			</div>
		</div>
	);
}
