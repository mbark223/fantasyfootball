'use client'

import { Clock, User } from 'lucide-react'
import { DraftUpdate } from '@/lib/yahooDraftConnector'

interface DraftHistoryProps {
  draftUpdates: DraftUpdate[];
}

export default function DraftHistory({ draftUpdates }: DraftHistoryProps) {
  const pickUpdates = draftUpdates.filter(update => update.type === 'pick');

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Draft History</h2>
      </div>

      <div className="space-y-2">
        {pickUpdates.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {draftUpdates.some(u => u.type === 'start') 
              ? 'Waiting for first pick...' 
              : 'Connect to Yahoo to see live picks'}
          </div>
        ) : (
          pickUpdates.reverse().map((update, index) => (
            <div key={index} className="p-3 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  Round {update.pick?.round}, Pick {update.pick?.pickNumber}
                </span>
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="font-medium text-sm">
                {update.pick?.player.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {update.pick?.player.position} - {update.pick?.player.team}
              </div>
              <div className="text-xs text-primary mt-1">
                {update.pick?.team}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}