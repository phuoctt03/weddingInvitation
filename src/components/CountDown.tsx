"use client"

import type React from "react"
import { Acme } from "next/font/google"
import { useEffect, useState, useRef } from "react"
import { Camera, Check, Upload, X } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const acme = Acme({ subsets: ["latin"], weight: "400" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" })

interface CountdownSectionProps {
  targetDate: string // Format: "YYYY.MM.DD DAY" (e.g., "2025.5.29 THU")
  initialBackgroundImage?: string
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ targetDate, initialBackgroundImage = "/flower1.png" }) => {
  const [backgroundImage, setBackgroundImage] = useState(initialBackgroundImage)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [showImageEditor, setShowImageEditor] = useState(false)
  const [previewImage, setPreviewImage] = useState(backgroundImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const applyImageChange = () => {
    setBackgroundImage(previewImage)
    setShowImageEditor(false)
  }

  useEffect(() => {
    const parseDateString = (dateStr: string) => {
      const datePart = dateStr.split(" ")[0]
      const [year, month, day] = datePart.split(".").map((num) => Number.parseInt(num))
      return new Date(year, month - 1, day)
    }

    const target = parseDateString(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <button
        onClick={() => setShowImageEditor(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.25rem",
          backgroundColor: "hsl(var(--wedding-primary))",
          color: "white",
          borderRadius: "0.375rem",
          border: "none",
          fontFamily: cormorant.style.fontFamily,
          fontSize: "1rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background-color 0.3s",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
        }}
        title="Change background image"
      >
        <Camera size={16} />
        Change Background Image
      </button>

      {/* Image Editor Modal */}
      {showImageEditor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid #e0c9b1",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "1.5rem",
                  color: "#8b6e5c",
                }}
              >
                Change Countdown Background
              </h3>
              <button
                onClick={() => setShowImageEditor(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  marginBottom: "1.5rem",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  height: "250px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <p
                    style={{
                      fontFamily: acme.style.fontFamily,
                      fontSize: "1.5rem",
                      margin: 0,
                    }}
                  >
                    PREVIEW
                  </p>
                  <p
                    style={{
                      fontFamily: acme.style.fontFamily,
                      fontSize: "4rem",
                      margin: "0.5rem 0",
                      lineHeight: 1,
                    }}
                  >
                    {timeLeft.days}
                  </p>
                  <p
                    style={{
                      fontFamily: acme.style.fontFamily,
                      fontSize: "1.25rem",
                      margin: 0,
                    }}
                  >
                    DAYS
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
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
                  <Upload size={16} />
                  Upload Image
                </button>
                <input
                  type="file"
                  id="background-image"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => setShowImageEditor(false)}
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
                <button
                  onClick={applyImageChange}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
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
                  <Check size={16} />
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: "80px 16px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxHeight: "300px",
          minWidth: "600px",
          maxWidth: "600px",
        }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              fontWeight: "normal",
              fontFamily: acme.style.fontFamily,
            }}
          >
            COUNT DOWN
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "9rem",
                fontWeight: "bold",
                lineHeight: "1",
                fontFamily: acme.style.fontFamily,
              }}
            >
              {timeLeft.days}
            </span>
            <span
              style={{
                fontSize: "2.5rem",
                marginBottom: "2rem",
                fontFamily: acme.style.fontFamily,
              }}
            >
              DAYS
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { value: timeLeft.hours, label: "HOURS" },
              { value: timeLeft.minutes, label: "MINUTES" },
              { value: timeLeft.seconds, label: "SECONDS" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "3.75rem",
                    fontWeight: "bold",
                    lineHeight: "1",
                    fontFamily: acme.style.fontFamily,
                  }}
                >
                  {formatNumber(item.value)}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    fontFamily: acme.style.fontFamily,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CountdownSection

