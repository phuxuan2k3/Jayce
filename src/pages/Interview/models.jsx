class InterviewInfo {
    field;
    position;
    language;
    models;
    speed;
    level;
    maxQuestions;
    skipIntro;
    coding;
    constructor(
        field,
        position,
        language,
        models,
        speed,
        level,
        maxQuestions,
        skipIntro,
        coding
    ) {
        this.field = field;
        this.position = position;
        this.language = language;
        this.models = models;
        this.speed = speed;
        this.level = level;
        this.maxQuestions = maxQuestions;
        this.skipIntro = skipIntro;
        this.coding = coding;
    }
}

class Question {
    questionID;
    audio;
    libsync;
    isEnd;
}

class QuestionSubmission {
    questionID;
    answer;
}

export { InterviewInfo, Question, QuestionSubmission };