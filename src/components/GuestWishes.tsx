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

interface GuestWishesProps {
  adminPassword: string
  isAdmin: boolean
}

const GuestWishes: React.FC<GuestWishesProps> = ({ adminPassword, isAdmin }) => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (window.confirm("Are you sure you want to delete this wish? This action cannot be undone.")) {
      setWishes((prev) => prev.filter((wish) => wish.id !== id))
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
            color: "hsl(var(--wedding-primary-dark))",
            marginBottom: "0.5rem",
          }}
        >
          Guest Wishes
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
          Leave your wishes and blessings for the happy couple
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
        <form onSubmit={handleSubmit}>
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
              backgroundColor: "hsl(var(--wedding-primary))",
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
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
            }}
          >
            <Send size={16} style={{ marginRight: "0.5rem" }} />
            {isSubmitting ? "Sending..." : "Send Wishes"}
          </button>
        </form>
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
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(wish.id)}
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "hsl(var(--wedding-error-light))",
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
                    title="Delete wish"
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
                  <Heart size={16} style={{ color: "hsl(var(--wedding-primary))", marginRight: "0.5rem" }} />
                  <h4
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "hsl(var(--wedding-text-dark))",
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
                    color: "hsl(var(--wedding-text))",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {wish.message}
                </p>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "0.75rem",
                    color: "hsl(var(--wedding-text-light))",
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

