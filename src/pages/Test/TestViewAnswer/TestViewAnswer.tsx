import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import GradientBorderNotGood from "../../../components/GradientBorder.notgood";

const TestViewAnswer = () => {
    const testInfo = {
        title: "Design a product that helps people find contract",
    }
    const answerList = [
        {
            question: "What is the first step in the design process?",
            options: ["Research", "Design", "Develop", "Test"],
            chosenAnswer: 0,
            correctAnswer: 0,
            point: 10,
        },
        {
            question: "What is the main purpose of user research?",
            options: ["Identify needs", "Develop code", "Write tests", "Launch product"],
            chosenAnswer: 2,
            correctAnswer: 0,
            point: 10,
        },
    ];

    const totalPoints = answerList.reduce(
        (total, item) => (item.chosenAnswer === item.correctAnswer ? total + item.point : total),
        0
    );

    const maxPoints = answerList.reduce((total, item) => total + item.point, 0);

    return (
        <div className="w-full flex-grow flex flex-col items-center px-4">
            <div className="w-full max-w-7xl py-6">
                <h1 className="text-2xl font-bold mb-6">{testInfo.title}</h1>

                <div className="flex flex-col items-center">
                    <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                        <span>Answer List ({answerList.length})</span>
                        <span>Total Score: {totalPoints}/{maxPoints}</span>
                    </div>

                    {/* Questions List */}
                    {answerList.map((answer, index) => (
                        <div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
                            <span className="font-bold mb-2 opacity-50">
                                Question {index + 1}
                            </span>

                            {/* Question and Options */}
                            <div className="w-3/5 flex flex-col">
                                {/* Question */}
                                <div className="w-11/12 mb-4">
                                    <GradientBorderNotGood className="w-full h-fit font-semibold">
                                        {answer.question}
                                    </GradientBorderNotGood>
                                </div>

                                {/* Options */}
                                {answer.options.map((option, optIndex) => (
                                    <div key={optIndex} className="w-full flex flex-row mt-2" >
                                        <GradientBorderNotGood className="w-11/12 h-fit">
                                            {String.fromCharCode(97 + optIndex)}. {option}
                                        </GradientBorderNotGood>
                                        <div className="w-1/12 flex items-center justify-center">
                                            {answer.chosenAnswer === optIndex ? (
                                                answer.correctAnswer === optIndex ? (
                                                    <span className="text-green-600 font-semibold">
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </span>
                                                ) : (
                                                    <span className="text-red-600 font-semibold">
                                                        <FontAwesomeIcon icon={faCircleXmark} />
                                                    </span>
                                                )
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Points */}
                            <GradientBorderNotGood className="font-bold h-fit">
                                {answer.chosenAnswer === answer.correctAnswer ? answer.point : 0}
                            </GradientBorderNotGood>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row justify-center">
                    <button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TestViewAnswer