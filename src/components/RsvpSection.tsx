"use client"

import type React from "react"
import { useState } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import EditableText from "./EditableText"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

interface RsvpSectionProps {
  deadline: string
}

const RsvpSection: React.FC<RsvpSectionProps> = ({ deadline }) => {
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

  const formStyles = {
    container: {
      width: "100%",
      maxWidth: "32rem",
      margin: "0 auto",
      padding: "2rem 1rem",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "2.5rem",
    },
    title: {
      fontFamily: dancingScript.style.fontFamily,
      fontSize: "2.5rem",
      color: "hsl(var(--wedding-primary-dark))",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontFamily: cormorant.style.fontFamily,
      fontSize: "1.125rem",
      color: "hsl(var(--wedding-text))",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
      background: "white",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid hsl(var(--wedding-secondary))",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
    },
    label: {
      fontFamily: cormorant.style.fontFamily,
      fontSize: "1rem",
      color: "hsl(var(--wedding-text))",
    },
    input: {
      padding: "0.75rem",
      border: "1px solid hsl(var(--wedding-secondary))",
      borderRadius: "0.25rem",
      fontSize: "1rem",
      fontFamily: cormorant.style.fontFamily,
      color: "hsl(var(--wedding-text-dark))",
      outline: "none",
      transition: "border-color 0.2s",
    },
    textarea: {
      padding: "0.75rem",
      border: "1px solid hsl(var(--wedding-secondary))",
      borderRadius: "0.25rem",
      fontSize: "1rem",
      fontFamily: cormorant.style.fontFamily,
      color: "hsl(var(--wedding-text-dark))",
      minHeight: "6rem",
      resize: "vertical" as const,
      outline: "none",
    },
    select: {
      padding: "0.75rem",
      border: "1px solid hsl(var(--wedding-secondary))",
      borderRadius: "0.25rem",
      fontSize: "1rem",
      fontFamily: cormorant.style.fontFamily,
      color: "hsl(var(--wedding-text-dark))",
      background: "white",
      cursor: "pointer",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "0.5rem",
    },
    button: {
      flex: 1,
      padding: "0.75rem",
      border: "1px solid hsl(var(--wedding-secondary))",
      borderRadius: "0.25rem",
      fontSize: "1rem",
      fontFamily: cormorant.style.fontFamily,
      cursor: "pointer",
      transition: "all 0.2s",
    },
    activeButton: {
      backgroundColor: "hsl(var(--wedding-primary))",
      color: "white",
      border: "1px solid hsl(var(--wedding-primary))",
    },
    inactiveButton: {
      backgroundColor: "white",
      color: "hsl(var(--wedding-text))",
    },
    submitButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "hsl(var(--wedding-primary))",
      color: "white",
      border: "none",
      borderRadius: "0.25rem",
      fontSize: "1rem",
      fontFamily: cormorant.style.fontFamily,
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "1rem",
    },
    successMessage: {
      textAlign: "center" as const,
      padding: "2rem",
      background: "hsl(var(--wedding-primary-light))",
      borderRadius: "0.5rem",
    },
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={formStyles.container}>
        <div style={formStyles.successMessage}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "9999px",
              backgroundColor: "hsl(var(--wedding-success-light))",
              marginBottom: "1rem",
            }}
          >
            <Check style={{ width: "2rem", height: "2rem", color: "hsl(var(--wedding-success))" }} />
          </div>
          <h3
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "hsl(var(--wedding-text-dark))",
              marginBottom: "0.5rem",
            }}
          >
            Thank You!
          </h3>
          <p style={{ fontFamily: cormorant.style.fontFamily, color: "hsl(var(--wedding-text))" }}>
            Your RSVP has been submitted successfully.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section style={formStyles.container}>
      <div style={formStyles.header}>
        <h2 style={formStyles.title}>RSVP</h2>
        <p style={formStyles.subtitle}><EditableText initialText={`Please respond by ${deadline}`} /></p>
      </div>

      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.formGroup}>
          <label htmlFor="name" style={formStyles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.formGroup}>
          <label htmlFor="email" style={formStyles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.formGroup}>
          <label style={formStyles.label}>Will you be attending?</label>
          <div style={formStyles.buttonGroup}>
            <button
              type="button"
              onClick={() => setAttending(true)}
              style={{
                ...formStyles.button,
                ...(attending === true ? formStyles.activeButton : formStyles.inactiveButton),
              }}
            >
              Joyfully Accept
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              style={{
                ...formStyles.button,
                ...(attending === false ? formStyles.activeButton : formStyles.inactiveButton),
              }}
            >
              Regretfully Decline
            </button>
          </div>
        </div>

        {attending === true && (
          <>
            <div style={formStyles.formGroup}>
              <label htmlFor="guests" style={formStyles.label}>
                Number of Guests (including yourself)
              </label>
              <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} style={formStyles.select}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div style={formStyles.formGroup}>
              <label htmlFor="dietary" style={formStyles.label}>
                Dietary Restrictions (if any)
              </label>
              <textarea
                id="dietary"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                style={formStyles.textarea}
              />
            </div>
          </>
        )}

        <div style={formStyles.formGroup}>
          <label htmlFor="message" style={formStyles.label}>
            Message to the Couple (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={formStyles.textarea}
          />
        </div>

        <button
          type="submit"
          style={formStyles.submitButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
          }}
        >
          Submit RSVP
        </button>
      </form>
    </section>
  )
}

export default RsvpSection

