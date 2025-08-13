'use client'

import { useState, useEffect } from 'react'
import DraftBoard from '@/components/DraftBoard'
import PlayerList from '@/components/PlayerList'
import TeamRoster from '@/components/TeamRoster'
import RecommendationPanel from '@/components/RecommendationPanel'
import DraftHistory from '@/components/DraftHistory'
import YahooConnectButton from '@/components/YahooConnectButton'
import { MockYahooDraftConnector, DraftUpdate } from '@/lib/yahooDraftConnector'
import { FantasyAssistant } from '@/lib/fantasyAssistant'

export default function DraftPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL')
  const [isYahooConnected, setIsYahooConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [draftUpdates, setDraftUpdates] = useState<DraftUpdate[]>([])
  const [draftConnector, setDraftConnector] = useState<MockYahooDraftConnector | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (draftConnector) {
        draftConnector.disconnect()
      }
    }
  }, [draftConnector])

  const handleYahooConnect = async () => {
    setIsConnecting(true)
    try {
      const connector = new MockYahooDraftConnector(
        {
          clientId: 'mock_client_id',
          clientSecret: 'mock_client_secret',
          redirectUri: window.location.origin + '/api/yahoo/callback',
        },
        'mock_league_id',
        'mock_draft_id',
        (update: DraftUpdate) => {
          setDraftUpdates(prev => [...prev, update])
          // Here we would trigger re-calculation of recommendations
          console.log('Draft update received:', update)
        }
      )

      await connector.connect()
      setDraftConnector(connector)
      setIsYahooConnected(true)
    } catch (error) {
      console.error('Failed to connect to Yahoo:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-card border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Fantasy Draft Assistant</h1>
        <YahooConnectButton
          onConnect={handleYahooConnect}
          isConnected={isYahooConnected}
          isConnecting={isConnecting}
        />
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
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