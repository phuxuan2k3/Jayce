import CommonButton from '../../../../../../components/ui/buttons/CommonButton'
import { ArrowRight, DoorOpen, AlarmClock, LayoutGrid } from "lucide-react"
import DangerButton from '../../../../../../components/ui/buttons/DangerButton'
import TransparentButton from '../../../../../../components/ui/buttons/TransparentButton'

export default function BottomMenu() {
	return (
		<div className='w-full h-fit flex items-center px-2 py-1 gap-x-4'>
			<div className='bg-gray-200 rounded-lg shadow-md flex items-center justify-between flex-1 p-1'>
				<CommonButton>
					<span>Continue</span>
					<ArrowRight size={20} />
				</CommonButton>
				<div className='flex items-start mx-2 gap-x-1'>
					<AlarmClock size={20} />
					<span className=' text-primary-toned-700 font-semibold'>
						00:00
					</span>
				</div>

				<div className="w-[2px] h-6 bg-gray-400"></div>

				<TransparentButton>
					<LayoutGrid size={20} color='black' />
				</TransparentButton>
			</div>

			<div className='h-full w-fit shadow-lg'>
				<DangerButton>
					<DoorOpen size={20} className='my-1' />
				</DangerButton>
			</div>
		</div>
	)
}
