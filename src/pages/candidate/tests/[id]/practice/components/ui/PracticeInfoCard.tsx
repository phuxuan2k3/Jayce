import { UserInfo } from '../../../../../../../features/auth/store/authSlice';
import { TestCore } from '../../../../../../../features/tests/model/test.model';

const PracticeInfoCard = ({
	test,
	author,
	isLoading,
}: {
	test?: TestCore;
	author?: UserInfo;
	isLoading: boolean;
}) => {
	return (
		<div className="bg-[#eaf6f8] p-6 rounded-lg mb-6 flex justify-between">
			<div className="w-full flex flex-col items-center h-[200px]">
				<h2 className="text-lg font-semibold mb-2 text-center">Practice Test Information</h2>
				<div className="flex flex-col items-center justify-center h-full">
					{isLoading ? (
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
					) : (test && (
						<>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">By:</span> {author?.username}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Time Limit:</span> {test.minutesToAnswer} minutes
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Language:</span> {test.language}
							</p>
							<p className="text-gray-700">
								<span className="font-semibold">Mode:</span> {test.mode}
							</p>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default PracticeInfoCard;