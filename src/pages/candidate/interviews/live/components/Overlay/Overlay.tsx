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


			<div className="col-start-10 col-end-10 row-start-3 row-end-3">
				<Record onAnswerRecorded={handleAnswerRecorded} />
			</div>

		</div>
	)
}
