import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { draftId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7);
    const { draftId } = params;

    // If no real Yahoo credentials are configured, return mock data
    if (!process.env.YAHOO_CLIENT_ID || !process.env.YAHOO_CLIENT_SECRET) {
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
      return NextResponse.json(mockDraftData);
    }

    // Make actual API call to Yahoo Fantasy API
    // Note: The exact endpoint may vary based on Yahoo's API documentation
    const yahooApiUrl = `https://fantasysports.yahooapis.com/fantasy/v2/league/${draftId}/draftresults`;
    
    const response = await fetch(yahooApiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Yahoo API error:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Failed to fetch draft data from Yahoo' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching draft updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch draft updates' },
      { status: 500 }
    );
  }
}