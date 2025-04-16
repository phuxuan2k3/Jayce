import CommonButton from '../../../../../../components/ui/buttons/CommonButton'
import { ArrowRight, DoorOpen, AlarmClock, LayoutGrid, ArrowLeftRight } from "lucide-react"
import DangerButton from '../../../../../../components/ui/buttons/DangerButton'
import TransparentButton from '../../../../../../components/ui/buttons/TransparentButton'
import { useState } from 'react'
import BackgroundContainer from './sub/BackgroundContainer'
import { Models } from '../../types/render'
import { useModelContext } from '../../contexts/model-context'

export default function BottomMenu() {
	const [isSelectingBackground, setIsSelectingBackground] = useState(false);
	const { model, setModel } = useModelContext();
	const models: Models[] = ["Alice", "Jenny"];
	const handleModelChange = () => {
		const currentIndex = models.indexOf(model);
		const nextIndex = (currentIndex + 1) % models.length;
		setModel(models[nextIndex]);
	};

	return (
		<div className='flex items-center px-2 py-1 gap-x-4 w-full h-fit '>
			<div className='bg-white/80 rounded-lg shadow-md flex items-center justify-between flex-1 p-1 relative'>
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

				<div className='w-full flex items-center gap-x-2'>
					<TransparentButton
						onClick={() => setIsSelectingBackground(!isSelectingBackground)}
					>
						<LayoutGrid size={20} color='black' />
					</TransparentButton>

					<TransparentButton
						onClick={handleModelChange}
					>
						<ArrowLeftRight size={20} color='black' />
					</TransparentButton>
				</div>

				{/* Background selector */}
				<div
					className='h-fit w-full overflow-hidden'
					style={{
						position: "absolute",
						bottom: "105%",
						opacity: isSelectingBackground ? 1 : 0,
						visibility: isSelectingBackground ? "visible" : "hidden",
						translate: isSelectingBackground ? "0 0" : "0 100%",
						transition: "all 0.3s ease-in-out",
					}}>
					<BackgroundContainer />
				</div>
			</div>

			<div className='h-full w-fit shadow-lg'>
				<DangerButton>
					<DoorOpen size={20} className='my-1' />
				</DangerButton>
			</div>
		</div>
	)
}
