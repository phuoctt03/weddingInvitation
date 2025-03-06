"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import { DollarSign, X, Camera } from "lucide-react"
import Image from "next/image"
import EditableText from "./EditableText"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

// Update the props interface to include setters for the QR code images
interface GiftRegistrySectionProps {
  groomTitle: string
  setGroomTitle: (text: string) => void
  groomBank: string
  setGroomBank: (text: string) => void
  groomAccountNumber: string
  setGroomAccountNumber: (text: string) => void
  groomAccountName: string
  setGroomAccountName: (text: string) => void
  groomBranch: string
  setGroomBranch: (text: string) => void
  brideTitle: string
  setBrideTitle: (text: string) => void
  brideBank: string
  setBrideBank: (text: string) => void
  brideAccountNumber: string
  setBrideAccountNumber: (text: string) => void
  brideAccountName: string
  setBrideAccountName: (text: string) => void
  brideBranch: string
  setBrideBranch: (text: string) => void
  qrBankGroom: string
  qrBankBride: string
}

// Update the component to include file input refs and image change handlers
const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({
  groomTitle,
  setGroomTitle,
  groomBank,
  setGroomBank,
  groomAccountNumber,
  setGroomAccountNumber,
  groomAccountName,
  setGroomAccountName,
  groomBranch,
  setGroomBranch,
  brideTitle,
  setBrideTitle,
  brideBank,
  setBrideBank,
  brideAccountNumber,
  setBrideAccountNumber,
  brideAccountName,
  setBrideAccountName,
  brideBranch,
  setBrideBranch,
  qrBankGroom,
  qrBankBride,
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const [groomQrCode, setGroomQrCode] = useState(qrBankGroom)
  const [brideQrCode, setBrideQrCode] = useState(qrBankBride)
  const groomQrInputRef = useRef<HTMLInputElement>(null)
  const brideQrInputRef = useRef<HTMLInputElement>(null)

  const handleGroomQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setGroomQrCode(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBrideQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setBrideQrCode(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
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
            color: "hsl(var(--wedding-text))",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          The most meaningful gift is the love and support you give us. If you wish to send a little more love, please click here!
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Money Gift Card */}
        <div
          onClick={() => setShowDialog(true)}
          style={{
            background: "white",
            borderRadius: "0.5rem",
            padding: "2rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid hsl(var(--wedding-secondary))",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "400px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            e.currentTarget.style.transform = "translateY(-5px)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "9999px",
              backgroundColor: "hsl(var(--wedding-primary-light))",
              color: "hsl(var(--wedding-primary-dark))",
              marginBottom: "1.5rem",
            }}
          >
            <DollarSign style={{ width: "2rem", height: "2rem" }} />
          </div>
          <h3
            style={{
              fontFamily: cormorant.style.fontFamily,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "hsl(var(--wedding-text-dark))",
              marginBottom: "0.75rem",
            }}
          >
            Wedding box
          </h3>
          <p
            style={{
              fontFamily: cormorant.style.fontFamily,
              color: "hsl(var(--wedding-text))",
              fontSize: "1rem",
            }}
          >
            Click to view our bank details for wedding gifts
          </p>
        </div>
      </div>

      {/* Gift Dialog */}
      {showDialog && (
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
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Dialog Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "hsl(var(--wedding-primary))", // Using theme color
                color: "white",
                borderRadius: "0.5rem 0.5rem 0 0",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <DollarSign size={20} /> Wedding box
              </h3>
              <button
                onClick={() => setShowDialog(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Dialog Content - Modified to display QR codes side by side */}
            <div
              style={{
                padding: "1.5rem",
              }}
            >
              {/* QR Codes Row - Using flex with 1:1 ratio */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Groom's QR Code */}
                <div
                  style={{
                    flex: "1",
                    border: "1px solid hsl(var(--wedding-secondary))",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: "hsl(var(--wedding-background))",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "hsl(var(--wedding-text-dark))",
                      margin: 0,
                    }}
                  >
                    <EditableText initialText={groomTitle} onSave={setGroomTitle} />
                  </h4>

                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--wedding-secondary))",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden", // Add overflow hidden to prevent image from spilling out
                    }}
                    onClick={() => groomQrInputRef.current?.click()}
                    title="Click to change QR code"
                  >
                    <Image
                      src={groomQrCode || "/placeholder.svg"}
                      alt="Groom QR Code"
                      fill
                      style={{ objectFit: "cover" }} // Change to cover to fill the entire container
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        opacity: 0,
                        transition: "opacity 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.opacity = "1"
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.opacity = "0"
                      }}
                    >
                      <Camera size={24} color="white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={groomQrInputRef}
                    onChange={handleGroomQrChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />

                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Bank:</span>
                      <span>
                        <EditableText initialText={groomBank} onSave={setGroomBank} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Account name:</span>
                      <span>
                        <EditableText initialText={groomAccountName} onSave={setGroomAccountName} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Account number:</span>
                      <span>
                        <EditableText initialText={groomAccountNumber} onSave={setGroomAccountNumber} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Branch:</span>
                      <span>
                        <EditableText initialText={groomBranch} onSave={setGroomBranch} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bride's QR Code */}
                <div
                  style={{
                    flex: "1",
                    border: "1px solid hsl(var(--wedding-secondary))",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: "hsl(var(--wedding-background))",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: cormorant.style.fontFamily,
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "hsl(var(--wedding-text-dark))",
                      margin: 0,
                    }}
                  >
                    <EditableText initialText={brideTitle} onSave={setBrideTitle} />
                  </h4>

                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--wedding-secondary))",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden", // Add overflow hidden to prevent image from spilling out
                    }}
                    onClick={() => brideQrInputRef.current?.click()}
                    title="Click to change QR code"
                  >
                    <Image
                      src={brideQrCode || "/placeholder.svg"}
                      alt="Bride QR Code"
                      fill
                      style={{ objectFit: "cover" }} // Change to cover to fill the entire container
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        opacity: 0,
                        transition: "opacity 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.opacity = "1"
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.opacity = "0"
                      }}
                    >
                      <Camera size={24} color="white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={brideQrInputRef}
                    onChange={handleBrideQrChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />

                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Bank:</span>
                      <span>
                        <EditableText initialText={brideBank} onSave={setBrideBank} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Account name:</span>
                      <span>
                        <EditableText initialText={brideAccountName} onSave={setBrideAccountName} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Account number:</span>
                      <span>
                        <EditableText initialText={brideAccountNumber} onSave={setBrideAccountNumber} />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: cormorant.style.fontFamily,
                        color: "hsl(var(--wedding-text))",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Branch:</span>
                      <span>
                        <EditableText initialText={brideBranch} onSave={setBrideBranch} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default GiftRegistrySection

