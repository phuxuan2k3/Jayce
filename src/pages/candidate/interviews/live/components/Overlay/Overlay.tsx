import BottomMenu from "./BottomMenu";
import InterviewStatus from "./InterviewStatus";
import Record from "./Record";

export default function Overlay() {
	const handleAnswerRecorded = (transcript: string) => {
		console.log("Answer recorded:", transcript);
	}

	return (
		<div className="grid grid-cols-12 grid-rows-5 w-full h-full">

			<div className="col-start-2 col-end-4 row-start-3 row-end-3 flex items-center justify-center p-4">
				<InterviewStatus currentQuestion={2} totalQuestion={5} />
			</div>


			<div className="col-start-10 col-end-10 row-start-3 row-end-3 flex items-center justify-center">
				<Record onAnswerRecorded={handleAnswerRecorded} />
			</div>

			<div className="col-start-5 col-end-8 row-start-5 row-end-5 flex items-end py-4">
				<BottomMenu />
			</div>

		</div>
	)
}
