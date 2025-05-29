import { ExamCore } from '../../../../../../../infra-test/core/test.model';

interface ExamHeaderProps {
	exam: ExamCore;
}

export const ExamHeader = ({ exam }: ExamHeaderProps) => {
	return (
		<header className="text-center">
			<h1 className="text-2xl font-bold text-primary-dark">{exam.title}</h1>
			<p className="text-sm text-gray-600 mt-2 max-w-3xl mx-auto">{exam.description}</p>
		</header>
	);
};
