import NewLeftLayoutTemplate from '../../../../../components/layouts/NewLeftLayoutTemplate'
import AttemptsSection from './components/attempts-tab/AttemptsSection';
import QuestionsList from './components/questions-tab';

export default function ManagerTestPage() {
	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={
				<div className="lg:sticky lg:top-[2vh] flex flex-col gap-4 shadow-primary rounded-lg p-4 bg-white">
					<div className="flex flex-col gap-2 mb-4">
						<h2 className="text-lg font-bold">Actions</h2>
						<p className="text-sm text-primary-toned-500">You can create, edit or delete your tests.</p>
					</div>
					{/* <CommonButton
						variant="secondary"
					>
						Avtive Tests
					</CommonButton> */}
					{/* <CommonButton
						onClick={handleClickCreateTest}
					>
						Create Test
					</CommonButton> */}
				</div>
			}
		>
			{/* <ExamInformationSection
				{...mockFullExamInformation}
			/> */}

			{/* <QuestionsList /> */}

			<AttemptsSection />


		</NewLeftLayoutTemplate>
	);
}
