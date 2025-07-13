import { useState } from 'react';
import MyInput from '../../../../../features/tests/ui/forms/MyInput';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';
import { useLanguage } from '../../../../../LanguageProvider';

type JoinTestSectionProps = {
	onJoinTest: (roomId: string) => void;
	isFetching?: boolean;
};

const JoinTestSection = ({ onJoinTest, isFetching }: JoinTestSectionProps) => {
	const { t } = useLanguage();

	const [joinCode, setJoinCode] = useState<string>("");

	const handleJoinTest = () => {
		if (joinCode.trim()) {
			onJoinTest(joinCode);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<MyInput
				type="text"
				value={joinCode}
				onChange={(e) => setJoinCode(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && joinCode.trim()) {
						handleJoinTest();
						e.preventDefault();
					}
				}}
				placeholder={t("join_test_input_placeholder")}
				className='flex-1'
			/>
			<MyButton
				onClick={handleJoinTest}
				disabled={!joinCode.trim()}
				loading={isFetching === true}
			>
				{t("join_test_button_label")}
				{isFetching && <div className="animate-spin border-b-2 w-4 h-4 rounded-full border-white"></div>}
			</MyButton>
		</div>
	);
};

export default JoinTestSection;