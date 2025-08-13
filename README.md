# Fantasy Football 2025 - Draft Assistant

A real-time draft assistant tool for Yahoo Fantasy Football that provides live player recommendations during a 10-team, 0.5 PPR league draft.

## Features

- **Yahoo Integration**: OAuth authentication and real-time draft sync
- **Smart Recommendations**: AI-powered player suggestions based on roster needs
- **Live Draft Board**: Track all picks as they happen
- **Position Analysis**: Identify position scarcity and value picks
- **Team Management**: Visual roster builder with positional requirements

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (planned)
- **Data Fetching**: TanStack Query
- **UI Components**: Custom components with Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Yahoo Fantasy Sports account
- Yahoo Developer App credentials (for OAuth)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mbark223/fantasyfootball.git
cd fantasyfootball
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Yahoo OAuth credentials:
```env
YAHOO_CLIENT_ID=your_client_id
YAHOO_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utility functions and API clients
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
└── styles/          # Global styles
```

## Development Roadmap

- [x] Initial project setup
- [x] Type definitions and data models
- [x] Basic UI components
- [ ] Yahoo OAuth integration
- [ ] API routes for data fetching
- [ ] State management with Zustand
- [ ] Real-time draft sync
- [ ] Recommendation engine
- [ ] Player comparison tools
- [ ] Draft history tracking

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT