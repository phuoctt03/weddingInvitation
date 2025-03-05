"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface FloatingElement {
  id: number
  x: number
  y: number
  rotation: number
  size: number
  speed: number
  delay: number
  image: string
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  // Images for floating elements
  const images = [
    "/icon/petals.png",
    "/icon/sakura.png",
    "/icon/petals.png",
    "/icon/maple-leaf.png",
    "/icon/maple-leaf.png",
  ]

  // Create floating elements
  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      const count = Math.floor(windowSize.width / 100) // Adjust density based on screen width
      
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: i,
          x: Math.random() * windowSize.width,
          y: -100 - Math.random() * windowSize.height, // Start above viewport
          rotation: Math.random() * 360,
          size: 20 + Math.random() * 30, // Random size between 20-50px
          speed: 1 + Math.random() * 2, // Random speed
          delay: Math.random() * 5, // Random delay for natural effect
          image: images[Math.floor(Math.random() * images.length)],
        })
      }
      
      setElements(newElements)
    }

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    generateElements()
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowSize.width, windowSize.height])

  // Animation frame for moving elements
  useEffect(() => {
    let animationFrameId: number
    let lastTime = 0
    
    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time
      
      setElements(prevElements => 
        prevElements.map(element => {
          // Only start moving after delay
          if (element.delay > 0) {
            return { ...element, delay: element.delay - deltaTime / 1000 }
          }
          
          // Move element down
          let newY = element.y + element.speed
          let newX = element.x + Math.sin(time / 2000 + element.id) * 0.5 // Gentle side-to-side movement
          
          // Reset if out of viewport
          if (newY > windowSize.height) {
            newY = -100
            newX = Math.random() * windowSize.width
          }
          
          return {
            ...element,
            y: newY,
            x: newX,
            rotation: element.rotation + 0.1 * element.speed, // Gentle rotation
          }
        })
      )
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [windowSize.height, windowSize.width])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Allow clicking through
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: "absolute",
            left: `${element.x}px`,
            top: `${element.y}px`,
            transform: `rotate(${element.rotation}deg)`,
            transition: "transform 0.5s ease",
            opacity: 0.8,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
        >
          <Image
            src={element.image || "/placeholder.svg"}
            alt="Floating element"
            width={element.size}
            height={element.size}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingElements
