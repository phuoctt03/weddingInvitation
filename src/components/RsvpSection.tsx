"use client"

import type React from "react"

import { useState } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

const RsvpSection = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guests, setGuests] = useState("0")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log({ name, email, attending, guests, dietaryRestrictions, message })
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setName("")
      setEmail("")
      setAttending(null)
      setGuests("0")
      setDietaryRestrictions("")
      setMessage("")
      setIsSubmitted(false)
    }, 3000)
  }

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    border: "1px solid #e0c9b1",
    borderRadius: "0.375rem",
    outline: "none",
    transition: "all 0.2s",
  }

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "1px solid #e0c9b1",
    backgroundColor: "white",
    color: "#4b5563",
    cursor: "pointer",
    transition: "all 0.2s",
    flex: 1,
  }

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#d4b396",
    color: "white",
    borderColor: "#d4b396",
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
          RSVP
        </h2>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "#4b5563",
          }}
        >
          Please respond by April 29, 2025
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#f8e8d8",
            borderRadius: "0.5rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "9999px",
              backgroundColor: "#d1fae5",
              marginBottom: "1rem",
            }}
          >
            <Check style={{ width: "2rem", height: "2rem", color: "#059669" }} />
          </div>
          <h3
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Thank You!
          </h3>
          <p
            style={{
              fontFamily: cormorant.style.fontFamily,
              color: "#4b5563",
            }}
          >
            Your RSVP has been submitted successfully.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0c9b1",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontFamily: cormorant.style.fontFamily,
                color: "#4b5563",
                marginBottom: "0.5rem",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: cormorant.style.fontFamily,
                color: "#4b5563",
                marginBottom: "0.5rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontFamily: cormorant.style.fontFamily,
                color: "#4b5563",
                marginBottom: "0.5rem",
              }}
            >
              Will you be attending?
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                onClick={() => setAttending(true)}
                style={attending === true ? activeButtonStyle : buttonStyle}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                style={attending === false ? activeButtonStyle : buttonStyle}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          {attending === true && (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="guests"
                  style={{
                    display: "block",
                    fontFamily: cormorant.style.fontFamily,
                    color: "#4b5563",
                    marginBottom: "0.5rem",
                  }}
                >
                  Number of Guests (including yourself)
                </label>
                <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} style={inputStyle}>
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="dietary"
                  style={{
                    display: "block",
                    fontFamily: cormorant.style.fontFamily,
                    color: "#4b5563",
                    marginBottom: "0.5rem",
                  }}
                >
                  Dietary Restrictions (if any)
                </label>
                <textarea
                  id="dietary"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  style={{
                    ...inputStyle,
                    height: "6rem",
                    resize: "none",
                  }}
                ></textarea>
              </div>
            </>
          )}

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="message"
              style={{
                display: "block",
                fontFamily: cormorant.style.fontFamily,
                color: "#4b5563",
                marginBottom: "0.5rem",
              }}
            >
              Message to the Couple (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                ...inputStyle,
                height: "6rem",
                resize: "none",
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#d4b396",
              color: "white",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c4a386")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d4b396")}
          >
            Submit RSVP
          </button>
        </form>
      )}
    </section>
  )
}

export default RsvpSection

