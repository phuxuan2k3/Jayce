import { UserInfo } from '../../../auth/store/authSlice';
import { UserCore, getUserCore } from '../../../auth/types/profile';

export default function UserCoreCard({
	user,
}: {
	user: UserInfo | UserCore;
}) {
	let _user = getUserCore(user);
	return (
		<div className='rounded-lg p-6 bg-primary-toned-50 shadow-md'>
			<div className='flex items-center'>
				<img
					src={_user.avatarPath}
					className='rounded-full w-[25%] aspect-square object-cover border-2 border-primary-toned-600'
				/>
				<div className='ml-4 flex-1'>
					<h3 className='text-xl font-semibold'>{_user.fullname}</h3>
					<hr className='my-2 border-primary-toned-300' />
					<div className='text-sm text-gray-500'>
						<p>{_user.email}</p>
						<p>{_user.username}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
