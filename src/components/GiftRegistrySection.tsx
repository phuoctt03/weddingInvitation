"use client"

import type React from "react"

import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { Gift, CreditCard, Heart } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface Registry {
  name: string
  icon: string
  url: string
  description: string
}

interface GiftRegistrySectionProps {
  registries: Registry[]
}

const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({ registries }) => {
  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Gift":
        return <Gift style={{ width: "1.5rem", height: "1.5rem" }} />
      case "Heart":
        return <Heart style={{ width: "1.5rem", height: "1.5rem" }} />
      case "CreditCard":
        return <CreditCard style={{ width: "1.5rem", height: "1.5rem" }} />
      default:
        return <Gift style={{ width: "1.5rem", height: "1.5rem" }} />
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
          Gift Registry
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
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've
          registered at the following places:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {registries.map((registry, index) => (
          <a
            key={index}
            href={registry.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid hsl(var(--wedding-secondary))",
              textAlign: "center",
              textDecoration: "none",
              transition: "box-shadow 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)")}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)")}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                backgroundColor: "hsl(var(--wedding-primary-light))",
                color: "hsl(var(--wedding-primary-dark))",
                marginBottom: "1rem",
              }}
            >
              {renderIcon(registry.icon)}
            </div>
            <h3
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              {registry.name}
            </h3>
            <p
              style={{
                fontFamily: cormorant.style.fontFamily,
                color: "#4b5563",
                fontSize: "0.875rem",
              }}
            >
              {registry.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default GiftRegistrySection

