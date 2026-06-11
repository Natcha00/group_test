'use client'

import { useState, useEffect, useRef } from 'react'
import { STOCK, SKUS } from '@/lib/mockData'

export type BarClickData = {
  sku_id: string
  branch_id: string
  branch_name: string
}

type Action = {
  label: string
  variant: 'primary' | 'secondary'
}

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
  tools?: string[]
  actions?: Action[]
}

function buildAIResponse(
  sku_id: string,
  branch_id: string,
  branch_name: string,
): { content: string; tools: string[]; actions: Action[] } {
  const record = STOCK.find((r) => r.sku_id === sku_id && r.branch_id === branch_id)
  const skuInfo = SKUS.find((s) => s.sku_id === sku_id)

  if (!record || !skuInfo) {
    return {
      content: `ไม่พบข้อมูลสต็อกสำหรับ ${sku_id} ที่ ${branch_name}`,
      tools: ['check_stock()'],
      actions: [],
    }
  }

  const days = record.days_of_stock

  if (sku_id === 'RUN-A' && branch_id === 'CSM') {
    const cwdRecord = STOCK.find((r) => r.sku_id === 'RUN-A' && r.branch_id === 'CWD')!
    return {
      content:
        `⚠️ พบ imbalance ร้ายแรงสำหรับ RUN-A ในเครือข่ายสาขา\n\n` +
        `**${branch_name} (CSM)** มีสต็อกเพียง ${record.on_hand} ชิ้น (${days.toFixed(1)} วัน) — อยู่ในระดับวิกฤต ` +
        `ขณะที่ **CentralWorld (CWD)** มีสต็อกสูงเกินไปถึง ${cwdRecord.on_hand} ชิ้น (${cwdRecord.days_of_stock} วัน)\n\n` +
        `แนะนำให้โอนสต็อกจาก CWD ไป CSM โดยเร็ว เพื่อป้องกันสินค้าขาดสต็อกที่ CSM ภายใน 2 วัน และลดสต็อกค้างที่ CWD`,
      tools: ['check_stock()', 'get_stock_network()'],
      actions: [
        { label: 'โอนสต็อก CWD → CSM (150 ชิ้น)', variant: 'primary' },
        { label: 'สั่งซื้อเร่งด่วน CSM', variant: 'secondary' },
      ],
    }
  }

  if (sku_id === 'RUN-A' && branch_id === 'CWD') {
    return {
      content:
        `สต็อก RUN-A ที่ **CentralWorld (CWD)** มีจำนวน ${record.on_hand} ชิ้น คิดเป็น ${days.toFixed(0)} วัน ` +
        `— เกินกว่าเป้าหมาย 30 วันอย่างมีนัยสำคัญ\n\n` +
        `แนะนำพิจารณาโอนสต็อกไปยังสาขาที่มีความต้องการสูงกว่า เช่น CSM ที่มีสต็อกวิกฤตเพียง 1.5 วัน`,
      tools: ['check_stock()', 'get_stock_network()'],
      actions: [{ label: 'โอนสต็อก CWD → CSM', variant: 'primary' }],
    }
  }

  let statusLine: string
  let emoji: string
  if (days < 7) {
    statusLine = 'วิกฤต — ต้องเติมสต็อกเร่งด่วน'
    emoji = '🔴'
  } else if (days < 15) {
    statusLine = 'ต่ำ — ควรวางแผนเติมสต็อก'
    emoji = '🟡'
  } else {
    statusLine = 'ปกติ'
    emoji = '🟢'
  }

  return {
    content:
      `${emoji} สต็อก **${sku_id}** (${skuInfo.sku_name}) ที่ **${branch_name}**\n\n` +
      `- คงเหลือ: ${record.on_hand} ชิ้น\n` +
      `- ยอดขายเฉลี่ย: ${record.avg_daily_sales} ชิ้น/วัน\n` +
      `- ประมาณการ: ${days.toFixed(1)} วัน\n` +
      `- สถานะ: ${statusLine}`,
    tools: ['check_stock()'],
    actions: days < 7 ? [{ label: 'สั่งซื้อเร่งด่วน', variant: 'primary' as const }] : [],
  }
}

function renderContent(text: string) {
  return text.split('\n\n').map((para, pi) => (
    <p key={pi} className={pi > 0 ? 'mt-2' : ''}>
      {para.split('\n').map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/).map((segment, si) =>
            segment.startsWith('**') && segment.endsWith('**') ? (
              <strong key={si}>{segment.slice(2, -2)}</strong>
            ) : (
              segment
            ),
          )}
        </span>
      ))}
    </p>
  ))
}

export default function ChatPanel({
  pendingQuery,
  onQueryHandled,
}: {
  pendingQuery: BarClickData | null
  onQueryHandled: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const streamingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!pendingQuery) return

    const { sku_id, branch_id, branch_name } = pendingQuery
    const userText = `วิเคราะห์สต็อก ${sku_id} ที่ ${branch_name} และแนะนำการจัดการ`
    const assistantId = `ai-${Date.now()}`

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: userText },
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ])

    onQueryHandled()

    const { content, tools, actions } = buildAIResponse(sku_id, branch_id, branch_name)
    let revealed = 0
    const CHUNK = 4

    const tick = () => {
      revealed = Math.min(revealed + CHUNK, content.length)
      const done = revealed >= content.length
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: content.slice(0, revealed),
                streaming: !done,
                tools: done ? tools : undefined,
                actions: done ? actions : undefined,
              }
            : m,
        ),
      )
      if (!done) streamingTimer.current = setTimeout(tick, 15)
    }

    streamingTimer.current = setTimeout(tick, 350)

    return () => {
      if (streamingTimer.current) clearTimeout(streamingTimer.current)
    }
  }, [pendingQuery])

  function submitMessage(text: string) {
    if (!text.trim()) return
    const assistantId = `ai-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: text.trim() },
      {
        id: assistantId,
        role: 'assistant',
        content: 'กรุณาคลิกแท่ง 3D เพื่อเลือก SKU และสาขาที่ต้องการวิเคราะห์',
        tools: [],
        actions: [],
      },
    ])
    setInputValue('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-8">
            คลิกแท่งใน 3D View เพื่อวิเคราะห์สต็อก
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              {renderContent(msg.content)}
              {msg.streaming && (
                <span className="inline-block w-1.5 h-4 bg-gray-400 rounded-sm ml-0.5 animate-pulse align-middle" />
              )}

              {/* Trust chips */}
              {msg.tools && msg.tools.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {msg.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      🔧 {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.actions.map((action) => (
                    <button
                      key={action.label}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        action.variant === 'primary'
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submitMessage(inputValue)
              }
            }}
            placeholder="พิมพ์คำถาม หรือคลิกแท่ง 3D…"
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
          />
          <button
            onClick={() => submitMessage(inputValue)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40"
            disabled={!inputValue.trim()}
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  )
}
