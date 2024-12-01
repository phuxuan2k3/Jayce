import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import GradientBorderNotGood from "../../../../components/GradientBorder.notgood";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "./types";
import { paths } from "../../../../router/path";

const TestViewAnswer = () => {
    const navigate = useNavigate();
    const { testId, attemptId } = useParams<{ testId: string; attemptId: string }>();
    if (!testId || !attemptId) {
        throw new Error("Missing testId or attemptId");
    }

    // todo
    const testViewAnswer = mockData;

    const totalPoints = testViewAnswer.questions.reduce(
        (total, question) => {
            const chosenOption = question.choices.find(choice => choice.isChoosen);
            return chosenOption && chosenOption.isCorrect ? total + question.point : total;
        },
        0
    );
    const maxPoints = testViewAnswer.questions.reduce((total, question) => total + question.point, 0);

    function renderChoiceIcon(choice: { isChoosen: boolean; isCorrect: boolean }) {
        if (!choice.isChoosen) return null;
        return choice.isCorrect ? (
            <span className="text-green-600 font-semibold">
                <FontAwesomeIcon icon={faCircleCheck} />
            </span>
        ) : (
            <span className="text-red-600 font-semibold">
                <FontAwesomeIcon icon={faCircleXmark} />
            </span>
        );
    };

    function handleBackClick() {
        if (!testId) return;
        navigate(paths.TEST.attempts(testId));
    }

    return (
        <div className="w-full flex-grow flex flex-col items-center px-4">
            <div className="w-full max-w-7xl py-6">
                <h1 className="text-2xl font-bold mb-6">{testViewAnswer.title}</h1>

                <div className="flex flex-col items-center">
                    <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                        <span>Answer List ({testViewAnswer.questions.length})</span>
                        <span>Total Score: {totalPoints}/{maxPoints}</span>
                    </div>

                    {/* Questions List */}
                    {testViewAnswer.questions.map((question, index) => (
                        <div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
                            <span className="font-bold mb-2 opacity-50">
                                Question {index + 1}
                            </span>

                            {/* Question and Options */}
                            <div className="w-3/5 flex flex-col">
                                {/* Question */}
                                <div className="w-11/12 mb-4">
                                    <GradientBorderNotGood className="w-full h-fit font-semibold">
                                        {question.questionText}
                                    </GradientBorderNotGood>
                                </div>

                                {/* Options */}
                                {question.choices.map((choice) => (
                                    <div key={choice.id} className="w-full flex flex-row mt-2" >
                                        <GradientBorderNotGood className="w-11/12 h-fit">
                                            {choice.id}. {choice.choiceText}
                                        </GradientBorderNotGood>
                                        <div className="w-1/12 flex items-center justify-center">
                                            {renderChoiceIcon(choice)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Points */}
                            <GradientBorderNotGood className="font-bold h-fit">
                                {question.choices.find(choice => choice.isChoosen && choice.isCorrect) ? question.point : 0}
                            </GradientBorderNotGood>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row justify-center">
                    <button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackClick}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TestViewAnswer;