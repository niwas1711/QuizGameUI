export interface Game {
    _id: string;
    gameName: string;
    status: string;
    start: Date;
    end: Date;
    questionCount: number;
}

export interface GameStatus {
    CREATED,
    INPLAY,
    COMPLETE
  }