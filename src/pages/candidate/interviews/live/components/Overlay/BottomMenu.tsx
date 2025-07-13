import CommonButton from "../../../../../../components/ui/button/CommonButton";
import {
  ArrowRight,
  DoorOpen,
  //   AlarmClock,
  LayoutGrid,
  //   ArrowLeftRight,
} from "lucide-react";
import { useState } from "react";
import BackgroundContainer from "./sub/BackgroundContainer";
// import { Models } from "../../types/render";
// import { useModelContext } from "../../contexts/model-context";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  useLazyGetInterviewOutroQuery,
  usePostAnswerMutation,
} from "../../../../../../features/interviews/api/interview.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuestionContext } from "../../contexts/question-context";
import ModalSubmitting from "./sub/ModalSubmit";
import { useAudioContext } from "../../contexts/audio.context";

export default function BottomMenu() {
  const [isSelectingBackground, setIsSelectingBackground] = useState(false);
  const { isPlaying } = useAudioContext();
  const { goToNextQuestion, questionIndex } = useQuestionContext();
  const [postAnswer] = usePostAnswerMutation();
  const totalQuestion = localStorage.getItem("totalQuestion") || "5";

  const location = useLocation();
  const interviewId = location.state?.interviewId;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [triggerSubmit] = useLazyGetInterviewOutroQuery();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);
  const handleSubmitInterview = async () => {
    if (!interviewId) {
      // alert("Không tìm thấy interviewId!");
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Not found interviewId!
        </Alert>
      );
    }

    try {
      setLoading(true);
      await triggerSubmit({ interviewId }).unwrap();
      navigate("/candidate/interviews/result", { state: { interviewId } });
    } catch (error) {
      console.error("Error submitting interview:", error);
      // alert("Đã xảy ra lỗi khi kết thúc phỏng vấn. Vui lòng thử lại.");
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Submit error. Please submit again
        </Alert>
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleNext = async () => {
    console.log("interviewId từ navigate:", interviewId);
    if (!interviewId) {
      // alert("Không tìm thấy interviewId!");
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Not found interviewId!
        </Alert>
      );
    }

    try {
      await postAnswer({
        interviewId,
        index: questionIndex,
        answer: "",
        recordProof: "",
      }).unwrap();
      if (questionIndex >= parseInt(totalQuestion)) {
        setShowSubmittingModal(true);
        await triggerSubmit({ interviewId }).unwrap();
        navigate("/candidate/interviews/result", { state: { interviewId } });
      } else {
        goToNextQuestion();
      }
    } catch (e) {
      // alert("Có lỗi khi gửi đáp án. Vui lòng thử lại.");
      console.error(e);
      return (
        <Alert
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
          }}
          severity="success"
        >
          Submit error. Please submit again
        </Alert>
      );
    }
  };
  if (showSubmittingModal)
    return <ModalSubmitting isOpen={showSubmittingModal} />;
  return (
    <div className="flex items-center px-2 py-1 gap-x-4 w-full h-fit ">
      <div className="bg-white/80 rounded-lg shadow-md flex items-center justify-between flex-1 p-1 relative">
        <CommonButton
          onClick={() => handleNext()}
          disabled={isPlaying}
          className={`
            ${
              isPlaying
                ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 transform-none hover:bg-gray-300 hover:text-gray-500 hover:scale-100"
                : "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            }
            transition-all duration-200 ease-in-out
          `}
        >
          <span>Skip</span>
          <ArrowRight size={20} />
        </CommonButton>
        {/* <div className="flex items-start mx-2 gap-x-1">
					<AlarmClock size={20} />
					<span className=" text-primary-toned-700 font-semibold">00:00</span>
				</div> */}

        <div className="w-[2px] h-6 bg-gray-400"></div>

        <div className="w-full ml-2 flex items-center gap-x-2">
          <CommonButton
            variant="transparent"
            onClick={() => setIsSelectingBackground(!isSelectingBackground)}
          >
            <LayoutGrid size={20} color="black" />
          </CommonButton>

          {/* <CommonButton variant="transparent" onClick={handleModelChange}>
            <ArrowLeftRight size={20} color="black" />
          </CommonButton> */}
        </div>

        <div
          className="h-fit w-full overflow-hidden"
          style={{
            position: "absolute",
            bottom: "105%",
            opacity: isSelectingBackground ? 1 : 0,
            visibility: isSelectingBackground ? "visible" : "hidden",
            translate: isSelectingBackground ? "0 0" : "0 100%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <BackgroundContainer />
        </div>
      </div>

      <div onClick={handleOpen} className="h-full w-fit shadow-lg">
        <CommonButton variant="danger">
          <DoorOpen size={20} className="my-1" />
        </CommonButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="end-interview-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          id="end-interview-dialog-title"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            textAlign: "center",
            color: "#2e808a",
            mb: 1,
            p: 3,
          }}
        >
          End Interview Early?
        </DialogTitle>

        <DialogContent sx={{ color: "#444" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            You are about to <strong>end the interview</strong> before
            completing all questions.
            <br />
            Please note that any unanswered questions will be automatically
            marked as skipped, and your current progress will be submitted
            as-is.
            <br />
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            sx={{
              borderColor: "#2e808a",
              color: "#2e808a",
              fontWeight: 600,
              px: 6,
              "&:hover": {
                backgroundColor: "#f1fafa",
                borderColor: "#2e808a",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmitInterview}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
            sx={{
              background: "linear-gradient(to right, #2e808a, #0fc2c0)",
              color: "#fff",
              fontWeight: 600,
              minWidth: 140,
              px: 5,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {loading ? "Submitting..." : "End Interview"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
