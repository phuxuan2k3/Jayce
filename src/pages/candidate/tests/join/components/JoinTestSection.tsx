import { useState } from 'react';

type JoinTestSectionProps = {
	onJoinTest: (code: string) => void;
};

const JoinTestSection = ({ onJoinTest }: JoinTestSectionProps) => {
	const [joinCode, setJoinCode] = useState<string>("");

	const handleJoinTest = () => {
		if (joinCode.trim()) {
			onJoinTest(joinCode);
		}
	};

	return (
		<section className="border-b pb-6 border-primary-toned-200">
			<h2 className="text-2xl font-bold mb-4">Join a Test</h2>
			<p className="text-primary-toned-700 mb-4">Enter a test code provided by your interviewer or manager to join a hosted test.</p>

			<div className="flex items-center gap-2">
				<input
					type="text"
					value={joinCode}
					onChange={(e) => setJoinCode(e.target.value)}
					placeholder="Enter test code"
					className="border border-primary-toned-300 rounded-lg px-4 py-2 flex-grow"
				/>
				<button
					onClick={handleJoinTest}
					disabled={!joinCode.trim()}
					className={`px-4 py-2 rounded-lg font-semibold ${joinCode.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
				>
					Join Test
				</button>
			</div>
		</section>
	);
};

export default JoinTestSection;