# Yahoo Fantasy League Connection Setup

## Prerequisites

1. Yahoo Fantasy Sports account with an active draft
2. Yahoo Developer App credentials

## Getting Yahoo API Credentials

1. Go to [Yahoo Developer Network](https://developer.yahoo.com/)
2. Create a new app:
   - Click "Create an App"
   - Fill in app details:
     - Application Name: "Fantasy Football Draft Assistant"
     - Description: "Real-time draft assistant"
     - Redirect URI: `http://localhost:3000/api/yahoo/callback`
   - Select API Permissions: "Fantasy Sports" (Read)
3. Once created, you'll receive:
   - Client ID (App ID)
   - Client Secret

## Configuration

1. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Yahoo credentials:
   ```
   YAHOO_CLIENT_ID=your_client_id_here
   YAHOO_CLIENT_SECRET=your_client_secret_here
   YAHOO_REDIRECT_URI=http://localhost:3000/api/yahoo/callback
   NEXT_PUBLIC_YAHOO_CLIENT_ID=your_client_id_here
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

## Connecting Your League

1. Navigate to the Draft page
2. Click "Connect Yahoo Draft"
3. You'll be redirected to Yahoo to authorize the app
4. After authorization, you'll be redirected back to the app
5. The app will begin polling for real-time draft updates every 5 seconds

## Features

- **Real-time Updates**: Automatically polls Yahoo for new draft picks every 5 seconds
- **Connection Status**: Visual indicator shows connection status and last update time
- **Mock Mode**: If no Yahoo credentials are configured, the app runs in mock mode for testing

## Troubleshooting

### "Yahoo API credentials not configured" error
- Ensure you've added credentials to `.env`
- Restart the development server after adding credentials

### Not seeing real-time updates
- Check the connection status indicator
- Verify your league/draft ID is correct
- Ensure your Yahoo draft is active

### Authentication issues
- Verify your redirect URI matches exactly in both Yahoo app settings and `.env`
- Check that your Client ID and Secret are correct
- Try clearing browser cookies and re-authenticating

## Development Mode

If you don't have Yahoo credentials yet, the app will automatically use mock data:
- Simulates draft picks every 10 seconds
- Useful for testing the UI without a real Yahoo connection