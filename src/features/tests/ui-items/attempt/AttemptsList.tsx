import React from 'react';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2';
import AttemptCard from './AttemptCard';

interface Props {
	attempts: AttemptCoreSchema[];
	onItemClick?: (attempt: AttemptCoreSchema) => void;
}

const AttemptsList: React.FC<Props> = ({
	attempts,
	onItemClick,
}) => {

	if (attempts.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600 mb-4">You don't have any completed attempts yet.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 items-stretch">
			{attempts.map((attempt) => (
				<AttemptCard key={attempt.id} attempt={attempt} onClick={onItemClick} />
			))}
		</div>
	);
};

export default AttemptsList;
