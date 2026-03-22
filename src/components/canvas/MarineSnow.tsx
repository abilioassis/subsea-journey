import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MarineSnow({ count = 1500 }) {
  const mesh = useRef<THREE.Points>(null!)

  // Gera as posições aleatórias uma única vez
  const dummy = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state, delta) => {
    if (!mesh.current || !mesh.current.geometry.attributes.position) return
    
    const { array } = mesh.current.geometry.attributes.position as THREE.BufferAttribute
    
    for (let i = 0; i < count; i++) {
      // Movimento suave de descida (neve marinha)
      array[i * 3 + 1] -= delta * 0.2
      
      // ADICIONADO: Deriva lateral aleatória (Drift - AC05)
      array[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.005
      array[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i) * 0.005
      
      // Recicla a partícula quando ela sai da vista (abaixo de -5)
      if (array[i * 3 + 1] < -5) {
        array[i * 3 + 1] = 5
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[dummy, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  )
}
