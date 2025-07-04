import { useState } from 'react';
import MyInput from '../../../../../features/tests/ui/forms/MyInput';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';

type JoinTestSectionProps = {
	onJoinTest: (roomId: string) => void;
	isFetching?: boolean;
};

const JoinTestSection = ({ onJoinTest, isFetching }: JoinTestSectionProps) => {
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
				placeholder="Enter test Room ID"
				className='flex-1'
			/>
			<MyButton
				onClick={handleJoinTest}
				disabled={!joinCode.trim()}
				loading={isFetching === true}
			>
				Join Test
				{isFetching && <div className="animate-spin border-b-2 w-4 h-4 rounded-full border-white"></div>}
			</MyButton>
		</div>
	);
};

export default JoinTestSection;