import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function AmbientHum() {
  const { volume, isMuted } = useStore()
  const { camera } = useThree()
  const sound = useRef<THREE.Audio>(null!)
  const oscillator = useRef<OscillatorNode | null>(null)
  const oscillator2 = useRef<OscillatorNode | null>(null)

  useEffect(() => {
    // Inicialização conforme o Contexto Técnico: THREE.AudioListener (US-02)
    const listener = new THREE.AudioListener()
    camera.add(listener)
    
    // NFR03 Sugere AudioLoader, mas como geramos o som via oscilador,
    // usamos o Audio Context do Listener do Three.js
    const audio = new THREE.Audio(listener)
    sound.current = audio
    const ctx = listener.context

    oscillator.current = ctx.createOscillator()
    oscillator2.current = ctx.createOscillator()
    
    // Configurações idênticas ao v2.0 para manter a sonoridade aprovada
    oscillator.current.type = 'sine'
    oscillator.current.frequency.setValueAtTime(60, ctx.currentTime)
    
    oscillator2.current.type = 'sine'
    oscillator2.current.frequency.setValueAtTime(120, ctx.currentTime)
    
    const osc2Gain = ctx.createGain()
    osc2Gain.gain.setValueAtTime(0.3, ctx.currentTime)

    // Conecta os osciladores ao nó de ganho do objeto THREE.Audio
    oscillator.current.connect(audio.getOutput())
    oscillator2.current.connect(osc2Gain)
    osc2Gain.connect(audio.getOutput())

    oscillator.current.start()
    oscillator2.current.start()

    return () => {
      oscillator.current?.stop()
      oscillator2.current?.stop()
      camera.remove(listener)
    }
  }, [camera])

  useEffect(() => {
    if (sound.current) {
      const targetGain = isMuted ? 0 : volume * 0.4
      sound.current.setVolume(targetGain)
    }
  }, [volume, isMuted])

  return null
}
