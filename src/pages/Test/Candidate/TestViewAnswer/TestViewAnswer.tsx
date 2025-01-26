import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import GradientBorderNotGood from "../../../../components/GradientBorder.notgood";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../../router/path";
import { useGetTestViewAnswersPageDataQuery, useLazyGetAnswersQuery } from "./viewanswer.test-api";
import { bufferTestViewAnswerData, FilterQuestionAnswerParams } from "./types";
import FetchStateContent from "../../components/FetchStateContent";
import { useEffect, useState } from "react";
import MyPagination from "../../components/MyPagination";


const perPage = 10;

const TestViewAnswer = () => {
    const navigate = useNavigate();
    const { testId, attemptId } = useParams<{ testId: string; attemptId: string }>();
    if (!testId || !attemptId) {
        throw new Error("Missing testId or attemptId");
    }
    const [filter, setFilter] = useState<FilterQuestionAnswerParams>({
        testId: testId,
        attemptId: attemptId,
        page: 1,
        perPage,
    });

    const {
        data: data_TestAnswers,
        isLoading: isLoading_TestAnswers,
        error: error_TestAnswers
    } = useGetTestViewAnswersPageDataQuery({ testId, attemptId });
    const testViewAnswer = data_TestAnswers ?? bufferTestViewAnswerData;

    const [getAnswers, {
        data: data_QuestionAnswers,
        isLoading: isLoading_QuestionAnswers,
        error: error_QuestionAnswers
    }] = useLazyGetAnswersQuery();
    const questionAnswers = data_QuestionAnswers ?? {
        data: [],
        page: 0,
        totalPage: 0,
        perPage: 0,
    };

    useEffect(() => {
        getAnswers(filter);
    }, [filter, getAnswers]);

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

    const handlePageChange = (page: number) => {
        setFilter({ ...filter, page });
    };

    return (
        <div className="w-full flex-grow flex flex-col items-center px-4">
            <div className="w-full max-w-7xl py-6">
                <FetchStateContent isLoading={isLoading_TestAnswers} error={error_TestAnswers} >
                    <h1 className="text-2xl font-bold mb-6">{testViewAnswer.title}</h1>
                </FetchStateContent>
                <div className="flex flex-col items-center">
                    {!isLoading_TestAnswers && (
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Number of Questions: {testViewAnswer.totalQuestions}</span>
                            <span>Total Score: {testViewAnswer.score}/{testViewAnswer.totalScore}</span>
                        </div>
                    )}
                    <FetchStateContent isLoading={isLoading_QuestionAnswers} error={error_QuestionAnswers} >
                        {/* Questions List */}
                        {questionAnswers.data.map((question, index) => (
                            <div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
                                <span className="font-bold mb-2 opacity-50">
                                    Question {index + 1}
                                </span>

                                {/* Question and Options */}
                                <div className="w-3/5 flex flex-col">
                                    {/* Question */}
                                    <div className="w-11/12 mb-4">
                                        <GradientBorderNotGood className="w-full h-fit font-semibold">
                                            {question.text}
                                        </GradientBorderNotGood>
                                    </div>

                                    {/* Options */}
                                    {question.choices.map((choice) => (
                                        <div key={choice.ID} className="w-full flex flex-row mt-2" >
                                            <GradientBorderNotGood className="w-11/12 h-fit">
                                                {String.fromCharCode(97 + Number(choice.ID))}. {choice.text}
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
                    </FetchStateContent>

                    <div>
                        <MyPagination totalPage={questionAnswers.totalPage} onPageChange={handlePageChange} />
                    </div>
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