import React from 'react'
import { UserCore } from '../../../../../../../../infra-test/core/user.model'
import { AttemptsOfCandidateInTestAggregate } from '../../../../../../../../infra-test/core/attempt.model';

export default function ParticipantCard({
	user,
	highestScore,
	totalAttempts,
	rank,
}: {
	user: UserCore;
	highestScore: number;
	totalAttempts: number;
	rank: number;
}) {
	const formatSeconds = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		if (hours > 0) {
			return `${hours}h ${minutes}m ${secs}s`;
		}
		if (minutes > 0) {
			return `${minutes}m ${secs}s`;
		}
		return `${secs}s`;
	};

	return (
		<div className='rounded-lg p-6 bg-primary-toned-50 shadow-md'>
			{/* User Profile Section */}
			<div className='flex items-center mb-4'>
				<img
					src={user.avatarPath}
					alt={`${user.fullname}'s avatar`}
					className='rounded-full w-16 h-16 object-cover border-2 border-primary-toned-600'
				/>
				<div className='ml-4 flex-1'>
					<h3 className='text-xl font-semibold'>{user.fullname}</h3>
					<div className='text-sm text-gray-500'>
						<p>{user.email}</p>
						<p>{user.username}</p>
					</div>
				</div>
			</div>

			<hr className='my-4 border-primary-toned-300' />

			{/* Statistics Section */}
			<div>
				<h4 className="text-lg font-semibold mb-3">Test Statistics</h4>
				<div className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-primary-toned-600 
				[&>*:nth-child(odd)]:font-bold 
				[&>*:nth-child(odd)]:text-primary-toned-700
				[&>*:nth-child(even)]:text-right
				'>
					<span>Rank:</span>
					<span>{rank}</span>

					<span>Total Attempts:</span>
					<span>{totalAttempts}</span>

					<span>Highest Score:</span>
					<span>{highestScore}</span>

				</div>
			</div>
		</div>
	)
}
