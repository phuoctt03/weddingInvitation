"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Pause, Play, Music, Upload, X, Volume2, Volume1, VolumeX } from "lucide-react"

// Update the component to accept defaultMusic as a prop
interface MusicPlayerProps {
  defaultMusic: string
}

const MusicPlayer = ({ defaultMusic }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showMusicModal, setShowMusicModal] = useState(false)
  const [customMusic, setCustomMusic] = useState<string | null>(null)
  const [currentMusic, setCurrentMusic] = useState(defaultMusic)
  const [musicName, setMusicName] = useState("Wedding Music")
  const [volume, setVolume] = useState(0.4)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load custom music from localStorage on component mount
  useEffect(() => {
    const savedMusic = localStorage.getItem("weddingCustomMusic")
    const savedMusicName = localStorage.getItem("weddingMusicName")

    if (savedMusic) {
      setCustomMusic(savedMusic)
      setCurrentMusic(savedMusic)
    } else {
      // If no saved music, use the defaultMusic
      setCurrentMusic(defaultMusic)
    }

    if (savedMusicName) {
      setMusicName(savedMusicName)
    }
  }, [defaultMusic])

  // Split the useEffect into two separate effects - one for creating the audio element and one for volume changes

  // Replace the existing useEffect that creates the audio element with these two separate effects:

  useEffect(() => {
    // Create audio element when the component mounts or when music source changes
    if (!audioRef.current) {
      audioRef.current = new Audio(currentMusic)
    } else if (audioRef.current.src !== currentMusic) {
      // If we're changing the music source
      const wasPlaying = !audioRef.current.paused
      const currentTime = audioRef.current.currentTime
      audioRef.current.pause()
      audioRef.current.src = currentMusic

      // If we're replacing the audio element, try to restore the playback position
      if (currentTime > 0) {
        audioRef.current.currentTime = currentTime
      }

      // If it was playing before changing the music, resume playing
      if (wasPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error)
          setIsPlaying(false)
        })
      }
    }

    // Set up properties
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = volume

      // Set up event listeners
      const handleCanPlayThrough = () => {
        setIsLoaded(true)

        // If it should be playing, play it
        if (isPlaying) {
          audioRef.current?.play().catch((error) => {
            console.error("Playback failed:", error)
            setIsPlaying(false)
          })
        }
      }

      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough)

      // Clean up
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough)
        }
      }
    }
  }, [currentMusic, isPlaying, volume])

  // Add a separate effect for volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // This needs user interaction to work due to browser autoplay policies
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an audio file
    if (!file.type.startsWith("audio/")) {
      alert("Please select an audio file (MP3, WAV, etc.)")
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const musicData = event.target.result as string
        setCustomMusic(musicData)
        setCurrentMusic(musicData)
        setMusicName(file.name.replace(/\.[^/.]+$/, "")) // Remove file extension

        // Save to localStorage
        localStorage.setItem("weddingCustomMusic", musicData)
        localStorage.setItem("weddingMusicName", file.name.replace(/\.[^/.]+$/, ""))

        // Reset player
        setIsPlaying(false)
        setIsLoaded(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Update the resetToDefaultMusic function to use the defaultMusic prop
  const resetToDefaultMusic = () => {
    setCurrentMusic(defaultMusic)
    setMusicName("Wedding Music")
    setCustomMusic(null)
    localStorage.removeItem("weddingCustomMusic")
    localStorage.removeItem("weddingMusicName")
    setIsPlaying(false)
    setIsLoaded(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />
    if (volume < 0.5) return <Volume1 size={16} />
    return <Volume2 size={16} />
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "hsla(var(--wedding-background), 0.8)",
          backdropFilter: "blur(4px)",
          padding: "0.5rem 1rem",
          borderRadius: "2rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setShowVolumeControl(true)}
        onMouseLeave={() => setShowVolumeControl(false)}
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
            backgroundColor: "hsl(var(--wedding-primary-light))",
            color: "hsl(var(--wedding-primary-dark))",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-light))"
          }}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
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
              color: "hsl(var(--wedding-primary-dark))",
              fontWeight: 600,
            }}
          >
            {musicName}
          </span>
          <span
            style={{
              fontSize: "0.625rem",
              color: "hsl(var(--wedding-text-light))",
            }}
          >
            {isPlaying ? "Now Playing" : "Click to Play"}
          </span>
        </div>

        {showVolumeControl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "0.5rem",
              gap: "0.5rem",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "hsl(var(--wedding-primary-dark))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setVolume(volume === 0 ? 0.4 : 0)}
              title={volume === 0 ? "Unmute" : "Mute"}
            >
              {getVolumeIcon()}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: "60px",
                accentColor: "hsl(var(--wedding-primary))",
              }}
            />
          </div>
        )}

        <button
          onClick={() => setShowMusicModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            backgroundColor: "hsl(var(--wedding-primary-light))",
            color: "hsl(var(--wedding-primary-dark))",
            border: "none",
            cursor: "pointer",
            marginLeft: "0.5rem",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-light))"
          }}
          title="Change music"
        >
          <Music size={14} />
        </button>
      </div>

      {/* Music Selection Modal */}
      {showMusicModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "hsl(var(--wedding-text-dark))" }}>
                Change Wedding Music
              </h3>
              <button
                onClick={() => setShowMusicModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "0.875rem", color: "hsl(var(--wedding-text-light))", marginBottom: "1.5rem" }}>
              Upload your own music to personalize your wedding invitation.
            </p>

            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "hsl(var(--wedding-text))",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Current music: <span style={{ color: "hsl(var(--wedding-primary-dark))" }}>{musicName}</span>
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "hsl(var(--wedding-primary-light))",
                  color: "hsl(var(--wedding-primary-dark))",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-light))"
                }}
              >
                <Upload size={16} style={{ marginRight: "0.5rem" }} />
                Upload Music File
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*"
                style={{ display: "none" }}
              />

              <p
                style={{
                  fontSize: "0.75rem",
                  color: "hsl(var(--wedding-text-light))",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Supported formats: MP3, WAV, OGG (Max 10MB)
              </p>

              {customMusic && (
                <button
                  onClick={resetToDefaultMusic}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  Reset to Default Music
                </button>
              )}
            </div>

            <button
              onClick={() => setShowMusicModal(false)}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "hsl(var(--wedding-primary))",
                color: "white",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default MusicPlayer

