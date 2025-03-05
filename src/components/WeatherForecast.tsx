"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudLightning, CloudFog, Loader2 } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface WeatherData {
  temperature: number
  condition: string
  icon: React.ReactNode
  humidity: number
  windSpeed: number
  date: string
}

interface WeatherForecastProps {
  weddingDate: string // Format: "YYYY.MM.DD"
  location: string // e.g., "Tokyo, Japan"
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ weddingDate, location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [daysUntil, setDaysUntil] = useState<number>(0)

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Parse wedding date
        const [year, month, day] = weddingDate.split(".").map(Number)
        const weddingDateObj = new Date(year, month - 1, day)

        // Calculate days until wedding
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const timeDiff = weddingDateObj.getTime() - today.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
        setDaysUntil(daysDiff)

        // If wedding is more than 10 days away, we can't get accurate weather forecast
        if (daysDiff > 10) {
          setWeatherData({
            temperature: 22,
            condition: "Forecast not available yet",
            icon: <Cloud size={32} />,
            humidity: 60,
            windSpeed: 10,
            date: weddingDateObj.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })
          setLoading(false)
          return
        }

        // In a real app, you would fetch from a weather API
        // For this demo, we'll generate random weather data
        const conditions = [
          { name: "Sunny", icon: <Sun size={32} color="#FFB900" /> },
          { name: "Cloudy", icon: <Cloud size={32} color="#B8B8B8" /> },
          { name: "Rainy", icon: <CloudRain size={32} color="#0078D7" /> },
          { name: "Windy", icon: <Wind size={32} color="#B8B8B8" /> },
          { name: "Snowy", icon: <CloudSnow size={32} color="#B8B8B8" /> },
          { name: "Stormy", icon: <CloudLightning size={32} color="#5C2D91" /> },
          { name: "Foggy", icon: <CloudFog size={32} color="#B8B8B8" /> },
        ]

        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

        setWeatherData({
          temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
          condition: randomCondition.name,
          icon: randomCondition.icon,
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          date: weddingDateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError("Failed to load weather forecast. Please try again later.")
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [weddingDate])

  return (
    <section style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "#8b6e5c",
            marginBottom: "0.5rem",
          }}
        >
          Weather Forecast
        </h2>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "#4b5563",
          }}
        >
          Expected weather for our special day
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0c9b1",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Loader2 size={32} style={{ color: "#8b6e5c", animation: "spin 2s linear infinite" }} />
            <p
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1rem",
                color: "#4b5563",
                marginTop: "1rem",
              }}
            >
              Loading weather forecast...
            </p>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `,
              }}
            />
          </div>
        ) : error ? (
          <p
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              color: "#ef4444",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            {error}
          </p>
        ) : weatherData ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#1f2937",
                    marginBottom: "0.25rem",
                  }}
                >
                  {location}
                </h3>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1rem",
                    color: "#4b5563",
                  }}
                >
                  {weatherData.date}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "0.875rem",
                    color: "#8b6e5c",
                    fontWeight: 600,
                  }}
                >
                  {daysUntil <= 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days away`}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "0.375rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {weatherData.icon}
                <div>
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#1f2937",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {weatherData.temperature}°C
                  </p>
                  <p
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1rem",
                      color: "#4b5563",
                    }}
                  >
                    {weatherData.condition}
                  </p>
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    marginBottom: "0.25rem",
                  }}
                >
                  Humidity: {weatherData.humidity}%
                </p>
                <p
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "0.875rem",
                    color: "#4b5563",
                  }}
                >
                  Wind: {weatherData.windSpeed} km/h
                </p>
              </div>
            </div>

            {daysUntil > 10 ? (
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "0.5rem",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.25rem",
                }}
              >
                Detailed weather forecast will be available 10 days before the wedding.
              </p>
            ) : (
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "0.5rem",
                }}
              >
                Weather data is for planning purposes only and may change.
              </p>
            )}
          </>
        ) : null}
      </div>
    </section>
  )
}

export default WeatherForecast

