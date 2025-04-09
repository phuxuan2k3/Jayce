import { services } from "./service";

class InterviewManager {
  static instance = null;

  interviewID;
  questions;
  currentQuestion;

  constructor(interviewID, questions = null, currentQuestion = 0) {
    if (InterviewManager.instance) {
      return InterviewManager.instance;
    }

    this.interviewID = interviewID;
    this.questions = questions;
    this.currentQuestion = currentQuestion;
    InterviewManager.instance = this;
  }

  async getQuestion() {
    this.currentQuestion++;
    return await this.requestNextQuestions(this.currentQuestion);
  }

  // async setQuestion(question){
  //     if (this.questions === null || this.questions === undefined || this.questions.length === 0){
  //         this.questions = [question];
  //         return;
  //     }

  //     this.questions.push(question);
  // }

  // async setListQuestions(questions){
  //     if (this.questions === null || this.questions === undefined || this.questions.length === 0){
  //         this.questions = [questions];
  //         return;
  //     }
  //     this.questions.push(questions);
  // }

  async submitAnswer(answer) {
    services
      .SubmitAnswer(
        this.interviewID,
        this.currentQuestion,
        answer
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // async requestInitQuestions(){
  //     services.GetInitialQuestions(this.interviewID)
  //     .then(async (res) => {
  //         await this.setListQuestions(res.data);
  //     })
  //     .catch((err) => {
  //         console.error(err);
  //     });

  // }

  async requestNextQuestions(questionIndex) {
    console.log("Requesting question index:", questionIndex, this.interviewID);
    const question = services
      .GetNextQuestion(this.interviewID, questionIndex)
      .then(async (res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    if (question !== null) {
      return question;
    }
  }
}

export default InterviewManager;
