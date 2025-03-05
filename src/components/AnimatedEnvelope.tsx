"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import Image from "next/image"
import { Heart, ChevronDown } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface AnimatedEnvelopeProps {
  groomName: string
  brideName: string
  weddingDate: string
  onComplete: () => void
}

export default function AnimatedEnvelope({ groomName, brideName, weddingDate, onComplete }: AnimatedEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Check if the envelope has been opened before
  useEffect(() => {
    const hasOpenedBefore = localStorage.getItem("envelopeOpened")
    if (hasOpenedBefore === "true") {
      // Skip animation if already opened before
      setShowEnvelope(false)
      onComplete()
    }
  }, [onComplete])

  const handleOpenEnvelope = () => {
    if (hasInteracted) return

    setHasInteracted(true)
    setIsOpening(true)

    // Play opening sound
    const audio = new Audio("/music/wedding-music.mp3")
    audio.volume = 0.5
    audio.play().catch((err) => console.log("Audio play failed:", err))

    setTimeout(() => {
      setIsOpened(true)
      setTimeout(() => {
        setShowContent(true)

        // After showing content, wait a bit and then hide envelope
        setTimeout(() => {
          setShowEnvelope(false)
          localStorage.setItem("envelopeOpened", "true")
          onComplete()
        }, 4000)
      }, 1000)
    }, 1500)
  }

  const handleSkip = () => {
    setShowEnvelope(false)
    localStorage.setItem("envelopeOpened", "true")
    onComplete()
  }

  if (!showEnvelope) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fffaf5",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "500px",
          aspectRatio: "1.5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Envelope Base */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#f8e8d8",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: hasInteracted ? "default" : "pointer",
            border: "1px solid #e0c9b1",
          }}
          onClick={handleOpenEnvelope}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "40px",
              height: "40px",
              opacity: 0.2,
            }}
          >
            <Image src="/icon/petals.png" alt="Decoration" width={40} height={40} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              width: "40px",
              height: "40px",
              opacity: 0.2,
            }}
          >
            <Image src="/icon/sakura.png" alt="Decoration" width={40} height={40} />
          </div>

          {/* Wax seal */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isOpening ? 0.8 : 1 }}
            style={{
              position: "absolute",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#d4b396",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 5,
            }}
          >
            <Heart size={24} color="#fff" fill="#fff" />
          </motion.div>

          {/* Envelope Front Text */}
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "20%",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: dancingScript.style.fontFamily,
                  fontSize: "1.5rem",
                  color: "#8b6e5c",
                  margin: 0,
                }}
              >
                Wedding Invitation
              </p>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.9rem",
                  color: "#8b6e5c",
                  marginTop: "0.5rem",
                }}
              >
                Tap to open
              </p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                style={{ marginTop: "0.5rem" }}
              >
                <ChevronDown size={20} color="#8b6e5c" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Envelope Flap */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpening ? -180 : 0 }}
              exit={{ rotateX: -180 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "50%",
                backgroundColor: "#f0dfd0",
                borderRadius: "8px 8px 0 0",
                transformOrigin: "top",
                zIndex: 10,
                boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.05)",
                border: "1px solid #e0c9b1",
                borderBottom: "none",
              }}
            >
              {/* Flap design */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to bottom, transparent 60%, #e0c9b1)",
                    opacity: 0.3,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invitation Card */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: showContent ? -120 : 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 5,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e0c9b1",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: dancingScript.style.fontFamily,
                    fontSize: "2rem",
                    color: "#8b6e5c",
                    margin: "0 0 1rem 0",
                  }}
                >
                  Wedding Invitation
                </h2>

                <div
                  style={{
                    margin: "1.5rem 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.5rem",
                      color: "#1f2937",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {groomName} & {brideName}
                  </p>
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.2rem",
                      color: "#4b5563",
                    }}
                  >
                    {weddingDate}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1.5rem",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSkip}
                    style={{
                      padding: "0.75rem 2rem",
                      backgroundColor: "#d4b396",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    View Invitation
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Skip button */}
      {!isOpened && (
        <button
          onClick={handleSkip}
          style={{
            position: "absolute",
            bottom: "2rem",
            padding: "0.5rem 1.5rem",
            backgroundColor: "transparent",
            color: "#8b6e5c",
            border: "1px solid #d4b396",
            borderRadius: "4px",
            fontFamily: cormorant.style.fontFamily,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Skip Animation
        </button>
      )}
    </div>
  )
}

