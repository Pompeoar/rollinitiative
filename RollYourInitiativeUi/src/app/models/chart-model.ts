export interface Initiative {
    value: number,
    bonus: number,
    advantage: boolean    
}

export interface Character {
    name: string;
    initiative: Initiative;
    sticky: boolean;
  }
  