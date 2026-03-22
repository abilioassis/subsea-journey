import React from 'react'
import { useStore } from '../../store/useStore'
import { Volume2, VolumeX } from 'lucide-react'

export default function HUD() {
  const { volume, setVolume, isMuted, toggleMute } = useStore()

  return (
    <div className="fixed bottom-8 left-8 z-10 flex items-center gap-4 rounded-full bg-slate-900/50 p-4 backdrop-blur-md border border-slate-700/50 transition-all hover:bg-slate-900/80">
      <button
        onClick={toggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600 active:scale-95"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {!isMuted && (
        <div className="flex flex-col gap-1 w-32">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-orange-500 transition-opacity"
          />
        </div>
      )}
    </div>
  )
}
