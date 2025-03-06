"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { motion } from "framer-motion"
import { Calendar, Heart, MapPin, Gift, Camera, Home, BellRingIcon as Ring, Coffee, Upload, Trash2 } from "lucide-react"
import Image from "next/image"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface StoryEvent {
  id: string
  title: string
  date: string
  description: string
  icon: string
  image?: string
}

interface OurStorySectionProps {
  initialStoryEvents: StoryEvent[]
}

const OurStorySection = ({ initialStoryEvents }: OurStorySectionProps) => {
  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>(initialStoryEvents)
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<StoryEvent>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="w-5 h-5" />
      case "Calendar":
        return <Calendar className="w-5 h-5" />
      case "MapPin":
        return <MapPin className="w-5 h-5" />
      case "Gift":
        return <Gift className="w-5 h-5" />
      case "Camera":
        return <Camera className="w-5 h-5" />
      case "Home":
        return <Home className="w-5 h-5" />
      case "Ring":
        return <Ring className="w-5 h-5" />
      case "Coffee":
        return <Coffee className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const handleEditEvent = (id: string) => {
    setEditingEvent(id)
    const event = storyEvents.find((e) => e.id === id)
    if (event) {
      setNewEvent(event)
    }
  }

  const handleSaveEvent = () => {
    if (editingEvent === "new") {
      if (newEvent.title && newEvent.date && newEvent.description) {
        // Add new event
        setStoryEvents((prev) => [
          ...prev,
          {
            ...newEvent,
            id: Date.now().toString(),
            icon: newEvent.icon || "Calendar",
          } as StoryEvent,
        ])
      }
    } else if (editingEvent) {
      // Update existing event
      setStoryEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent ? ({ ...event, ...newEvent, id: event.id } as StoryEvent) : event,
        ),
      )
    }

    // Clear editing state
    setEditingEvent(null)
    setNewEvent({})
  }

  const handleDeleteEvent = (id: string) => {
    setStoryEvents((prev) => prev.filter((event) => event.id !== id))
  }

  const handleAddEvent = () => {
    setEditingEvent("new")
    setNewEvent({ icon: "Calendar" }) // Set default icon
  }

  const handleImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageResult = event.target?.result as string
        if (id === "new") {
          setNewEvent((prev) => ({ ...prev, image: imageResult }))
        } else {
          // Immediately update the storyEvents array with the new image
          setStoryEvents((prev) => prev.map((event) => (event.id === id ? { ...event, image: imageResult } : event)))
          // Also update the newEvent state to keep it in sync
          setNewEvent((prev) => ({ ...prev, image: imageResult }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const iconOptions = [
    { label: "Heart", icon: <Heart className="w-5 h-5" />, value: "Heart" },
    { label: "Calendar", icon: <Calendar className="w-5 h-5" />, value: "Calendar" },
    { label: "Location", icon: <MapPin className="w-5 h-5" />, value: "MapPin" },
    { label: "Gift", icon: <Gift className="w-5 h-5" />, value: "Gift" },
    { label: "Camera", icon: <Camera className="w-5 h-5" />, value: "Camera" },
    { label: "Home", icon: <Home className="w-5 h-5" />, value: "Home" },
    { label: "Ring", icon: <Ring className="w-5 h-5" />, value: "Ring" },
    { label: "Coffee", icon: <Coffee className="w-5 h-5" />, value: "Coffee" },
  ]

  return (
    <section style={{ width: "100%", maxWidth: "48rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "hsl(var(--wedding-primary-dark))",
            marginBottom: "0.5rem",
          }}
        >
          Our Story
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
          The journey that led us to forever
        </p>
      </div>

      <div className="timeline-container" style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "2px",
            height: "100%",
            backgroundColor: "hsl(var(--wedding-secondary))",
            zIndex: 0,
          }}
        ></div>

        {storyEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              display: "flex",
              justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
              marginBottom: "4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "calc(50% - 2rem)",
                background: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid hsl(var(--wedding-secondary))",
                position: "relative",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  [index % 2 === 0 ? "right" : "left"]: "-2.5rem",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--wedding-primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "hsl(var(--wedding-primary-dark))",
                  border: "2px solid hsl(var(--wedding-secondary))",
                }}
              >
                {renderIcon(event.icon)}
              </div>

              {/* Edit button */}
              <button
                onClick={() => handleEditEvent(event.id)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "none",
                  border: "none",
                  fontSize: "0.75rem",
                  color: "hsl(var(--wedding-primary))",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              {/* Delete button */}
              <button
                onClick={() => handleDeleteEvent(event.id)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "2.5rem",
                  background: "none",
                  border: "none",
                  fontSize: "0.75rem",
                  color: "#ef4444",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

              <h3
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "hsl(var(--wedding-text-dark))",
                  marginBottom: "0.5rem",
                }}
              >
                {event.title}
              </h3>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "hsl(var(--wedding-primary))",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}
              >
                {event.date}
              </p>

              {event.image && (
                <div
                  style={{
                    marginBottom: "1rem",
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                    border: "1px solid hsl(var(--wedding-secondary))",
                    width: "150px",
                    height: "100px",
                  }}
                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={150}
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                }}
              >
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add new event button */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleAddEvent}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "hsl(var(--wedding-primary))",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
          }}
        >
          Add New Milestone
        </button>
      </div>

      {/* Edit modal */}
      {editingEvent && (
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
              maxWidth: "500px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h3
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "hsl(var(--wedding-text-dark))",
              }}
            >
              {editingEvent === "new" ? "Add New Milestone" : "Edit Milestone"}
            </h3>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Title
              </label>
              <input
                type="text"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid hsl(var(--wedding-secondary))",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Date
              </label>
              <input
                type="text"
                value={newEvent.date || ""}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid hsl(var(--wedding-secondary))",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                }}
                placeholder="e.g., June 15, 2020"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Description
              </label>
              <textarea
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid hsl(var(--wedding-secondary))",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  minHeight: "6rem",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Icon
              </label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {iconOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNewEvent({ ...newEvent, icon: option.value })}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor:
                        newEvent.icon === option.value
                          ? "hsl(var(--wedding-primary))"
                          : "hsl(var(--wedding-primary-light))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: newEvent.icon === option.value ? "white" : "hsl(var(--wedding-primary-dark))",
                      border: `2px solid ${newEvent.icon === option.value ? "hsl(var(--wedding-primary-dark))" : "hsl(var(--wedding-secondary))"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    title={option.label}
                  >
                    {renderIcon(option.value)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "hsl(var(--wedding-text))",
                  marginBottom: "0.5rem",
                }}
              >
                Image
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
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
                  <Upload size={16} />
                  Upload Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(editingEvent, e)}
                  style={{ display: "none" }}
                />

                {newEvent.image && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      borderRadius: "0.375rem",
                      overflow: "hidden",
                      border: "1px solid hsl(var(--wedding-secondary))",
                      padding: "0.5rem",
                      width: "200px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
                      <button
                        onClick={() => setNewEvent({ ...newEvent, image: undefined })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.25rem",
                          backgroundColor: "hsl(var(--wedding-error-light))",
                          color: "hsl(var(--wedding-error))",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div
                      style={{
                        width: "180px",
                        height: "120px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={newEvent.image || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleSaveEvent}
                style={{
                  flex: 1,
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
                Save
              </button>
              <button
                onClick={() => {
                  setEditingEvent(null)
                  setNewEvent({})
                }}
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

export default OurStorySection

