import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStartInterviewMutation } from "../../../../features/interviews/api/interview.api";
import { JobSetupData } from "./setup";

type ModalCheckSoundProps = {
  isOpen: boolean;
  onClose: () => void;
  data: JobSetupData;
  speechRate: number;
  numQuestion: number;
  skipIntro: boolean;
  skipCode: boolean;
  language: string;
};

const ModalCheckSound: FC<ModalCheckSoundProps> = ({
  isOpen,
  onClose,
  data,
  speechRate,
  numQuestion,
  skipIntro,
  skipCode,
  language,
}) => {
  const navigate = useNavigate();

  const [interviewId, setInterviewId] = useState<string | null>(null);

  const [postStartInterview] = usePostStartInterviewMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const handleStartInterview = async () => {
    // setIsopen(true);
    setLoading(true);
    localStorage.setItem("totalQuestion", numQuestion.toString());
    const interviewData = {
      position: data.position,
      experience: data.experience,
      language: language as string,
      models: "en-GB-RyanNeural",
      speed: speechRate,
      skills: [data?.skills],
      totalQuestions: numQuestion,
      skipIntro,
      skipCode,
    };

    try {
      const response = await postStartInterview(interviewData).unwrap();
      console.log("interview data", interviewData);
      console.log("Interview started: ", response);
      setInterviewId(response.interviewId);
      setLoading(false);
    } catch (err) {
      console.error("Error starting interview: ", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleStartInterview();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg transition-all duration-300"
        onClick={handleModalClick}
      >
        <>
          <h2 className="text-3xl font-bold mb-3 text-[#2e808a] text-center">
            Before you begin
          </h2>
          <p className="mb-4 text-gray-700 text-center">
            Your submitted information has been received. You may now proceed to
            verify your audio and network connectivity to ensure optimal
            performance during the sessions.
          </p>
          <div className="bg-[#e7f6f8] rounded-lg px-4 py-3 mb-4">
            <div className="font-semibold text-[#2e808a] mb-1">
              Instructions:
            </div>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Carefully listen to each question.</li>
              <li>
                Formulate your response, then click the{" "}
                <span className="font-semibold text-[#2e808a]">‘Answer’</span>{" "}
                button.
              </li>
              <li>
                After completion, click{" "}
                <span className="font-semibold text-[#2e808a]">‘Continue’</span>{" "}
                to submit and move to the next question.
              </li>
            </ol>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded mb-6">
            <div className="font-bold text-red-600 mb-1">
              Please be advised:
            </div>
            <ul className="list-disc list-inside text-red-500 text-sm space-y-1">
              <li>
                If you unexpectedly leave a session, your interview will be
                submitted as is and a retake will not be possible.
              </li>
              <li>Do not refresh the page or you'll lose the data.</li>
            </ul>
          </div>
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="w-1/2 py-2 border border-[#2e808a] rounded-lg font-semibold text-[#2e808a] hover:bg-[#f1fafa] transition"
            >
              Back
            </button>
            <button
              onClick={() =>
                navigate("/candidate/interviews/live", {
                  state: { interviewId },
                })
              }
              disabled={loading}
              className={`w-1/2 py-2 bg-gradient-to-r from-[#2e808a] to-[#0fc2c0] text-white font-bold rounded-lg shadow-md transition flex items-center justify-center
                  ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
                `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span className="animate-pulse">Loading...</span>
                </>
              ) : (
                "Let's start"
              )}
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default ModalCheckSound;
