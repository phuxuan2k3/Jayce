import React from "react";
import { CandidateCoreSchema } from "../../api/test.api-gen-v2";
import { UserInfo } from "../../../auth/store/authSlice";

// "username": "quocankg2611@gmail.com",
// "email": "quocankg2611@gmail.com",
// "role": "ROLE_CANDIDATE",
// "id": "12",
// "metadata": {
//     "fullname": "I Am Miboy",
//     "company": "Cty",
//     "country": "Viet Nam",
//     "jobTitle": "CEO",
//     "avatarPath": "https://skillsharp-api.icu/storage/image?key=upload/image/avatar/avatar_12_2025-07-04T10-16-03.669_GvKtva7h7y_2025070410.jpeg"
// }

interface ParticipantCardProps {
	user: UserInfo;
	participant: CandidateCoreSchema;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ user, participant }) => {
	return (
		<div className='flex-1 w-full flex items-center justify-center'>
			<div className='relative bg-primary-toned-50 rounded-2xl p-6 shadow-md border border-primary-toned-200 transition-all duration-300 w-full'>
				<div className='relative flex items-center space-x-4'>
					<div className="relative">
						<img
							src={user.metadata.avatarPath}
							className='rounded-2xl w-16 h-16 object-cover border-3 border-white shadow-lg'
							alt={`${user.metadata.fullname}'s avatar`}
						/>
					</div>

					<div className='flex-1 min-w-0'>
						<div className="flex items-center space-x-2 mb-1">
							<h3 className='font-bold text-lg text-gray-800 truncate'>{user.metadata.fullname || "Unknown User"}</h3>
						</div>

						<div className='space-y-1'>
							<p className='text-sm text-gray-600 truncate flex items-center'>
								<span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
								<span>Username:</span>
								<span className='ml-1 font-semibold text-gray-800 truncate'>
									{user.username}
								</span>
							</p>

							{user.metadata.country && (
								<p className='text-xs text-gray-500 truncate flex items-center'>
									<span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
									<span>Country:</span>
									<span className='ml-1 font-semibold text-gray-800 truncate'>
										{user.metadata.country}
									</span>
								</p>
							)}
						</div>
					</div>

					{/* Performance indicator */}
					<div className="flex flex-col items-center">
						<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-toned-400 to-primary-toned-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
							#{participant._aggregate?.rank || '-'}
						</div>
						<span className="text-xs text-gray-500 mt-1">Rank</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ParticipantCard;
