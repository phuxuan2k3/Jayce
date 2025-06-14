import { FC, MouseEvent } from "react";

type ModalSubmittingProps = {
  isOpen: boolean;
};

const ModalSubmitting: FC<ModalSubmittingProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed top-0 left-0 z-[9999] w-[100vw] h-[100vh] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg transition-all duration-300"
        onClick={handleModalClick}
      >
        <>
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-[#2e808a] mb-4"
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
            <h2 className="text-2xl font-bold mb-2 text-[#2e808a] text-center">
              Submitting your answers...
            </h2>
            <p className="mb-4 text-gray-700 text-center">
              Please wait while we submit your responses. This may take a
              moment.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded mb-6 w-full">
              <div className="font-bold text-red-600 mb-1">
                Do not close or refresh this page!
              </div>
              <ul className="list-disc list-inside text-red-500 text-sm space-y-1">
                <li>Your submission is being processed.</li>
                <li>Leaving the page may result in data loss.</li>
              </ul>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ModalSubmitting;
