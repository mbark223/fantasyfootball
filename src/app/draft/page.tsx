'use client'

import { useState } from 'react'
import DraftBoard from '@/components/DraftBoard'
import PlayerList from '@/components/PlayerList'
import TeamRoster from '@/components/TeamRoster'
import RecommendationPanel from '@/components/RecommendationPanel'
import DraftHistory from '@/components/DraftHistory'

export default function DraftPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL')

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Sidebar - Draft History */}
        <div className="w-64 bg-card border-r overflow-y-auto">
          <DraftHistory />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar - Recommendations */}
          <div className="h-32 bg-card border-b">
            <RecommendationPanel />
          </div>

          {/* Center - Player List */}
          <div className="flex-1 overflow-hidden">
            <PlayerList
              selectedPosition={selectedPosition}
              onPositionChange={setSelectedPosition}
            />
          </div>
        </div>

        {/* Right Sidebar - Team Roster */}
        <div className="w-80 bg-card border-l overflow-y-auto">
          <TeamRoster />
        </div>
      </div>
    </div>
  )
}