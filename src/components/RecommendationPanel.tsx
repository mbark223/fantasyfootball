'use client'

import { TrendingUp, AlertCircle, Target } from 'lucide-react'

export default function RecommendationPanel() {
  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recommendations</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          Round 1, Pick 5
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {/* Placeholder recommendations */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-secondary rounded-lg p-3 hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                #{i}
              </span>
              <TrendingUp className="h-3 w-3 text-green-500" />
            </div>
            <h3 className="font-medium text-sm truncate">Player Name</h3>
            <p className="text-xs text-muted-foreground">RB - DAL</p>
            <div className="mt-2 flex items-center gap-1">
              <Target className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">98.5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}