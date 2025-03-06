import type React from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import EditableText from "./EditableText"
import Image from "next/image"
import { Calendar } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface DateSectionProps {
  ceremony: string
  setCeremony: (text: string) => void
  ceremonyDate: string
  setCeremonyDate: (text: string) => void
  ceremonyLocation: string
  setCeremonyLocation: (text: string) => void
  ceremonyAddress: string
  setCeremonyAddress: (text: string) => void
  reception: string
  setReception: (text: string) => void
  receptionDate: string
  setReceptionDate: (text: string) => void
  receptionLocation: string
  setReceptionLocation: (text: string) => void
  receptionAddress: string
  setReceptionAddress: (text: string) => void
  dressCode: string
  setDressCode: (text: string) => void
}

const DateSection: React.FC<DateSectionProps> = ({
  ceremony,
  setCeremony,
  ceremonyDate,
  setCeremonyDate,
  ceremonyLocation,
  setCeremonyLocation,
  ceremonyAddress,
  setCeremonyAddress,
  reception,
  setReception,
  receptionDate,
  setReceptionDate,
  receptionLocation,
  setReceptionLocation,
  receptionAddress,
  setReceptionAddress,
  dressCode,
  setDressCode,
}) => {
  return (
    <section style={{ textAlign: "center", width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: dancingScript.style.fontFamily,
          fontSize: "2.25rem",
          color: "hsl(var(--wedding-primary-dark))",
          marginBottom: "1.5rem",
        }}
      >
        Wedding Details
      </h2>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
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
            <Calendar style={{ width: "1.25rem", height: "1.25rem" }} />
          </div>
          <h3
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#1f2937",
            }}
          >
            <EditableText initialText={ceremony} onSave={setCeremony} />
          </h3>
        </div>

        <div
          style={{
            fontFamily: cormorant.style.fontFamily,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "1.25rem", color: "#4b5563" }}>
            <EditableText initialText={ceremonyDate} onSave={setCeremonyDate} />
          </p>
          <p style={{ fontSize: "1.25rem", color: "#4b5563", fontWeight: 500 }}>
            <EditableText initialText={ceremonyLocation} onSave={setCeremonyLocation} />
          </p>
          <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
            <EditableText initialText={ceremonyAddress} onSave={setCeremonyAddress} />
          </p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
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
            <Calendar style={{ width: "1.25rem", height: "1.25rem" }} />
          </div>
          <h3
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#1f2937",
            }}
          >
            <EditableText initialText={reception} onSave={setReception} />
          </h3>
        </div>

        <div
          style={{
            fontFamily: cormorant.style.fontFamily,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "1.25rem", color: "#4b5563" }}>
            <EditableText initialText={receptionDate} onSave={setReceptionDate} />
          </p>
          <p style={{ fontSize: "1.25rem", color: "#4b5563", fontWeight: 500 }}>
            <EditableText initialText={receptionLocation} onSave={setReceptionLocation} />
          </p>
          <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
            <EditableText initialText={receptionAddress} onSave={setReceptionAddress} />
          </p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid hsl(var(--wedding-secondary))",
        }}
      >
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "#1f2937",
            marginBottom: "0.5rem",
          }}
        >
          Dress Code
        </h3>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "#4b5563",
          }}
        >
          <EditableText initialText={dressCode} onSave={setDressCode} />
        </p>
      </div>
    </section>
  )
}

export default DateSection

