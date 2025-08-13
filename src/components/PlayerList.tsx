'use client'

import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Position } from '@/types'

interface PlayerListProps {
  selectedPosition: string
  onPositionChange: (position: string) => void
}

const positions: (Position | 'ALL' | 'FLEX')[] = ['ALL', 'QB', 'RB', 'WR', 'TE', 'FLEX', 'DST', 'K']

export default function PlayerList({ selectedPosition, onPositionChange }: PlayerListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-full flex flex-col">
      {/* Filters and Search */}
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {/* Position Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => onPositionChange(pos)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === pos
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Player Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-2">
          {/* Placeholder for player data */}
          <div className="text-center py-8 text-muted-foreground">
            Connect to Yahoo to load player data
          </div>
        </div>
      </div>
    </div>
  )
}