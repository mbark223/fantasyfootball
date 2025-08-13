export interface DraftUpdate {
  type: 'pick' | 'start' | 'end' | 'pause';
  pick?: {
    round: number;
    pickNumber: number;
    team: string;
    player: {
      id: string;
      name: string;
      position: string;
      team: string;
    };
  };
  timestamp: Date;
}

export interface YahooAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
}

export class YahooDraftConnector {
  private wsConnection: WebSocket | null = null;
  private pollingInterval: NodeJS.Timeout | null = null;
  private authConfig: YahooAuthConfig;
  private leagueId: string;
  private draftId: string;
  private onUpdate: (update: DraftUpdate) => void;
  private lastPickNumber = 0;

  constructor(
    authConfig: YahooAuthConfig,
    leagueId: string,
    draftId: string,
    onUpdate: (update: DraftUpdate) => void
  ) {
    this.authConfig = authConfig;
    this.leagueId = leagueId;
    this.draftId = draftId;
    this.onUpdate = onUpdate;
  }

  async connect() {
    // For MVP, we'll use polling. WebSocket support can be added later
    await this.startPolling();
  }

  disconnect() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  private async startPolling() {
    // Poll every 5 seconds for draft updates
    this.pollingInterval = setInterval(async () => {
      try {
        const updates = await this.fetchDraftUpdates();
        updates.forEach(update => this.onUpdate(update));
      } catch (error) {
        console.error('Error polling draft updates:', error);
      }
    }, 5000);

    // Initial fetch
    const updates = await this.fetchDraftUpdates();
    updates.forEach(update => this.onUpdate(update));
  }

  private async fetchDraftUpdates(): Promise<DraftUpdate[]> {
    // This would make actual API calls to Yahoo
    // For now, return mock data structure
    const response = await fetch(`/api/yahoo/draft/${this.draftId}/updates`, {
      headers: {
        'Authorization': `Bearer ${this.authConfig.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch draft updates');
    }

    const data = await response.json();
    const updates: DraftUpdate[] = [];

    // Process new picks
    if (data.picks && Array.isArray(data.picks)) {
      data.picks.forEach((pick: any) => {
        if (pick.pickNumber > this.lastPickNumber) {
          updates.push({
            type: 'pick',
            pick: {
              round: pick.round,
              pickNumber: pick.pickNumber,
              team: pick.team.name,
              player: {
                id: pick.player.playerId,
                name: pick.player.name,
                position: pick.player.position,
                team: pick.player.team,
              },
            },
            timestamp: new Date(pick.timestamp),
          });
          this.lastPickNumber = pick.pickNumber;
        }
      });
    }

    return updates;
  }

  async authenticateWithYahoo(): Promise<boolean> {
    // OAuth flow would be implemented here
    // This would redirect user to Yahoo for authentication
    const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?` +
      `client_id=${this.authConfig.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.authConfig.redirectUri)}&` +
      `response_type=code&` +
      `scope=fspt-r`;

    window.open(authUrl, '_blank');
    return true;
  }

  async handleAuthCallback(code: string): Promise<void> {
    // Exchange code for tokens
    const response = await fetch('/api/yahoo/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        clientId: this.authConfig.clientId,
        clientSecret: this.authConfig.clientSecret,
        redirectUri: this.authConfig.redirectUri,
      }),
    });

    const tokens = await response.json();
    this.authConfig.accessToken = tokens.access_token;
    this.authConfig.refreshToken = tokens.refresh_token;
  }

  isAuthenticated(): boolean {
    return !!this.authConfig.accessToken;
  }
}

// Mock implementation for development
export class MockYahooDraftConnector extends YahooDraftConnector {
  private mockPickInterval: NodeJS.Timeout | null = null;
  private currentPick = 1;

  async connect() {
    // Simulate picks every 30 seconds
    this.mockPickInterval = setInterval(() => {
      const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
      const teams = ['DAL', 'NYG', 'PHI', 'WAS', 'GB', 'CHI', 'MIN', 'DET'];
      
      const mockUpdate: DraftUpdate = {
        type: 'pick',
        pick: {
          round: Math.ceil(this.currentPick / 12),
          pickNumber: this.currentPick,
          team: `Team ${(this.currentPick % 12) + 1}`,
          player: {
            id: `player_${this.currentPick}`,
            name: `Mock Player ${this.currentPick}`,
            position: positions[Math.floor(Math.random() * positions.length)],
            team: teams[Math.floor(Math.random() * teams.length)],
          },
        },
        timestamp: new Date(),
      };

      this.onUpdate(mockUpdate);
      this.currentPick++;
    }, 30000);

    // Send initial start update
    this.onUpdate({
      type: 'start',
      timestamp: new Date(),
    });
  }

  disconnect() {
    if (this.mockPickInterval) {
      clearInterval(this.mockPickInterval);
      this.mockPickInterval = null;
    }
  }

  async authenticateWithYahoo(): Promise<boolean> {
    // Mock authentication - always succeed
    return true;
  }

  isAuthenticated(): boolean {
    return true;
  }
}