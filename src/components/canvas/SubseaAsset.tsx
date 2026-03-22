import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function SubseaAsset() {
  // AC01: Carregamento do modelo /models/equipment.glb através do hook useGLTF
  const { scene } = useGLTF('/models/equipment.glb')

  // AC04: Implementação de traverse para habilitar castShadow e receiveShadow
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // AC05: O modelo deve ser centralizado (Y=0) e escalonado conforme necessário.
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]} 
      scale={1} 
    />
  )
}

// Pré-carregamento do modelo para otimizar a performance (NFR01)
useGLTF.preload('/models/equipment.glb')
