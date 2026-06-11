export default function Home() {
  return (
    <div className="h-full min-h-screen flex flex-col">
      {/* Top bar — brand chip */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-500">Brand:</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-black text-white">
          Stride
        </span>
      </header>

      {/* Main split — 40% left / 60% right */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left panel 40% — Supplier Connect (เดิม) ─── */}
        <div className="w-2/5 flex flex-col border-r border-gray-200 bg-white">
          <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
              Supplier Connect (เดิม)
            </span>
          </div>
          <div className="flex-1 p-5 overflow-auto">
            <p className="text-gray-400 text-sm">— legacy view placeholder —</p>
          </div>
        </div>

        {/* ─── Right panel 60% — + AI Layer ─── */}
        <div className="w-3/5 flex flex-col bg-gray-50">
          <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">
              + AI Layer
            </span>
          </div>
          <div className="flex-1 p-5 overflow-auto">
            <p className="text-gray-400 text-sm">— AI layer placeholder —</p>
          </div>
        </div>
      </div>
    </div>
  );
}
