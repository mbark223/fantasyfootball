import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not provided' },
      { status: 400 }
    );
  }

  // In production, this would handle the OAuth callback
  // For now, redirect back to the draft page with a success message
  const redirectUrl = new URL('/draft', request.url);
  redirectUrl.searchParams.set('yahoo_connected', 'true');
  
  return NextResponse.redirect(redirectUrl);
}