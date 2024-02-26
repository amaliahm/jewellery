import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, MeshRefractionMaterial, AccumulativeShadows, RandomizedLight, Html, Environment, Center, PresentationControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { RGBELoader } from 'three-stdlib'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from './loader'


function Ring({ map, onRotate, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/ring-transformed.glb')
  useFrame(() => {
    onRotate(); 
  });
  return (
    <group ref={group} {...props}  dispose={null}>
      <mesh geometry={nodes.diamonds.geometry}>
        <MeshRefractionMaterial envMap={map} aberrationStrength={0.02} toneMapped={false} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.ring.geometry} material={materials.ring} material-color='white' material-envMapIntensity={1.5}/>
    </group>
  )
}

export default function Lock() {

  const [rotation, setRotation] = useState(0);
  const handleRotate = () => {
    setRotation(rotation + 0.005)
  };
  const navigate = useNavigate()
 
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr')
  texture.mapping = THREE.EquirectangularReflectionMapping
  return (
    <>
    {/* <i style={{
      position: 'absolute',
      zIndex: '20',
      top: '10px',
      left: '10px'
    }} 
    className='fa-solid fa-arrow-left fa-2x'
    onClick={() => {
      navigate('/home')
    }}
    ></i> */}
    <Canvas style={{ width: '100vw', height: '100vh', marginTop: '80px', position: 'fixed' }} shadows camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 1000, aspect: window.innerWidth / window.innerHeight }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />

      <Environment map={texture} />
      <PresentationControls
        global
        config={{ mass: 1, tension: 250, friction: 25 }}
        snap={{ mass: 2, tension: 250, friction: 50 }}
        zoom={2.25}
        rotation={[0.5, rotation, 0]}
        polar={[-Math.PI / 5, Math.PI / 4]}
        azimuth={[-Math.PI / 1.75, Math.PI / 4]}>
        <group position={[0, -3, 0]}>
          <Center top>
            <Ring map={texture} rotation={[-Math.PI / 2, 0, Math.PI]} scale={3} onRotate={handleRotate}  />
          </Center>
          <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={20}>
            <RandomizedLight amount={8} radius={10} ambient={0.5} position={[0, 10, -2.5]} bias={0.001} size={3} />
          </AccumulativeShadows>
        </group>
      </PresentationControls>
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
      </EffectComposer>
    </Canvas>
    </>
  )
}