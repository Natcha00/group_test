'use client'

import { useState } from 'react'
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { STOCK, BRANCHES, SKUS } from '@/lib/mockData'
import type { BarClickData } from './ChatPanel'

const BRANCH_SPACING = 3.2
const SKU_SPACING = 3.0
const BAR_W = 2.2
const HEIGHT_SCALE = 0.04

function urgencyColor(daysOfStock: number): string {
  if (daysOfStock < 7) return '#ef4444'
  if (daysOfStock < 15) return '#f59e0b'
  return '#22c55e'
}

function Bar({
  x, z, on_hand, avg_daily_sales, sku_id, branch_id, branch_name, onBarClick,
}: {
  x: number; z: number; on_hand: number; avg_daily_sales: number
  sku_id: string; branch_id: string; branch_name: string
  onBarClick: (data: BarClickData) => void
}) {
  const [hovered, setHovered] = useState(false)
  const days = on_hand / avg_daily_sales
  const color = urgencyColor(days)
  const height = Math.max(on_hand * HEIGHT_SCALE, 0.15)

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()
    onBarClick({ sku_id, branch_id, branch_name })
  }

  return (
    <mesh
      position={[x, height / 2, z]}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[BAR_W, height, BAR_W]} />
      <meshStandardMaterial color={color} emissive={hovered ? color : '#000000'} emissiveIntensity={hovered ? 0.3 : 0} />
    </mesh>
  )
}

function Scene({ onBarClick }: { onBarClick: (data: BarClickData) => void }) {
  const offsetX = ((BRANCHES.length - 1) * BRANCH_SPACING) / 2
  const offsetZ = ((SKUS.length - 1) * SKU_SPACING) / 2

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[12, 20, 8]} intensity={0.9} castShadow />

      {/* Ground */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 28]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      {/* Bars */}
      {STOCK.map((record) => {
        const bIdx = BRANCHES.findIndex((b) => b.branch_id === record.branch_id)
        const sIdx = SKUS.findIndex((s) => s.sku_id === record.sku_id)
        if (bIdx === -1 || sIdx === -1) return null
        const branch = BRANCHES[bIdx]
        return (
          <Bar
            key={`${record.branch_id}-${record.sku_id}`}
            x={bIdx * BRANCH_SPACING - offsetX}
            z={sIdx * SKU_SPACING - offsetZ}
            on_hand={record.on_hand}
            avg_daily_sales={record.avg_daily_sales}
            sku_id={record.sku_id}
            branch_id={record.branch_id}
            branch_name={branch.branch_name}
            onBarClick={onBarClick}
          />
        )
      })}

      {/* Branch labels — X axis */}
      {BRANCHES.map((branch, i) => (
        <Html
          key={branch.branch_id}
          position={[i * BRANCH_SPACING - offsetX, 0.1, offsetZ + 2.2]}
          center
          distanceFactor={12}
        >
          <span style={{ fontSize: '11px', color: '#374151', fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            {branch.branch_id}
          </span>
        </Html>
      ))}

      {/* SKU labels — Z axis */}
      {SKUS.map((sku, i) => (
        <Html
          key={sku.sku_id}
          position={[-offsetX - 2, 0.1, i * SKU_SPACING - offsetZ]}
          center
          distanceFactor={12}
        >
          <span style={{ fontSize: '11px', color: '#374151', fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            {sku.sku_id}
          </span>
        </Html>
      ))}

      <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
    </>
  )
}

export default function ThreeDChart({ onBarClick }: { onBarClick: (data: BarClickData) => void }) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [18, 14, 20], fov: 48 }}
        style={{ background: '#f3f4f6' }}
      >
        <Scene onBarClick={onBarClick} />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg shadow px-3 py-2 flex flex-col gap-1 text-xs text-gray-700">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#ef4444]" />
          <span>&lt;7 วัน</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#f59e0b]" />
          <span>7–14 วัน</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#22c55e]" />
          <span>≥15 วัน</span>
        </div>
        <div className="mt-1 text-gray-400 text-[10px]">คลิกแท่งเพื่อดูรายละเอียด</div>
      </div>
    </div>
  )
}
