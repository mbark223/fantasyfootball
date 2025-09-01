import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, clientId, clientSecret, redirectUri } = body;

    // Use environment variables if not provided
    const yahooClientId = clientId || process.env.YAHOO_CLIENT_ID;
    const yahooClientSecret = clientSecret || process.env.YAHOO_CLIENT_SECRET;
    const yahooRedirectUri = redirectUri || process.env.YAHOO_REDIRECT_URI;

    if (!yahooClientId || !yahooClientSecret) {
      return NextResponse.json(
        { error: 'Yahoo API credentials not configured' },
        { status: 500 }
      );
    }

    // Exchange authorization code for tokens
    const tokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
    const params = new URLSearchParams({
      client_id: yahooClientId,
      client_secret: yahooClientSecret,
      redirect_uri: yahooRedirectUri,
      code: code,
      grant_type: 'authorization_code',
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Yahoo token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange tokens with Yahoo' },
        { status: response.status }
      );
    }

    const tokens = await response.json();
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error exchanging tokens:', error);
    return NextResponse.json(
      { error: 'Failed to exchange tokens' },
      { status: 500 }
    );
  }
}