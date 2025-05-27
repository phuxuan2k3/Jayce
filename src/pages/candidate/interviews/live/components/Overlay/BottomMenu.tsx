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

export default function BottomMenu() {
  const [isSelectingBackground, setIsSelectingBackground] = useState(false);
  const { model, setModel } = useModelContext();
  const models: Models[] = ["Alice", "Jenny"];
  const handleModelChange = () => {
    const currentIndex = models.indexOf(model);
    const nextIndex = (currentIndex + 1) % models.length;
    setModel(models[nextIndex]);
  };

  const handleContinue = () => {
    const interviewInfo = JSON.parse(
      localStorage.getItem("interviewInfo") || "{}"
    );
    const interviewId = interviewInfo?.interviewId;
    if (!interviewId) {
      alert("Không tìm thấy interviewId!");
      return;
    }
    // const { data, isLoading, error } = useGetInterviewOutroQuery({
    //   interviewId,
    // });
  };

  return (
    <div className="flex items-center px-2 py-1 gap-x-4 w-full h-fit ">
      <div className="bg-white/80 rounded-lg shadow-md flex items-center justify-between flex-1 p-1 relative">
        <CommonButton>
          <span onClick={handleContinue}>Continue</span>
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

      <div className="h-full w-fit shadow-lg">
        <CommonButton variant="danger">
          <DoorOpen size={20} className="my-1" />
        </CommonButton>
      </div>
    </div>
  );
}
