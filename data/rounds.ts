export interface Rounds {
  id: string;
  lessonId: string;
  opponentId: string;
  turns: number;
  challengesLimit: number;
  extraQuestion: number;
  assistants: number;
}
