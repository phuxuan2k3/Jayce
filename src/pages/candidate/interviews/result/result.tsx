import { useEffect, useState } from "react";
import Script from "./script";
import Summary from "./sumary";
import Strength from "./strength";
import {
  GetInterviewScoreResponse,
  useGetInterviewHistoryQuery,
  usePostGetScoreMutation,
} from "../../../../features/interviews/api/interview.api";

const ResultPage = () => {
  const [tab, setTab] = useState("summary");
  const navItems = [
    { id: "summary", label: "Summary", icon: "📊" },
    { id: "script", label: "Scripts", icon: "📜" },
    { id: "strength", label: "Strengths & Weaknesses", icon: "📈" },
    { id: "", label: "", icon: "" },
  ];

  // const [scoreData, setScoreData] = useState<GetInterviewScoreResponse | null>(
  //   null
  // );

  // const [postGetScore] = usePostGetScoreMutation();

  // useEffect(() => {
  //   const fetchScore = async () => {
  //     try {
  //       const submissions = [
  //         { index: 0, question: "Tell me about yourself", answer: "I am..." },
  //         {
  //           index: 1,
  //           question: "Why do you want this job?",
  //           answer: "Because...",
  //         },
  //       ];

  //       const response = await postGetScore({ submissions }).unwrap();
  //       setScoreData(response);
  //     } catch (err) {
  //       console.error("Failed to fetch score:", err);
  //     }
  //   };

  //   fetchScore();
  // }, [postGetScore]);
  const interviewInfo = JSON.parse(
    localStorage.getItem("interviewInfo") || "{}"
  );
  const interviewId = interviewInfo.interviewId || "1";
  const { data, isLoading, error } = useGetInterviewHistoryQuery({
    interviewId,
  });

  if (isLoading) return <div>Đang tải kết quả...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu!</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  console.log("data", data);
  const renderTabContent = () => {
    switch (
      tab
      // case "summary":
      //   return scoreData ? <Summary scoreData={scoreData} /> : null;
      // case "script":
      //   return scoreData ? <Script scoreData={scoreData} /> : null;
      // case "strength":
      //   return scoreData ? <Strength scoreData={scoreData} /> : null;
      // default:
      //   return scoreData ? <Summary scoreData={scoreData} /> : null;
    ) {
    }
  };

  return (
    <div>
      <div className="text-[48px] font-black font-arya text-center">
        Interview result
      </div>
      <div className="text-center text-[24px] font-arya">
        <p>Congatulation on comleting the interview!</p>
        <p>Lets take a look at the result!</p>
      </div>
      <div className="flex ">
        <div className="rounded-tr-xl ps-4  bg-[rgba(57,160,173,0.6)] h-[100vh] w-2/10">
          <div className="h-14 items-center flex justify-end px-4"></div>
          {navItems.map((item, index) => {
            const isSelected = tab === item.id;
            const isAboveSelected = tab === navItems[index + 1]?.id;
            const isBelowSelected = tab === navItems[index - 1]?.id;
            const isLast = index === navItems.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`
                    ${isAboveSelected ? "bg-white " : ""} 
                    ${isBelowSelected ? "bg-white" : ""}
                    ${isLast ? " cursor-not-allowed pointer-events-none" : ""}`}
              >
                <div
                  className={` w-full h-14 ps-4 pe-4  flex items-center text-base font-semibold cursor-pointer  ${isSelected ? "bg-white text-black rounded-l-full shadow" : "text-white  "}  
                    ${isAboveSelected ? " rounded-br-3xl bg-[rgba(57,160,173,0.6)]" : ""}
                    ${isBelowSelected ? "rounded-tr-3xl bg-[rgba(57,160,173,0.6)]" : ""}
                    
                    `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="flex-1">{renderTabContent()}</div> */}
      </div>
    </div>
  );
};

export default ResultPage;
