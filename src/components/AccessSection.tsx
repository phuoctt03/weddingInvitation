import type React from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import EditableText from "./EditableText"
import { MapPin } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface AccessSectionProps {
  access: string
  setAccess: (text: string) => void
  googleMap: string
  locationAddress: string
}

const AccessSection: React.FC<AccessSectionProps> = ({ access, setAccess, googleMap, locationAddress }) => {
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
          <EditableText initialText={access} onSave={setAccess} />
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
          Find your way to our special day
        </p>
      </div>

      <div
        style={{
          background: "hsl(var(--wedding-background))",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            src={googleMap}
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "0.5rem" }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>

        <div
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <MapPin
            style={{
              width: "1.25rem",
              height: "1.25rem",
              color: "hsl(var(--wedding-primary-dark))",
              marginRight: "0.5rem",
            }}
          />
          <p
            style={{
              fontFamily: cormorant.style.fontFamily,
              color: "hsl(var(--wedding-text))",
            }}
          >
            {locationAddress}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AccessSection

