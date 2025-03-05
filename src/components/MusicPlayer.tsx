"use client"

import { useState, useEffect, useRef } from "react"
import { Pause, Play } from 'lucide-react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/music/wedding-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    
    // Set up event listeners
    const handleCanPlayThrough = () => {
      setIsLoaded(true)
    }
    
    audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough)
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough)
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // This needs user interaction to work due to browser autoplay policies
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error)
      })
    }
    
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255, 250, 245, 0.8)",
        backdropFilter: "blur(4px)",
        padding: "0.5rem 1rem",
        borderRadius: "2rem",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0c9b1",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          backgroundColor: "#f8e8d8",
          color: "#8b6e5c",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#e0c9b1"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#f8e8d8"
        }}
      >
        {isPlaying ? (
          <Pause size={16} />
        ) : (
          <Play size={16} />
        )}
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#8b6e5c",
            fontWeight: 600,
          }}
        >
          Wedding Music
        </span>
        <span
          style={{
            fontSize: "0.625rem",
            color: "#a8a29e",
          }}
        >
          {isPlaying ? "Now Playing" : "Click to Play"}
        </span>
      </div>
    </div>
  )
}

export default MusicPlayer
