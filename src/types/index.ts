export interface Player {
  id: string;
  name: string;
  team: string;
  position: Position;
  yahooRank: number;
  adp: number;
  projection: number;
  isDrafted: boolean;
  draftedBy?: string;
  byeWeek: number;
  imageUrl?: string;
  injuryStatus?: 'Q' | 'D' | 'O' | 'IR';
  injuryNotes?: string;
}

export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'DST' | 'K';

export interface DraftPick {
  round: number;
  pick: number;
  overall: number;
  player: Player;
  team: string;
  timestamp: Date;
}

export interface RosterNeeds {
  qb: number;
  rb: number;
  wr: number;
  te: number;
  flex: number;
  dst: number;
  k: number;
  bench: number;
}

export interface Team {
  id: string;
  name: string;
  owner: string;
  draftPosition: number;
  roster: Player[];
  rosterNeeds: RosterNeeds;
}

export interface League {
  id: string;
  name: string;
  teams: Team[];
  scoringType: '0.5PPR' | 'PPR' | 'STANDARD';
  rosterSettings: RosterSettings;
  draftSettings: DraftSettings;
}

export interface RosterSettings {
  qb: number;
  rb: number;
  wr: number;
  te: number;
  flex: number;
  dst: number;
  k: number;
  bench: number;
  ir?: number;
}

export interface DraftSettings {
  rounds: number;
  secondsPerPick: number;
  draftType: 'SNAKE' | 'LINEAR';
  startTime: Date;
}

export interface DraftState {
  currentRound: number;
  currentPick: number;
  currentTeam: string;
  picks: DraftPick[];
  isUserTurn: boolean;
  timeRemaining: number;
}

export interface PlayerComparison {
  players: Player[];
  comparisonMetrics: {
    projectedPoints: number[];
    adpDifferential: number[];
    positionScarcity: number[];
    scheduleStrength: number[];
  };
}

export interface Recommendation {
  player: Player;
  score: number;
  reasons: string[];
  tier: number;
  positionRank: number;
}