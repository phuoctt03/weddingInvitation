"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { Download, Share2, Copy } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface QrCodeGeneratorProps {
  title: string
  subtitle: string
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ title, subtitle }) => {
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // Get the current URL
  const invitationUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleDownload = () => {
    if (!qrRef.current) return

    const canvas = qrRef.current.querySelector("canvas")
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = "wedding-invitation-qr.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Invitation",
          text: "You're invited to our wedding! Please join us on our special day.",
          url: invitationUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <section style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "#8b6e5c",
            marginBottom: "0.5rem",
          }}
        >
          {title}
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
          {subtitle}
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0c9b1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div
          ref={qrRef}
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <QRCodeCanvas
            value={invitationUrl}
            size={200}
            level="H"
            imageSettings={{
              src: "/qr-logo.png",
              excavate: true,
              height: 40,
              width: 40,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleDownload}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
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
            <Download size={16} />
            Download
          </button>

          <button
            onClick={handleShare}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              backgroundColor: "#f8e8d8",
              color: "#8b6e5c",
              borderRadius: "0.375rem",
              border: "1px solid #e0c9b1",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f0dfd0"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8e8d8"
            }}
          >
            <Share2 size={16} />
            Share
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <input
            type="text"
            value={invitationUrl}
            readOnly
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #e0c9b1",
              fontFamily: cormorant.style.fontFamily,
              fontSize: "0.875rem",
              color: "#4b5563",
            }}
          />
          <button
            onClick={handleCopyLink}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem",
              backgroundColor: copied ? "#d1fae5" : "#f3f4f6",
              color: copied ? "#059669" : "#4b5563",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <Copy size={16} />
          </button>
        </div>
        {copied && (
          <p
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "0.875rem",
              color: "#059669",
              margin: "-1rem 0 0 0",
            }}
          >
            Link copied to clipboard!
          </p>
        )}
      </div>
    </section>
  )
}

export default QrCodeGenerator

