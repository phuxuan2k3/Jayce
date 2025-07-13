import React from 'react';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2';
import AttemptCard from './AttemptCard';
import { useLanguage } from '../../../../LanguageProvider';

interface Props {
	attempts: AttemptCoreSchema[];
	onItemClick?: (attempt: AttemptCoreSchema) => void;
}

const AttemptsList: React.FC<Props> = ({
	attempts,
	onItemClick,
}) => {
	const { t } = useLanguage();

	if (attempts.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600 mb-4">{t("attempts_list_empty_message")}</p>
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
