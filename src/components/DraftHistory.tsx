'use client'

import { Clock } from 'lucide-react'

export default function DraftHistory() {
  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Draft History</h2>
      </div>

      <div className="space-y-2">
        {/* Placeholder for draft history */}
        <div className="text-center py-8 text-sm text-muted-foreground">
          Draft picks will appear here
        </div>
      </div>
    </div>
  )
}