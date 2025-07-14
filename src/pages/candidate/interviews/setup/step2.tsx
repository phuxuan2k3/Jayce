import { FC, useEffect, useState } from "react";
import { JobSetupData } from "./setup";
import ModalCheckSound from "./ModalCheckSound";
import { useLanguage } from "../../../../LanguageProvider";
import MySelect from "../../../../features/tests/ui/forms/MySelect";
import { Button } from "@mui/material";

const SetUpStep2: FC<{ data: JobSetupData }> = ({ data }) => {
  const [speechRate, setSpeechRate] = useState(0);
  const [numQuestion, setNumQuestion] = useState(4);
  // const [skipIntro, setSkipIntro] = useState(true);
  // const [skipCode, setSkipCode] = useState(true);
  const skipIntro = true;
  const skipCode = true;

  const [selectedModel, setSelectedModel] = useState<"alice" | "peter">(
    "alice"
  );
  const models = [
    {
      key: "alice",
      src: "/textures/aliceAvatar.png",
      label: "Alice",
    },
    {
      key: "peter",
      src: "/textures/peterAvatar.png",
      label: "Peter",
    },
  ];
  const [isOpen, setIsopen] = useState<boolean>(false);
  const { t } = useLanguage();

  const [language, setLanguage] = useState<string>("English");

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Vietnamese", label: "Tiếng Việt" },
  ];

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  return (
    <>
      {/* <div className="fotn-back text-[32px]    w-full text-center leading-[24px] mt-4"> */}
      <div className="text-primary-toned-600 text-[32px] leading-[24px] mt-4    font-black w-full text-center ">
        {t("interview_context_models")}
      </div>
      <div className="text-md text-gray-800 w-full text-center mb-2">
        {t("choose_ai")}
      </div>
      <div className="flex w-full">
        <div className="w-7/12">
          <div className="mb-2 text-[var(--primary-color)] ">
            <div className="font-medium mb-1 text-lg w-full">
              {t("language")}
            </div>
            <MySelect
              label={""}
              options={languageOptions}
              value={language}
              onChange={(value) => setLanguage(value as string)}
              className="w-64"
              size="md"
            />
            <div className="mt-4 mb-2">{t("models_english")}</div>
            <div className="flex  gap-4">
              {models.map((model) => (
                <div
                  key={model.key}
                  className={`
                    size-[200px] rounded-lg bg-gray-300 cursor-pointer transition-all
                    ${
                      selectedModel === model.key
                        ? "border-[6px] rounded-[9px] border-primary"
                        : "border-2 border-transparent opacity-80 hover:border-primary-toned-600"
                    }
                  `}
                  onClick={() =>
                    setSelectedModel(model.key as "alice" | "peter")
                  }
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={model.src}
                    alt={model.label}
                  />
                  <div className="text-center font-bold mt-2">
                    {/* {model.label} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-5/12 text-lg text-primary font-semibold">
          <div className="leading-[20px]">
            {t("speech_rate")} ({speechRate})
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="range h-5 [--range-thumb-size:40px]  [--range-p:3px]   [--range-thumb:#2e808a] text-primary "
          />
          <div className="flex text-sm justify-between  mb-8 font-medium text-primary-toned-700">
            <div>{t("low")}</div>
            <div>{t("fast")}</div>
          </div>

          <div className="text-lg leading-[20px] ">
            {t("number_of_questions")} ({numQuestion})
          </div>
          <input
            type="range"
            min="4"
            max="16"
            value={numQuestion}
            onChange={(e) => setNumQuestion(Number(e.target.value))}
            className="range h-5 [--range-thumb-size:40px]  [--range-p:3px] [--range-thumb:#2e808a] text-primary "
          />
          <div className="flex justify-between text-sm mb-4 font-medium text-primary-toned-700">
            <div>4</div>
            <div>16</div>
          </div>
          {/* <div className="flex justify-between">
            <span>{t("skip_intro")}</span>
            <input
              type="checkbox"
              checked={skipIntro}
              onChange={(e) => setSkipIntro(e.target.checked)}
              className="checkbox checked:bg-primary checked:text-white size-8"
            />
          </div>
          <div className="flex justify-between my-4">
            <div className="w-3/5">
              <div>{t("skip_code")}</div>
              <div className="text-[12px] leading-[18px] font-medium">
                {t("skip_code_desc")}
              </div>
            </div>
            <input
              type="checkbox"
              checked={skipCode}
              onChange={(e) => setSkipCode(e.target.checked)}
              className="checkbox checked:bg-primary checked:text-white size-8"
            />
          </div> */}
        </div>
      </div>
      <Button
        sx={{
          textAlign: "left",
          justifyContent: "flex-start",
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "none",
        }}
        onClick={() => {
          setIsopen(true);
        }}
        className="mb-4 bg-primary text-center text-white px-24 py-1.5 rounded-lg cursor-pointer"
      >
        {t("start")}
      </Button>
      <ModalCheckSound
        isOpen={isOpen}
        onClose={() => setIsopen(false)}
        data={data}
        language={language}
        speechRate={speechRate}
        numQuestion={numQuestion}
        skipIntro={skipIntro}
        skipCode={skipCode}
        model={selectedModel}
      />
    </>
  );
};
export default SetUpStep2;
