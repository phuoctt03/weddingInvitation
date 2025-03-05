"use client"

import { useState } from "react"
import { Cormorant_Garamond, Dancing_Script } from 'next/font/google'
import { motion } from "framer-motion"
import { Calendar, Heart, MapPin, Gift, Camera, Home, BellRingIcon as Ring } from 'lucide-react'
import Image from "next/image"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface StoryEvent {
  target?: any
  id: string
  title: string
  date: string
  description: string
  icon: React.ReactNode
  image?: string
}

const OurStorySection = () => {
  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>([
    {
      id: "1",
      title: "First Met",
      date: "June 15, 2020",
      description: "We met at a mutual friend's birthday party. I noticed her smile from across the room.",
      icon: <Heart className="w-5 h-5" />,
      image: "/icon/sakura.png",
    },
    {
      id: "2",
      title: "First Date",
      date: "July 3, 2020",
      description: "We went to a small café downtown. The conversation flowed so naturally we lost track of time.",
      icon: <Coffee className="w-5 h-5" />,
      image: "/icon/sakura.png",
    },
    {
      id: "3",
      title: "First Trip Together",
      date: "December 24, 2020",
      description: "We spent Christmas in the mountains. The snow made everything magical.",
      icon: <MapPin className="w-5 h-5" />,
      image: "/icon/sakura.png",
    },
    {
      id: "4",
      title: "Moving In Together",
      date: "August 10, 2022",
      description: "We found our first apartment together. It felt like home from day one.",
      icon: <Home className="w-5 h-5" />,
      image: "/icon/sakura.png",
    },
    {
      id: "5",
      title: "The Proposal",
      date: "December 31, 2023",
      description: "Under the New Year's Eve fireworks, I asked her to marry me. She said yes!",
      icon: <Ring className="w-5 h-5" />,
      image: "/icon/sakura.png",
    },
  ])

  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<StoryEvent>>({})

  const handleEditEvent = (id: string) => {
    setEditingEvent(id)
    const event = storyEvents.find(e => e.id === id)
    if (event) {
      setNewEvent(event)
    }
  }

  const handleSaveEvent = () => {
    if (editingEvent) {
      setStoryEvents(prev => 
        prev.map(event => 
          event.id === editingEvent 
            ? { ...event, ...newEvent, id: event.id } as StoryEvent
            : event
        )
      )
    } else if (newEvent.title && newEvent.date && newEvent.description) {
      // Add new event
      setStoryEvents(prev => [
        ...prev, 
        { 
          ...newEvent, 
          id: Date.now().toString(),
          icon: newEvent.icon || <Calendar className="w-5 h-5" />
        } as StoryEvent
      ])
    }
    setEditingEvent(null)
    setNewEvent({})
  }

  const handleDeleteEvent = (id: string) => {
    setStoryEvents(prev => prev.filter(event => event.id !== id))
  }

  const handleAddEvent = () => {
    setEditingEvent('new')
    setNewEvent({})
  }

  const handleImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (id === 'new') {
          setNewEvent(prev => ({ ...prev, image: event.target?.result as string }))
        } else {
          setStoryEvents(prev => 
            prev.map(event => 
              event.id === id 
                ? { ...event, image: event.target?.result as string }
                : event
            )
          )
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const iconOptions = [
    { label: "Heart", icon: <Heart className="w-5 h-5" /> },
    { label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { label: "Location", icon: <MapPin className="w-5 h-5" /> },
    { label: "Gift", icon: <Gift className="w-5 h-5" /> },
    { label: "Camera", icon: <Camera className="w-5 h-5" /> },
    { label: "Home", icon: <Home className="w-5 h-5" /> },
    { label: "Ring", icon: <Ring className="w-5 h-5" /> },
  ]

  return (
    <section style={{ width: "100%", maxWidth: "48rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "#8b6e5c",
            marginBottom: "0.5rem",
          }}
        >
          Our Story
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
            backgroundColor: "#e0c9b1",
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
                border: "1px solid #e0c9b1",
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
                  backgroundColor: "#f8e8d8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8b6e5c",
                  border: "2px solid #e0c9b1",
                }}
              >
                {event.icon}
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
                  color: "#8b6e5c",
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
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                }}
              >
                {event.title}
              </h3>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "#8b6e5c",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}
              >
                {event.date}
              </p>

              {event.image && (
                <div style={{ marginBottom: "1rem", borderRadius: "0.375rem", overflow: "hidden" }}>
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
              )}

              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "#4b5563",
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
            backgroundColor: "#d4b396",
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
            e.currentTarget.style.backgroundColor = "#c4a386"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#d4b396"
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
                color: "#1f2937",
              }}
            >
              {editingEvent === 'new' ? 'Add New Milestone' : 'Edit Milestone'}
            </h3>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Title
              </label>
              <input
                type="text"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e0c9b1",
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
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Date
              </label>
              <input
                type="text"
                value={newEvent.date || ''}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e0c9b1",
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
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Description
              </label>
              <textarea
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                style={{
                  width: "94%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e0c9b1",
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
                  color: "#4b5563",
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
                    onClick={() => setNewEvent({ ...newEvent, icon: option.icon })}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#f8e8d8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8b6e5c",
                      border: "2px solid #e0c9b1",
                      cursor: "pointer",
                    }}
                    title={option.label}
                  >
                    {option.icon}
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
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(editingEvent, e)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0",
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                }}
              />
              {newEvent.image && (
                <div style={{ marginTop: "0.5rem", borderRadius: "0.375rem", overflow: "hidden" }}>
                  <Image
                    src={newEvent.image || "/placeholder.svg"}
                    alt="Preview"
                    width={300}
                    height={200}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleSaveEvent}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#d4b396",
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
                  backgroundColor: "#f3f4f6",
                  color: "#4b5563",
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

// Missing Coffee icon component
function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}
