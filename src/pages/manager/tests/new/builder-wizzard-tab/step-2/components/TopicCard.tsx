import { useMemo, useState } from 'react';
import { DifficultiesAsConst, DifficultyType, Topic } from '../../../common/base-schema';
import MyFieldLayout from '../../../../../../../features/tests/ui/forms/MyFieldLayout';
import MyLabel from '../../../../../../../features/tests/ui/forms/MyLabel';
import MyTextArea from '../../../../../../../features/tests/ui/forms/MyTextArea';
import MyNumberInput from '../../../../../../../features/tests/ui/forms/MyNumberInput';
import MySelect from '../../../../../../../features/tests/ui/forms/MySelect';
import { Trash2 } from 'lucide-react';
import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../../../LanguageProvider';

interface TopicCardProps {
	topic: Topic;
	index: number;
	canDelete: boolean;
	onUpdate: (index: number, updates: Partial<Topic>) => void;
	onDelete: (index: number) => void;
}

export default function TopicCard({
	topic,
	index,
	canDelete,
	onUpdate,
	onDelete,
}: TopicCardProps) {
	const { t } = useLanguage();

	const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyType>(() => {
		const nonZeroDifficulties = Object.entries(topic.difficultyDistribution).find(
			([, value]) => value > 0
		);
		return nonZeroDifficulties ? (nonZeroDifficulties[0] as DifficultyType) : "Intern";
	});

	const totalQuestions = useMemo(() => {
		return Object.values(topic.difficultyDistribution).reduce((sum, value) => sum + value, 0);
	}, [topic.difficultyDistribution]);

	return (
		<div className="bg-white border border-primary-toned-200 rounded-lg p-6 shadow-md">
			<div className="space-y-4">
				{/* Topic Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4 flex-1">
						<MyFieldLayout className='w-full'>
							<MyLabel>{t("topic_card_topic_number")} #{index + 1}</MyLabel>
							<MyTextArea
								value={topic.name}
								onChange={(e) => onUpdate(index, { name: e.target.value })}
								placeholder={t("topic_card_topic_placeholder")}
								aria-label={t("topic_card_topic_description")}
							/>
						</MyFieldLayout>
					</div>
				</div>

				<hr className='border-primary-toned-300' />

				<div className='flex items-end gap-8'>
					<MyFieldLayout className='w-5/12'>
						<MyLabel>{t("topic_card_num_questions")}</MyLabel>
						<MyNumberInput
							min={1}
							value={totalQuestions}
							onChange={(e) => {
								const newDifficultyDistribution = {
									...topic.difficultyDistribution,
								};
								newDifficultyDistribution[currentDifficulty] = Number(e.target.value) || 0;
								onUpdate(index, {
									difficultyDistribution: newDifficultyDistribution
								});
							}}
						/>
					</MyFieldLayout>

					<MyFieldLayout className='w-5/12'>
						<MyLabel>{t("topic_card_difficulty")}</MyLabel>
						<MySelect
							options={DifficultiesAsConst.map((difficulty) => ({
								value: difficulty,
								label: t(`difficulty_${difficulty}`)
							}))}
							value={currentDifficulty}
							onChange={(value) => {
								const newDifficulty = value as DifficultyType || t(`difficulty_Intern`);
								const totalQuestions = topic.difficultyDistribution[currentDifficulty] || 0;
								const newDifficultyDistribution = {
									...topic.difficultyDistribution,
									[currentDifficulty]: 0,
									[newDifficulty]: totalQuestions
								};
								onUpdate(index, {
									difficultyDistribution: {
										...newDifficultyDistribution,
									}
								});
								setCurrentDifficulty(newDifficulty);
							}}
						/>
					</MyFieldLayout>


					{canDelete && (
						<MyButton
							variant={"destructive"}
							onClick={() => onDelete(index)}
							title={t("topic_card_delete")}
							className='ml-auto p-2 text-red-700 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors'
						>
							<Trash2 size={18} />
						</MyButton>
					)}
				</div>
			</div>
		</div>
	);
}


