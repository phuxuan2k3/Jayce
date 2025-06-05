interface ExamHeaderProps {
	title: string;
	description: string;
}

export const ExamHeader = ({ title, description }: ExamHeaderProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
			<h1 className="text-2xl font-bold text-primary mb-2">
				{title || "Untitled Exam"}
			</h1>
			<p className="text-gray-700">
				{description || "No description provided"}
			</p>
		</div>
	);
};
