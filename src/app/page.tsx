import Link from 'next/link'
import { ArrowRight, Trophy, TrendingUp, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Fantasy Football 2025
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your intelligent draft assistant for Yahoo Fantasy Football
          </p>
          <Link
            href="/draft"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Draft Assistant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card p-6 rounded-lg border">
            <Trophy className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-muted-foreground">
              Get real-time player suggestions based on your league settings and roster needs
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Value Analysis</h3>
            <p className="text-muted-foreground">
              Identify players falling below ADP and capitalize on draft day values
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Sync</h3>
            <p className="text-muted-foreground">
              Track every pick in real-time with Yahoo Fantasy Sports integration
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}