export interface LeagueSettings {
  offense: {
    passingYards: number; // points per 20 yards
    yahooDefaultPassingYards: number; // points per 25 yards
    passingTouchdowns: number;
    interceptions: number;
    rushingYards: number; // points per 10 yards
    rushingTouchdowns: number;
    receptions: number; // PPR
    receivingYards: number; // points per 10 yards
    receivingTouchdowns: number;
    returnTouchdowns: number;
    twoPointConversions: number;
    fumblesLost: number;
    offensiveFumbleReturnTD: number;
    fortyPlusYardRun: number;
    fortyPlusYardRushingTouchdowns: number;
    fortyPlusYardReceptions: number;
    fortyPlusYardReceivingTouchdowns: number;
  };
  kickers: {
    fieldGoalsMissed0To19Yards: number;
    fieldGoalsMissed20To29Yards: number;
    pointAfterAttemptMade: number;
    fieldGoalsTotal: number; // points per 10 yards
  };
  defense: {
    sack: number;
    interception: number;
    fumbleRecovery: number;
    touchdown: number;
    safety: number;
    blockKick: number;
    kickoffAndPuntReturnTouchdowns: number;
    pointsAllowed0: number;
    pointsAllowed1To6: number;
    pointsAllowed7To13: number;
    pointsAllowed14To20: number;
    yahooDefaultPointsAllowed14To20: number;
    pointsAllowed35Plus: number;
    yahooDefaultPointsAllowed35Plus: number;
    fourthDownStops: number;
    extraPointReturned: number;
  };
}

export const defaultLeagueSettings: LeagueSettings = {
  offense: {
    passingYards: 20, // 1 point per 20 yards
    yahooDefaultPassingYards: 25, // 1 point per 25 yards
    passingTouchdowns: 4,
    interceptions: -1,
    rushingYards: 10, // 1 point per 10 yards
    rushingTouchdowns: 6,
    receptions: 0.5, // Half PPR
    receivingYards: 10, // 1 point per 10 yards
    receivingTouchdowns: 6,
    returnTouchdowns: 6,
    twoPointConversions: 2,
    fumblesLost: -2,
    offensiveFumbleReturnTD: 6,
    fortyPlusYardRun: 1,
    fortyPlusYardRushingTouchdowns: 1,
    fortyPlusYardReceptions: 1,
    fortyPlusYardReceivingTouchdowns: 1,
  },
  kickers: {
    fieldGoalsMissed0To19Yards: -2,
    fieldGoalsMissed20To29Yards: -1,
    pointAfterAttemptMade: 1,
    fieldGoalsTotal: 10, // 1 point per 10 yards
  },
  defense: {
    sack: 1,
    interception: 2,
    fumbleRecovery: 2,
    touchdown: 6,
    safety: 2,
    blockKick: 2,
    kickoffAndPuntReturnTouchdowns: 6,
    pointsAllowed0: 10,
    pointsAllowed1To6: 7,
    pointsAllowed7To13: 4,
    pointsAllowed14To20: 3,
    yahooDefaultPointsAllowed14To20: 1,
    pointsAllowed35Plus: -2,
    yahooDefaultPointsAllowed35Plus: -4,
    fourthDownStops: 0.5,
    extraPointReturned: 2,
  },
};