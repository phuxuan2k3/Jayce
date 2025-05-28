import CommonButton from "../../../../../../components/ui/CommonButton";
import {
  ArrowRight,
  DoorOpen,
  AlarmClock,
  LayoutGrid,
  ArrowLeftRight,
} from "lucide-react";
import { useState } from "react";
import BackgroundContainer from "./sub/BackgroundContainer";
import { Models } from "../../types/render";
import { useModelContext } from "../../contexts/model-context";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useLazyGetInterviewOutroQuery } from "../../../../../../features/interviews/api/interview.api";
import { useNavigate } from "react-router-dom";

export default function BottomMenu() {
  const [isSelectingBackground, setIsSelectingBackground] = useState(false);
  const { model, setModel } = useModelContext();
  const models: Models[] = ["Alice", "Jenny"];
  const handleModelChange = () => {
    const currentIndex = models.indexOf(model);
    const nextIndex = (currentIndex + 1) % models.length;
    setModel(models[nextIndex]);
  };

  // const handleContinue = () => {
  //   const interviewInfo = JSON.parse(
  //     localStorage.getItem("interviewInfo") || "{}"
  //   );
  //   const interviewId = interviewInfo?.interviewId;
  //   if (!interviewId) {
  //     alert("Không tìm thấy interviewId!");
  //     return;
  //   }
  //   // const { data, isLoading, error } = useGetInterviewOutroQuery({
  //   //   interviewId,
  //   // });
  // };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [triggerSubmit] = useLazyGetInterviewOutroQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitInterview = async () => {
    const interviewInfo = JSON.parse(
      localStorage.getItem("interviewInfo") || "{}"
    );
    const interviewId = interviewInfo?.interviewId;

    if (!interviewId) {
      alert("Không tìm thấy interviewId!");
      return;
    }

    try {
      setLoading(true);
      await triggerSubmit({ interviewId }).unwrap();
      navigate("/candidate/interviews/result");
    } catch (error) {
      console.error("Error submitting interview:", error);
      alert("Đã xảy ra lỗi khi kết thúc phỏng vấn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center px-2 py-1 gap-x-4 w-full h-fit ">
      <div className="bg-white/80 rounded-lg shadow-md flex items-center justify-between flex-1 p-1 relative">
        <CommonButton>
          <span>Continue</span>
          <ArrowRight size={20} />
        </CommonButton>
        <div className="flex items-start mx-2 gap-x-1">
          <AlarmClock size={20} />
          <span className=" text-primary-toned-700 font-semibold">00:00</span>
        </div>

        <div className="w-[2px] h-6 bg-gray-400"></div>

        <div className="w-full flex items-center gap-x-2">
          <CommonButton
            variant="transparent"
            onClick={() => setIsSelectingBackground(!isSelectingBackground)}
          >
            <LayoutGrid size={20} color="black" />
          </CommonButton>

          <CommonButton variant="transparent" onClick={handleModelChange}>
            <ArrowLeftRight size={20} color="black" />
          </CommonButton>
        </div>

        {/* Background selector */}
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
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Kết thúc phỏng vấn?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn <strong>kết thúc phỏng vấn</strong> sớm không?
            Các câu hỏi chưa trả lời sẽ bị bỏ qua.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Huỷ
          </Button>
          <Button
            onClick={handleSubmitInterview}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} />}
          >
            {loading ? "Đang gửi..." : "Kết thúc"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
