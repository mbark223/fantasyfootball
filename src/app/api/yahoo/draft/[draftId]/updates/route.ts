import { NextRequest, NextResponse } from 'next/server';

// Mock draft data for development
const mockDraftData = {
  picks: [
    {
      pickNumber: 1,
      round: 1,
      team: { name: 'Team 1' },
      player: {
        playerId: 'player_1',
        name: 'Christian McCaffrey',
        position: 'RB',
        team: 'SF',
      },
      timestamp: new Date().toISOString(),
    },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { draftId: string } }
) {
  try {
    // In production, this would:
    // 1. Validate the authorization token
    // 2. Make actual API calls to Yahoo Fantasy API
    // 3. Return real draft updates

    // For now, return mock data for development
    return NextResponse.json(mockDraftData);
  } catch (error) {
    console.error('Error fetching draft updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch draft updates' },
      { status: 500 }
    );
  }
}