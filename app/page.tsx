'use client'

import { useState } from 'react'
import LeftPanel from './components/LeftPanel'
import ChatPanel, { type BarClickData } from './components/ChatPanel'

export default function Home() {
  const [pendingQuery, setPendingQuery] = useState<BarClickData | null>(null)

  return (
    <div className="h-full min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-500">Brand:</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-black text-white">
          Stride
        </span>
      </header>

      {/* Main split — 40% left / 60% right */}
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel onBarClick={setPendingQuery} />

        {/* Right panel 60% — AI Layer */}
        <div className="w-3/5 flex flex-col bg-gray-50 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">
              + AI Layer
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatPanel
              pendingQuery={pendingQuery}
              onQueryHandled={() => setPendingQuery(null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
