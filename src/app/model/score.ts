export class ScoreState {
    questionId: string;
    answerId: string;
}

export class Score {
    _id: string;
    email: string;
    gameId: string;
    status: ScoreStatus;
    score: number;
    timeTaken: string;
    state: ScoreState[];
    recommendations: String[];
}

export enum ScoreStatus {
    NOTSTARTED,
    INPROGRESS,
    COMPLETE
  }