import { UserCore } from '../../../../../../features/tests/model/user.model'

export default function ParticipantProfileCard({
	participant,
}: {
	participant: UserCore;
}) {
	return (
		<div className='rounded-lg p-6 bg-primary-toned-50 shadow-md'>
			<div className='flex items-center'>
				<img
					src={participant.avatarPath}
					className='rounded-full w-[25%] aspect-square object-cover border-2 border-primary-toned-600'
				/>
				<div className='ml-4 flex-1'>
					<h3 className='text-xl font-semibold'>{participant.fullname}</h3>
					<hr className='my-2 border-primary-toned-300' />
					<div className='text-sm text-gray-500'>
						<p>{participant.email}</p>
						<p>{participant.username}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
