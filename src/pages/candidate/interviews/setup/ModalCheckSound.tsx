import { FC, MouseEvent } from "react";

type ModalCheckSoundProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalCheckSound: FC<ModalCheckSoundProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
        onClick={handleModalClick}
      >
        <h2 className="text-2xl font-semibold mb-4 ">Before you begin</h2>
        <p className="mb-4">
          Your submitted information has been received. You may now proceed to
          verify your audio and network connectivity to ensure optimal
          performance during the sessions.
        </p>
        <p className="font-bold"> Instructions:</p>
        <p>1.Carefully listen to each question.</p>
        <p>2. Formulate your response, then click the ‘Answer’ button.</p>
        <p>
          3. Upon completion, click ‘Continue’ to submit your answer and move to
          the next question.
        </p>
        <div className="text-red-500">
          <p className="font-bold">Please be advised: </p>
          <li>
            In the event of you unexpectedly leave a session, your interview
            will be submitted as is, and a retake will not be possible.
          </li>
          <li>Please don’t refresh the page or you’ll lose the data.</li>
        </div>
        <div className="flex text-center gap-2 my-8">
          <div className="w-1/2 p-1 border border-primary rounded-lg">Back</div>
          <div className="w-1/2 bg-gradient-1 text-white font-semibold p-1 rounded-lg">
            Let's start
          </div>
        </div>
        <hr />
        <div className="flex mt-6 mb-3 justify-between text-center ">
          <div className="w-3/7">Microphone</div>
          <div className="flex-1 text-gray-500 text-sm">
            Default - Macbook Pro Microphone
          </div>
        </div>
        <div className="flex">
          <div className="w-3/7 bg-primary p-1 rounded-lg text-white px-4">
            Record
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};
export default ModalCheckSound;
