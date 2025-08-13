'use client'

import { useState } from 'react'
import { ExternalLink, CheckCircle, Loader2 } from 'lucide-react'

interface YahooConnectButtonProps {
  onConnect: () => Promise<void>;
  isConnected: boolean;
  isConnecting: boolean;
}

export default function YahooConnectButton({ 
  onConnect, 
  isConnected, 
  isConnecting 
}: YahooConnectButtonProps) {
  const handleConnect = async () => {
    try {
      await onConnect();
    } catch (error) {
      console.error('Failed to connect to Yahoo:', error);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-lg">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-medium">Connected to Yahoo Draft</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Connecting...</span>
        </>
      ) : (
        <>
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm font-medium">Connect Yahoo Draft</span>
        </>
      )}
    </button>
  );
}