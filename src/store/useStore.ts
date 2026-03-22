import { create } from 'zustand'

interface SubseaState {
  depth: number
  volume: number
  isMuted: boolean
  setDepth: (depth: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
}

export const useStore = create<SubseaState>((set) => ({
  depth: 0,
  volume: 0.5,
  isMuted: true,
  setDepth: (depth) => set({ depth }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}))
