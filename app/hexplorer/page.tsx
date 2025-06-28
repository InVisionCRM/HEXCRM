"use client"

import { useEffect, useState } from "react"

// TypeScript declarations for custom web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gdm-live-audio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Side-effect import registers the custom elements when the page mounts
const loadHexplorer = () => import("@/components/hexplorer/index")

export default function HExplorerPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Load the web component only on the client
    loadHexplorer()
      .then(() => {
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error('Failed to load Hexplorer components:', error)
      })
  }, [])

  // Move styles to CSS-in-JS to avoid inline style warnings
  const backgroundStyle = {
    background: `
      radial-gradient(circle at 20% 20%, #FF3D3D 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, #FE01FA 0%, transparent 50%),
      radial-gradient(circle at 40% 90%, #FF0F6F 0%, transparent 50%),
      radial-gradient(circle at 90% 10%, rgb(255, 217, 0) 0%, transparent 50%),
      linear-gradient(135deg, #0D0D0D 0%, #1A0A1A 30%, #0A0A1A 60%, #000000 100%)
    `
  }

  const overlayStyle = {
    background: `
      linear-gradient(45deg, 
        #FF3D3D 0%, 
        #FE01FA 25%, 
        #FF0F6F 50%, 
        #FFDB01 75%, 
        #FF3D3D 100%
      )`,
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 15s ease-in-out infinite',
    mixBlendMode: 'soft-light' as const
  }

  return (
    <div 
      className="h-screen w-screen overflow-x-hidden relative"
      style={backgroundStyle}
    >
      {/* Animated gradient overlay with reduced intensity */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={overlayStyle}
      />
      
      {/* Hexplorer live audio assistant */}
      {isLoaded ? (
        <gdm-live-audio></gdm-live-audio>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-xl font-bold bg-gradient-to-r from-[#FF3D3D] via-[#FE01FA] to-[#FFDB01] bg-clip-text text-transparent">
            🚀 Loading HEXplorer...
          </div>
        </div>
      )}
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
} 