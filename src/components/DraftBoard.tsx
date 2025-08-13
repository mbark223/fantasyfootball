'use client'

export default function DraftBoard() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Draft Board</h2>
      <div className="grid grid-cols-10 gap-2">
        {/* Placeholder for draft board grid */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-secondary rounded-md flex items-center justify-center text-xs"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}