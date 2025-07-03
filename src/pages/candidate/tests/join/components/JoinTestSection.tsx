import { useState } from 'react';
import MyInput from '../../../../../features/tests/ui/forms/MyInput';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';

type JoinTestSectionProps = {
	onJoinTest: (roomId: string) => void;
};

const JoinTestSection = ({ onJoinTest }: JoinTestSectionProps) => {
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
				placeholder="Enter test Room ID"
				className='flex-1'
			/>
			<MyButton
				onClick={handleJoinTest}
				disabled={!joinCode.trim()}

			>
				Join Test
			</MyButton>
		</div>
	);
};

export default JoinTestSection;