class InterviewInfo {
    job;
    position;
    language;
    level;
    duration;
    model;
}

class Question{
   questionID;
   audio;
   libsync;
   isEnd;
}

class QuestionSubmission{
    questionID;
    answer;
}

export { InterviewInfo, Question, QuestionSubmission };