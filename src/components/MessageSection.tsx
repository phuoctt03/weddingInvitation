import type React from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import EditableText from "./EditableText"
import Image from "next/image"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface MessageSectionProps {
  message: string
  setMessage: (text: string) => void
  weddingHashtag: string
  setWeddingHashtag: (text: string) => void
}

const MessageSection: React.FC<MessageSectionProps> = ({ message, setMessage, weddingHashtag, setWeddingHashtag }) => {
  return (
    <section style={{ textAlign: "center", width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <Image src="/message.png" alt="message" width={320} height={200} style={{ margin: "0 auto 1rem auto" }} />
      <h2
        style={{
          fontFamily: dancingScript.style.fontFamily,
          fontSize: "2.25rem",
          color: "#8b6e5c",
          marginBottom: "1.5rem",
        }}
      >
        Our Message
      </h2>
      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0c9b1",
        }}
      >
        <div
          style={{
            fontFamily: cormorant.style.fontFamily,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <p style={{ fontSize: "1.125rem", color: "#4b5563", fontStyle: "italic" }}>
            <EditableText initialText={message} onSave={setMessage}/>
          </p>
          <div style={{ paddingTop: "1rem", borderTop: "1px solid #e0c9b1" }}>
            <p style={{ color: "#8b6e5c", fontWeight: 500 }}>Share your moments with us using</p>
            <p style={{ fontSize: "1.25rem", color: "#8b6e5c", fontWeight: 700 }}>
              <EditableText initialText={weddingHashtag} onSave={setWeddingHashtag} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection

