import { services } from "./service";
import { InterviewInfo } from "./models";
import Interview from "./Main";
import { useState, useRef, useEffect } from "react";

function InitInterview() {
  const [started, setStarted] = useState(false);
  const [interviewID, setInterviewID] = useState("");

  function handleStart(e) {
    e.target.disabled = true;
    services
      .CreateInterview(
        {
          field: "AI Engineering",
          position: "AI Engineer Intern",
          language: "English",
          models: "en-AU-NatashaNeural",
          speed: -20,
          level: "Easy",
          maxQuestions: 4,
          skipIntro: false,
          coding: false,
        }
      )
      .then((res) => {
        setInterviewID(res.data.interviewId);
        console.log(res.data.interviewId);
        setStarted(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <button onClick={handleStart}>Start</button>
      <Interview started={started} interviewID={interviewID} />
    </>
  )
}


export default InitInterview;
