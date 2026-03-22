import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera, useTexture } from '@react-three/drei'
import { getThemeColor } from '../../utils/theme'
import MarineSnow from './MarineSnow'
import AmbientHum from '../audio/AmbientHum'
import { SubseaAsset } from './SubseaAsset'
import { Suspense } from 'react'

function CausticLight() {
  const causticMap = useTexture('/textures/caustics.png')
  
  useEffect(() => {
    if (causticMap) {
      causticMap.wrapS = causticMap.wrapT = THREE.RepeatWrapping
    }
  }, [causticMap])

  useFrame((_state: any, delta: number) => {
    if (causticMap) {
      causticMap.offset.x += 0.01 * delta
      causticMap.offset.y += 0.01 * delta
    }
  })

  return (
    <spotLight 
      position={[0, 15, 0]} 
      angle={0.8} 
      penumbra={1} 
      intensity={1000} // Aumentada para garantir visibilidade
      color="#ffffff"
      distance={40}
      castShadow 
      map={causticMap} 
      shadow-mapSize={[2048, 2048]}
    />
  )
}

export default function SubseaCanvas() {
  const [abyssalColor, setAbyssalColor] = useState('#020617')
  
  useEffect(() => {
    const themeColor = getThemeColor('--color-abyssal')
    setAbyssalColor(themeColor)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={[abyssalColor]} />
        <fogExp2 attach="fog" args={[abyssalColor, 0.02]} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45} />

        {/* ILUMINAÇÃO BÁSICA */}
        <ambientLight intensity={0.5} />
        <hemisphereLight color="#cae8ff" groundColor="#3b2b1a" intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={50} color="#ffffff" castShadow />

        {/* Atmosfera */}
        <MarineSnow />
        <AmbientHum />

        {/* CENA PRINCIPAL */}
        <Suspense fallback={null}>
          <CausticLight />
          <SubseaAsset />
        </Suspense>

        <OrbitControls 
          makeDefault 
          enableDamping={true} 
          maxDistance={25} 
          minDistance={2} 
        />

        {/* Solo Abissal */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial 
            color={abyssalColor} 
            roughness={0.8} 
            metalness={0.1} 
          />
        </mesh>
      </Canvas>
    </div>
  )
}