import { defaultLeagueSettings, LeagueSettings } from '@/config/leagueSettings';

export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  adp: number;
  projectedPoints: number;
  byeWeek: number;
}

export interface DraftContext {
  currentPick: number;
  totalPicks: number;
  myRoster: Player[];
  draftedPlayers: string[];
  availablePlayers: Player[];
  leagueSettings: LeagueSettings;
}

export interface Recommendation {
  player: Player;
  score: number;
  reasoning: string;
  positionalNeed: string;
}

export class FantasyAssistant {
  private leagueSettings: LeagueSettings;

  constructor(leagueSettings: LeagueSettings = defaultLeagueSettings) {
    this.leagueSettings = leagueSettings;
  }

  calculateProjectedPoints(player: Player, stats: any): number {
    let points = 0;
    const settings = this.leagueSettings;

    if (player.position === 'QB') {
      points += (stats.passingYards || 0) / settings.offense.passingYards;
      points += (stats.passingTouchdowns || 0) * settings.offense.passingTouchdowns;
      points += (stats.interceptions || 0) * settings.offense.interceptions;
      points += (stats.rushingYards || 0) / settings.offense.rushingYards;
      points += (stats.rushingTouchdowns || 0) * settings.offense.rushingTouchdowns;
    } else if (player.position === 'RB') {
      points += (stats.rushingYards || 0) / settings.offense.rushingYards;
      points += (stats.rushingTouchdowns || 0) * settings.offense.rushingTouchdowns;
      points += (stats.receptions || 0) * settings.offense.receptions;
      points += (stats.receivingYards || 0) / settings.offense.receivingYards;
      points += (stats.receivingTouchdowns || 0) * settings.offense.receivingTouchdowns;
    } else if (player.position === 'WR' || player.position === 'TE') {
      points += (stats.receptions || 0) * settings.offense.receptions;
      points += (stats.receivingYards || 0) / settings.offense.receivingYards;
      points += (stats.receivingTouchdowns || 0) * settings.offense.receivingTouchdowns;
    } else if (player.position === 'K') {
      points += (stats.fieldGoalsMade || 0) * 3; // Simplified, would need distance breakdown
      points += (stats.extraPointsMade || 0) * settings.kickers.pointAfterAttemptMade;
    } else if (player.position === 'DEF') {
      // Simplified defense scoring
      points += (stats.sacks || 0) * settings.defense.sack;
      points += (stats.interceptions || 0) * settings.defense.interception;
      points += (stats.touchdowns || 0) * settings.defense.touchdown;
    }

    // Account for fumbles and 2-point conversions
    points += (stats.fumblesLost || 0) * settings.offense.fumblesLost;
    points += (stats.twoPointConversions || 0) * settings.offense.twoPointConversions;

    return points;
  }

  getRecommendations(context: DraftContext): Recommendation[] {
    const { myRoster, availablePlayers } = context;
    const recommendations: Recommendation[] = [];

    // Analyze roster needs
    const positionCounts = myRoster.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Define ideal roster construction
    const idealRoster = {
      QB: 1,
      RB: 2,
      WR: 3,
      TE: 1,
      K: 1,
      DEF: 1,
    };

    // Score each available player
    availablePlayers.forEach(player => {
      const currentCount = positionCounts[player.position] || 0;
      const idealCount = idealRoster[player.position as keyof typeof idealRoster] || 0;
      const needScore = Math.max(0, idealCount - currentCount);

      // Calculate value over replacement
      const replacementLevel = this.getReplacementLevel(player.position, availablePlayers);
      const valueOverReplacement = player.projectedPoints - replacementLevel;

      // Combine factors
      const score = valueOverReplacement * (1 + needScore * 0.3);

      recommendations.push({
        player,
        score,
        reasoning: this.generateReasoning(player, needScore, valueOverReplacement),
        positionalNeed: needScore > 0 ? 'HIGH' : 'LOW',
      });
    });

    // Sort by score and return top 5
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  private getReplacementLevel(position: string, availablePlayers: Player[]): number {
    const positionPlayers = availablePlayers
      .filter(p => p.position === position)
      .sort((a, b) => b.projectedPoints - a.projectedPoints);

    // Get the 12th best player at the position (or last if fewer)
    const replacementIndex = Math.min(11, positionPlayers.length - 1);
    return positionPlayers[replacementIndex]?.projectedPoints || 0;
  }

  private generateReasoning(player: Player, needScore: number, valueOverReplacement: number): string {
    const reasons = [];

    if (valueOverReplacement > 50) {
      reasons.push('Elite value at position');
    } else if (valueOverReplacement > 25) {
      reasons.push('Strong value pick');
    }

    if (needScore > 0) {
      reasons.push(`Fills roster need at ${player.position}`);
    }

    if (player.adp > 0) {
      reasons.push(`ADP value (ranked #${player.adp})`);
    }

    return reasons.join('. ') || 'Solid pick based on projections';
  }

  updateLeagueSettings(settings: Partial<LeagueSettings>) {
    this.leagueSettings = { ...this.leagueSettings, ...settings };
  }
}