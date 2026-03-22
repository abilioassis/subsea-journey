import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera, useTexture } from '@react-three/drei'
import { getThemeColor } from '../../utils/theme'
import { useStore } from '../../store/useStore'
import MarineSnow from './MarineSnow'
import AmbientHum from '../audio/AmbientHum'

function Scene() {
  const [abyssalColor, setAbyssalColor] = useState('#000000')
  const { depth } = useStore()
  
  // Carregamento da textura de caustics para projeção (US-02)
  const causticMap = useTexture('/textures/caustics.png')
  
  // Configuração para repetição e animação
  useEffect(() => {
    if (causticMap) {
      causticMap.wrapS = causticMap.wrapT = THREE.RepeatWrapping
    }
  }, [causticMap])

  // Animação da textura para criar ilusão de água em movimento (US-02)
  useFrame((_state, delta) => {
    if (causticMap) {
      causticMap.offset.x += 0.01 * delta
      causticMap.offset.y += 0.01 * delta
    }
  })

  useEffect(() => {
    const themeColor = getThemeColor('--color-abyssal')
    setAbyssalColor(themeColor)
  }, [])

  return (
    <>
      <Stats />

      <color attach="background" args={[abyssalColor]} />
      <fogExp2 attach="fog" args={[abyssalColor, 0.02]} />

      <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45} />

      {/* ILUMINAÇÃO */}
      <ambientLight intensity={0.5} />
      <hemisphereLight color="#cae8ff" groundColor="#3b2b1a" intensity={0.3} />
      
      {/* Simulação de Holofote de ROV (Projeção de Caustics no Leito) */}
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.8} 
        penumbra={1} 
        intensity={400} 
        color="#ffffff"
        distance={40}
        castShadow 
        map={causticMap} 
        shadow-mapSize={[2048, 2048]}
      />

      {/* Luz Técnica de Inspeção (Limpa para o Cubo) */}
      <pointLight position={[5, 5, 5]} intensity={50} color="#ffffff" castShadow />
      
      {/* Sistema de Partículas Marine Snow */}
      <MarineSnow />
      
      {/* Áudio Ambiente Abissal (US-02 AC06) */}
      <AmbientHum />

      {/* CENA */}
      {/* Objeto de Teste - Laranja com Brilho Próprio para Visibilidade Técnica */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#f97316" 
          roughness={0.4} 
          metalness={0.6}
          emissive="#f97316"
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Solo Abissal - Transição Seamless para o Infinito */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial 
          color={abyssalColor} 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>

      <OrbitControls 
        makeDefault 
        enableDamping={true} 
        maxDistance={25} 
        minDistance={2} 
      />
    </>
  )
}

export default function SubseaCanvas() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
      >
        <Scene />
      </Canvas>
    </div>
  )
}