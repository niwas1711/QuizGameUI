
export class Answer {
  _id: number;
  answerText: string;
  correct: boolean;
}

export class Question {
  _id: string;
  gameId: string;
  questionText: string;
  answers: Answer[];
  
  constructor() {
    this.answers = [new Answer(), new Answer(), new Answer(), new Answer()];
  }
}

export enum QuestionStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}