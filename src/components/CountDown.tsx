"use client"

import type React from "react"
import { Acme } from "next/font/google"
import { useEffect, useState } from "react"

const acme = Acme({ subsets: ["latin"], weight: "400" })

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBackgroundImage(imageUrl)
    }
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "8px 16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        <label
          htmlFor="background-image"
          style={{
            cursor: "pointer",
            padding: "8px 16px",
            backgroundColor: "#fff",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          Choose Background
        </label>
        <input
          type="file"
          id="background-image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

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
            className={acme.className}
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              fontWeight: "normal",
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
              className={acme.className}
              style={{
                fontSize: "9rem",
                fontWeight: "bold",
                lineHeight: "1",
              }}
            >
              {timeLeft.days}
            </span>
            <span
              className={acme.className}
              style={{
                fontSize: "2.5rem",
                marginBottom: "2rem",
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
                  className={acme.className}
                  style={{
                    fontSize: "3.75rem",
                    fontWeight: "bold",
                    lineHeight: "1",
                  }}
                >
                  {formatNumber(item.value)}
                </span>
                <span
                  className={acme.className}
                  style={{
                    fontSize: "1rem",
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

