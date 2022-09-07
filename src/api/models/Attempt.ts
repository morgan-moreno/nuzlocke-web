export interface Attempt {
  id: string;
  gameName: string;
  attemptNumber: number;
  levelCap: number;
  active: boolean;
  alive?: Array<any>;
  deaths?: Array<any>;
}
