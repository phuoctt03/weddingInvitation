"use client"

import type React from "react"

import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { Building, Car, Plane } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface Accommodation {
  name: string
  icon: string
  description: string
  address: string
  phone: string
  website: string
}

interface Transportation {
  type: string
  icon: string
  description: string
}

interface AccommodationSectionProps {
  accommodations: Accommodation[]
  transportation: Transportation[]
}

const AccommodationSection: React.FC<AccommodationSectionProps> = ({ accommodations, transportation }) => {
  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Building":
        return <Building style={{ width: "1.5rem", height: "1.5rem" }} />
      case "Car":
        return <Car style={{ width: "1.5rem", height: "1.5rem" }} />
      case "Plane":
        return <Plane style={{ width: "1.5rem", height: "1.5rem" }} />
      default:
        return <Building style={{ width: "1.5rem", height: "1.5rem" }} />
    }
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
          Accommodation & Travel
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
          For our out-of-town guests, we've arranged special rates at these nearby hotels.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Where to Stay
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {accommodations.map((accommodation, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid hsl(var(--wedding-secondary))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "9999px",
                    backgroundColor: "hsl(var(--wedding-primary-light))",
                    color: "hsl(var(--wedding-primary-dark))",
                    marginRight: "0.75rem",
                  }}
                >
                  {renderIcon(accommodation.icon)}
                </div>
                <h4
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#1f2937",
                  }}
                >
                  {accommodation.name}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  color: "#4b5563",
                  marginBottom: "1rem",
                }}
              >
                {accommodation.description}
              </p>
              <div
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                <p style={{ marginBottom: "0.25rem" }}>{accommodation.address}</p>
                <p style={{ marginBottom: "0.25rem" }}>{accommodation.phone}</p>
                <a
                  href={accommodation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "hsl(var(--wedding-primary-dark))",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Travel Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {transportation.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid hsl(var(--wedding-secondary))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "9999px",
                    backgroundColor: "hsl(var(--wedding-primary-light))",
                    color: "hsl(var(--wedding-primary-dark))",
                    marginRight: "0.75rem",
                  }}
                >
                  {renderIcon(item.icon)}
                </div>
                <h4
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#1f2937",
                  }}
                >
                  {item.type}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  color: "#4b5563",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AccommodationSection

