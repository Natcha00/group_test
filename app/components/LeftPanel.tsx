'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { BarClickData } from './ChatPanel'

const ThreeDChart = dynamic(() => import('./ThreeDChart'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      กำลังโหลด 3D view…
    </div>
  ),
})

type Tab = 'legacy' | '3d'

export default function LeftPanel({ onBarClick }: { onBarClick: (data: BarClickData) => void }) {
  const [tab, setTab] = useState<Tab>('3d')

  return (
    <div className="w-2/5 flex flex-col border-r border-gray-200 bg-white">
      {/* Tab bar */}
      <div className="px-4 pt-2 border-b border-gray-200 flex items-end gap-0">
        <button
          onClick={() => setTab('legacy')}
          className={`px-4 py-2 text-xs font-semibold rounded-t-md border-x border-t transition-colors ${
            tab === 'legacy'
              ? 'bg-white text-gray-800 border-gray-200 -mb-px'
              : 'bg-gray-50 text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Supplier Connect (เดิม)
        </button>
        <button
          onClick={() => setTab('3d')}
          className={`px-4 py-2 text-xs font-semibold rounded-t-md border-x border-t transition-colors ${
            tab === '3d'
              ? 'bg-white text-indigo-700 border-gray-200 -mb-px'
              : 'bg-gray-50 text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          3D View
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === 'legacy' && (
          <div className="p-5">
            <p className="text-gray-400 text-sm">— legacy view placeholder —</p>
          </div>
        )}
        {tab === '3d' && (
          <div className="w-full h-full">
            <ThreeDChart onBarClick={onBarClick} />
          </div>
        )}
      </div>
    </div>
  )
}
