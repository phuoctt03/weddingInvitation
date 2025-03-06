"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Download, Trash2, Edit2, X } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface GuestbookEntry {
  id: string
  name: string
  message: string
  signature: string
  date: string
  color: string
}

interface VirtualGuestbookProps {
  adminPassword: string
  isAdmin: boolean
}

const VirtualGuestbook: React.FC<VirtualGuestbookProps> = ({ adminPassword, isAdmin }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [signatureColor, setSignatureColor] = useState("#000000")
  const [signatureLineWidth, setSignatureLineWidth] = useState(3)
  const [showClearButton, setShowClearButton] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const colors = [
    "#000000", // Black
    "#1e40af", // Dark Blue
    "#047857", // Dark Green
    "#7c2d12", // Dark Brown
    "#831843", // Dark Pink
    "#4c1d95", // Dark Purple
    "#b91c1c", // Dark Red
  ]

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("weddingGuestbook")
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries))
      } catch (error) {
        console.error("Error parsing saved entries:", error)
      }
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weddingGuestbook", JSON.stringify(entries))
  }, [entries])

  // Initialize canvas when signature modal is shown
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2

      const context = canvas.getContext("2d")
      if (context) {
        context.scale(2, 2) // Scale for high DPI displays
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = signatureColor
        context.lineWidth = signatureLineWidth
        contextRef.current = context

        // Clear canvas
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [showSignatureModal, signatureColor, signatureLineWidth])

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!contextRef.current) return

    setIsDrawing(true)
    setShowClearButton(true)

    const { offsetX, offsetY } = getCoordinates(nativeEvent)
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
  }

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!contextRef.current || !isDrawing) return

    const { offsetX, offsetY } = getCoordinates(nativeEvent)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const stopDrawing = () => {
    if (!contextRef.current) return

    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const getCoordinates = (event: any) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 }

    let offsetX, offsetY

    if (event.touches) {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect()
      offsetX = event.touches[0].clientX - rect.left
      offsetY = event.touches[0].clientY - rect.top
    } else {
      // Mouse event
      offsetX = event.offsetX
      offsetY = event.offsetY
    }

    return { offsetX, offsetY }
  }

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return

    contextRef.current.fillStyle = "white"
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setShowClearButton(false)
  }

  const saveSignature = () => {
    if (!canvasRef.current) return

    const signatureDataUrl = canvasRef.current.toDataURL("image/png")
    handleSubmit(signatureDataUrl)
    setShowSignatureModal(false)
  }

  const handleSubmit = (signatureDataUrl: string) => {
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        signature: signatureDataUrl,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setEntries((prev) => [newEntry, ...prev])
      setName("")
      setMessage("")
      setIsSubmitting(false)
    }, 500)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this guestbook entry? This action cannot be undone.")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id))
    }
  }

  const downloadGuestbook = () => {
    // Create a text version of the guestbook
    let guestbookText = "VIRTUAL GUESTBOOK\n\n"

    entries.forEach((entry, index) => {
      guestbookText += `${index + 1}. ${entry.name} (${entry.date})\n`
      guestbookText += `Message: ${entry.message}\n\n`
    })

    // Create and download the file
    const element = document.createElement("a")
    const file = new Blob([guestbookText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "wedding-guestbook.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <section style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "hsl(var(--wedding-primary-dark))",
            marginBottom: "0.5rem",
          }}
        >
          Virtual Guestbook
        </h2>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "hsl(var(--wedding-text))",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          Leave your message and signature for the happy couple
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
          marginBottom: "2rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              color: "hsl(var(--wedding-text))",
              marginBottom: "0.5rem",
            }}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "91%",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid hsl(var(--wedding-secondary))",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
            }}
            placeholder="Enter your name"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="message"
            style={{
              display: "block",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              color: "hsl(var(--wedding-text))",
              marginBottom: "0.5rem",
            }}
          >
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              width: "91%",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid hsl(var(--wedding-secondary))",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              minHeight: "6rem",
              resize: "vertical",
            }}
            placeholder="Write your message for the couple..."
          />
        </div>

        <button
          onClick={() => setShowSignatureModal(true)}
          disabled={isSubmitting || !name.trim() || !message.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "0.75rem",
            backgroundColor: !name.trim() || !message.trim() ? "#e5e7eb" : "hsl(var(--wedding-primary))",
            color: !name.trim() || !message.trim() ? "#9ca3af" : "white",
            borderRadius: "0.375rem",
            border: "none",
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1rem",
            fontWeight: 500,
            cursor: !name.trim() || !message.trim() ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            if (!isSubmitting && name.trim() && message.trim())
              e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
          }}
          onMouseOut={(e) => {
            if (!isSubmitting && name.trim() && message.trim())
              e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
          }}
        >
          <Edit2 size={16} style={{ marginRight: "0.5rem" }} />
          {isSubmitting ? "Submitting..." : "Add Your Signature"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <button
          onClick={downloadGuestbook}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            backgroundColor: "hsl(var(--wedding-background-alt))",
            color: "hsl(var(--wedding-text))",
            borderRadius: "0.375rem",
            border: "none",
            fontFamily: cormorant.style.fontFamily,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          <Download size={14} style={{ marginRight: "0.5rem" }} />
          Download Guestbook
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.25rem",
            color: "hsl(var(--wedding-text-dark))",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {entries.length > 0 ? `${entries.length} Guestbook Entries` : "No entries yet. Be the first to sign!"}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid hsl(var(--wedding-secondary))",
                  position: "relative",
                }}
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "hsl(var(--wedding-error-light))",
                      border: "none",
                      borderRadius: "50%",
                      padding: "0.5rem",
                      cursor: "pointer",
                      color: "hsl(var(--wedding-error))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    title="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div
                  style={{
                    borderLeft: `3px solid ${entry.color}`,
                    paddingLeft: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "hsl(var(--wedding-text-dark))",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {entry.name}
                  </h4>
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "0.875rem",
                      color: "hsl(var(--wedding-text-light))",
                      margin: 0,
                    }}
                  >
                    {entry.date}
                  </p>
                </div>

                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1rem",
                    color: "hsl(var(--wedding-text))",
                    margin: "0 0 1rem 0",
                    fontStyle: "italic",
                  }}
                >
                  "{entry.message}"
                </p>

                <div
                  style={{
                    borderTop: "1px solid hsl(var(--wedding-secondary-light))",
                    paddingTop: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "0.875rem",
                      color: "hsl(var(--wedding-text-light))",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    Signature:
                  </p>
                  <div
                    style={{
                      backgroundColor: "hsl(var(--wedding-background-alt))",
                      borderRadius: "0.25rem",
                      padding: "0.5rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={entry.signature || "/placeholder.svg"}
                      alt={`${entry.name}'s signature`}
                      style={{
                        maxHeight: "80px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
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
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h3
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1.25rem",
                  color: "hsl(var(--wedding-text-dark))",
                  margin: 0,
                }}
              >
                Add Your Signature
              </h3>
              <button
                onClick={() => setShowSignatureModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--wedding-text-light))",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "0.875rem",
                color: "hsl(var(--wedding-text-light))",
                marginBottom: "1rem",
              }}
            >
              Sign below using your mouse or finger
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Signature Color
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSignatureColor(color)}
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border:
                        signatureColor === color ? "2px solid #d4b396" : "1px solid hsl(var(--wedding-secondary))",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Line Thickness
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={signatureLineWidth}
                onChange={(e) => setSignatureLineWidth(Number.parseInt(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div
              style={{
                border: "1px solid hsl(var(--wedding-secondary))",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "0.375rem",
                  cursor: "crosshair",
                  touchAction: "none", // Prevents scrolling while drawing on touch devices
                }}
              />

              {showClearButton && (
                <button
                  onClick={clearCanvas}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "hsl(var(--wedding-text))",
                    borderRadius: "0.25rem",
                    border: "1px solid hsl(var(--wedding-secondary))",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={saveSignature}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.75rem",
                  backgroundColor: "hsl(var(--wedding-primary))",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "none",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                <Save size={16} style={{ marginRight: "0.5rem" }} />
                Save Signature
              </button>
              <button
                onClick={() => setShowSignatureModal(false)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "hsl(var(--wedding-background-alt))",
                  color: "hsl(var(--wedding-text))",
                  borderRadius: "0.375rem",
                  border: "none",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default VirtualGuestbook

