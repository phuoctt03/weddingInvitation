"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { Heart, Send, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface Wish {
  id: string
  name: string
  message: string
  timestamp: number
  color: string
}

const GuestWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adminMode, setAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const colors = [
    "#ffcdd2", // Light Red
    "#f8bbd0", // Light Pink
    "#e1bee7", // Light Purple
    "#d1c4e9", // Light Deep Purple
    "#c5cae9", // Light Indigo
    "#bbdefb", // Light Blue
    "#b3e5fc", // Light Light Blue
    "#b2ebf2", // Light Cyan
    "#b2dfdb", // Light Teal
    "#c8e6c9", // Light Green
    "#dcedc8", // Light Light Green
    "#f0f4c3", // Light Lime
    "#fff9c4", // Light Yellow
    "#ffecb3", // Light Amber
    "#ffe0b2", // Light Orange
    "#ffccbc", // Light Deep Orange
  ]

  // Load wishes from localStorage on component mount
  useEffect(() => {
    const savedWishes = localStorage.getItem("weddingWishes")
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes))
      } catch (error) {
        console.error("Error parsing saved wishes:", error)
      }
    }
  }, [])

  // Save wishes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weddingWishes", JSON.stringify(wishes))
  }, [wishes])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setWishes((prev) => [newWish, ...prev])
      setName("")
      setMessage("")
      setIsSubmitting(false)
    }, 500)
  }

  const handleDelete = (id: string) => {
    setWishes((prev) => prev.filter((wish) => wish.id !== id))
  }

  const handleAdminLogin = () => {
    // Simple password check - in a real app, use proper authentication
    if (adminPassword === "wedding2025") {
      setAdminMode(true)
      setShowAdminLogin(false)
      setAdminPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "#8b6e5c",
            marginBottom: "0.5rem",
          }}
        >
          Guest Wishes
        </h2>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "#4b5563",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          Leave your wishes and blessings for the happy couple
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0c9b1",
          marginBottom: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1rem",
                color: "#4b5563",
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
                border: "1px solid #e0c9b1",
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
                color: "#4b5563",
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
                border: "1px solid #e0c9b1",
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1rem",
                minHeight: "6rem",
                resize: "vertical",
              }}
              placeholder="Write your wishes for the couple..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#d4b396",
              color: "white",
              borderRadius: "0.375rem",
              border: "none",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              fontWeight: 500,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "#c4a386"
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "#d4b396"
            }}
          >
            <Send size={16} style={{ marginRight: "0.5rem" }} />
            {isSubmitting ? "Sending..." : "Send Wishes"}
          </button>
        </form>
      </div>

      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        {adminMode ? (
          <button
            onClick={() => setAdminMode(false)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f3f4f6",
              color: "#4b5563",
              borderRadius: "0.375rem",
              border: "none",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Exit Admin Mode
          </button>
        ) : (
          <button
            onClick={() => setShowAdminLogin(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f3f4f6",
              color: "#4b5563",
              borderRadius: "0.375rem",
              border: "none",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Admin
          </button>
        )}
      </div>

      {showAdminLogin && (
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
              padding: "2rem",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#1f2937",
              }}
            >
              Admin Login
            </h3>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #e0c9b1",
                marginBottom: "1rem",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={handleAdminLogin}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#d4b396",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#f3f4f6",
                  color: "#4b5563",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.25rem",
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {wishes.length > 0 ? `${wishes.length} Wishes` : "No wishes yet. Be the first!"}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  backgroundColor: wish.color,
                  padding: "1.25rem",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              >
                {adminMode && (
                  <button
                    onClick={() => handleDelete(wish.id)}
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#4b5563",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Heart size={16} style={{ color: "#d4b396", marginRight: "0.5rem" }} />
                  <h4
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    {wish.name}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1rem",
                    color: "#4b5563",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {wish.message}
                </p>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  {formatDate(wish.timestamp)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default GuestWishes

