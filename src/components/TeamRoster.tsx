'use client'

import { User, Trophy } from 'lucide-react'

export default function TeamRoster() {
  const positions = [
    { label: 'QB', slots: 1, filled: 0 },
    { label: 'RB', slots: 2, filled: 0 },
    { label: 'WR', slots: 2, filled: 0 },
    { label: 'TE', slots: 1, filled: 0 },
    { label: 'FLEX', slots: 1, filled: 0 },
    { label: 'DST', slots: 1, filled: 0 },
    { label: 'K', slots: 1, filled: 0 },
    { label: 'BENCH', slots: 6, filled: 0 },
  ]

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Your Team</h2>
      </div>

      <div className="space-y-3">
        {positions.map((pos) => (
          <div key={pos.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{pos.label}</span>
              <span className="text-xs text-muted-foreground">
                {pos.filled}/{pos.slots}
              </span>
            </div>
            <div className="space-y-1">
              {Array.from({ length: pos.slots }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-secondary rounded-md flex items-center px-3 text-sm text-muted-foreground"
                >
                  <User className="h-3 w-3 mr-2" />
                  <span>Empty</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}