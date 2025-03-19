export interface Idea {
  id: string;
  text: string;
  timestamp: Date;
  likes: number;
  phase?: number; // Which phase of digital wallet: 1, 2, 3, or 4
}

export interface Report {
  ideaId: string;
  reason: string;
}

export enum DigitalWalletPhase {
  Phase1 = 1, // Vulnerable groups
  Phase2 = 2, // Elderly (60+)
  Phase3 = 3, // General public
  Phase4 = 4, // Expansion phase
}
