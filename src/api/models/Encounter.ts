export interface Encounter {
  id: string;
  name: string;
  ability: string;
  nature: string;
  moves: Array<string>;
  dead: boolean;
  evs: any;
  ivs: any;
  attemptId: string;
}
