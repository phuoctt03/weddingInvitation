"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown, Plus, Settings, X, Upload } from "lucide-react"
import HeroSection from "../components/HeroSection"
import MessageSection from "../components/MessageSection"
import DateSection from "@/components/DateSection"
import AccessSection from "@/components/AccessSection"
import CountdownSection from "@/components/CountDown"
import GallerySection from "@/components/GallerySection"
import RsvpSection from "@/components/RsvpSection"
import GiftRegistrySection from "@/components/GiftRegistrySection"
import AccommodationSection from "@/components/AccommodationSection"
import FloatingNav from "@/components/FloatingNav"
import Divider from "@/components/Divider"
import MusicPlayer from "@/components/MusicPlayer"
import FloatingElements from "@/components/FloatingElements"
import GuestWishes from "@/components/GuestWishes"
import QrCodeGenerator from "@/components/QrCodeGenerator"
import WeatherForecast from "@/components/WeatherForecast"
import OurStorySection from "@/components/OurStorySection"
import VirtualGuestbook from "@/components/VirtualGuestbook"
import AnimatedEnvelope from "@/components/AnimatedEnvelope"
import ThemeSelector from "@/components/ThemeSelector"
import Image from "next/image"

// Define section types
type SectionType = {
  id: string
  component: React.ReactNode
  label: string
  isRemovable: boolean
}

export default function Home() {
  // Hero Section
  const [invitationTitle, setInvitationTitle] = useState("Wedding Invitation")
  const [invitationText, setInvitationText] = useState(
    "We request the honor of your presence and blessings on the auspicious occasion of our wedding ceremony.",
  )
  const [groomName, setGroomName] = useState("DAISUKE")
  const [brideName, setBrideName] = useState("RINKA")
  const [weddingDate, setWeddingDate] = useState("2025.3.10")

  // Message Section
  const [message, setMessage] = useState(
    "We are overjoyed to announce our wedding and would be honored to have you join us in celebrating this special day. Your presence will make our celebration even more memorable.",
  )
  const [weddingHashtag, setWeddingHashtag] = useState("#DaisukeAndRinka2025")

  // Date Section
  const [ceremony, setCeremony] = useState("Ceremony")
  const [ceremonyDate, setCeremonyDate] = useState("2025.5.29 THU 13:00~")
  const [ceremonyLocation, setCeremonyLocation] = useState("St. Mary's Cathedral")
  const [ceremonyAddress, setCeremonyAddress] = useState("123 Wedding Lane, Celebration City")
  const [reception, setReception] = useState("Reception")
  const [receptionDate, setReceptionDate] = useState("2025.5.29 THU 14:30~")
  const [receptionLocation, setReceptionLocation] = useState("Grand Ballroom, Luxury Hotel")
  const [receptionAddress, setReceptionAddress] = useState("456 Celebration Avenue, Festivity Town")
  const [dressCode, setDressCode] = useState("Semi-formal attire. We kindly request that guests wear pastel colors.")

  // Access Section
  const [access, setAccess] = useState("Access")
  const [googleMap, setGoogleMap] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030880383!2d139.7454329151579!3d35.69116618019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c5e412329bb%3A0x7db38e6732953dc!2sTokyo%20Station!5e0!3m2!1sen!2sjp!4v1645451968098!5m2!1sen!2sjp",
  )
  
  // Gallery Section
  const [galleryImages, setGalleryImages] = useState([
    "/flower1.png",
    "/flower2.png",
    "/flower3.png",
    "/flower4.png",
    "/flower5.png",
    "/flower6.png",
    "/flower7.png",
    "/flower8.png",
    "/flower9.png",
  ])

  // RSVP Section
  const [rsvpDeadline, setRsvpDeadline] = useState("April 29, 2025")

  // Our Story Section
  const [storyEvents, setStoryEvents] = useState([
    {
      id: "1",
      title: "First Met",
      date: "June 15, 2020",
      description: "We met at a mutual friend's birthday party. I noticed her smile from across the room.",
      icon: "Heart",
      image: "/icon/sakura.png",
    },
    {
      id: "2",
      title: "First Date",
      date: "July 3, 2020",
      description: "We went to a small café downtown. The conversation flowed so naturally we lost track of time.",
      icon: "Coffee",
      image: "/icon/sakura.png",
    },
    {
      id: "3",
      title: "First Trip Together",
      date: "December 24, 2020",
      description: "We spent Christmas in the mountains. The snow made everything magical.",
      icon: "MapPin",
      image: "/icon/sakura.png",
    },
    {
      id: "4",
      title: "Moving In Together",
      date: "August 10, 2022",
      description: "We found our first apartment together. It felt like home from day one.",
      icon: "Home",
      image: "/icon/sakura.png",
    },
    {
      id: "5",
      title: "The Proposal",
      date: "December 31, 2023",
      description: "Under the New Year's Eve fireworks, I asked her to marry me. She said yes!",
      icon: "Ring",
      image: "/icon/sakura.png",
    },
  ])

  // Weather Forecast
  const [weatherLocation, setWeatherLocation] = useState("Tokyo, Japan")

  // Add state variables for gift registry in the Home component
  // Add these after the other state declarations
  const [groomTitle, setGroomTitle] = useState("Wedding Gift for the Groom")
  const [groomBank, setGroomBank] = useState("BIDV")
  const [groomAccountNumber, setGroomAccountNumber] = useState("12345678")
  const [groomAccountName, setGroomAccountName] = useState("DAISUKE")
  const [groomBranch, setGroomBranch] = useState("HANOI")

  const [brideTitle, setBrideTitle] = useState("Wedding Gift for the Bride")
  const [brideBank, setBrideBank] = useState("BIDV")
  const [brideAccountNumber, setBrideAccountNumber] = useState("12345678")
  const [brideAccountName, setBrideAccountName] = useState("RENKA")
  const [brideBranch, setBrideBranch] = useState("HANOI")

  const qrBankGroom = "/icon/sakura.png" // Using an icon from your project
  const qrBankBride = "/icon/sakura.png" // Using an icon from your project

  // Accommodation Section
  const [accommodations, setAccommodations] = useState([
    {
      name: "Luxury Hotel",
      icon: "Building",
      description: "Special rates available for wedding guests. Mention 'Daisuke & Rinka Wedding' when booking.",
      address: "456 Celebration Avenue, Festivity Town",
      phone: "+1 (555) 123-4567",
      website: "https://www.luxuryhotel.com",
    },
    {
      name: "Cozy Inn",
      icon: "Building",
      description: "Charming boutique hotel within walking distance to the venue.",
      address: "789 Comfort Street, Festivity Town",
      phone: "+1 (555) 987-6543",
      website: "https://www.cozyinn.com",
    },
  ])

  const [transportation, setTransportation] = useState([
    {
      type: "Airport",
      icon: "Plane",
      description: "The nearest airport is International Airport (INT), approximately 30 minutes from the venue.",
    },
    {
      type: "Transportation",
      icon: "Car",
      description: "We've arranged for a shuttle service between the recommended hotels and the venue.",
    },
  ])

  // Admin passwords
  const [adminPassword, setAdminPassword] = useState("wedding2025")

  // Global admin mode
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false)
  const [showGlobalAdminLogin, setShowGlobalAdminLogin] = useState(false)
  const [globalAdminPassword, setGlobalAdminPassword] = useState("")

  // Envelope and animation states
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  // Section management
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [availableSections, setAvailableSections] = useState([
    { id: "message", label: "Message" },
    { id: "story", label: "Our Story" },
    { id: "countdown", label: "Countdown" },
    { id: "details", label: "Details" },
    { id: "gallery", label: "Gallery" },
    { id: "weather", label: "Weather" },
    { id: "rsvp", label: "RSVP" },
    { id: "wishes", label: "Wishes" },
    { id: "guestbook", label: "Guestbook" },
    { id: "gifts", label: "Gifts" },
    { id: "accommodation", label: "Stay" },
    { id: "location", label: "Location" },
    { id: "share", label: "Share" },
  ])

  // Active sections (excluding header and footer)
  const [activeSections, setActiveSections] = useState<SectionType[]>([])

  // Animation config
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } },
  }

  // Handle envelope completion
  const handleEnvelopeComplete = () => {
    setShowEnvelope(false)
    setContentVisible(true)
  }

  // Prevent scrolling when envelope is showing
  useEffect(() => {
    if (showEnvelope) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showEnvelope])

  // Get all section IDs for navigation
  const getAllSectionIds = () => {
    return ["home", ...activeSections.map((section) => section.id), "footer"]
  }

  // Move section up
  const moveSectionUp = (index: number) => {
    if (index <= 0) return
    const newSections = [...activeSections]
    ;[newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
    setActiveSections(newSections)
  }

  // Move section down
  const moveSectionDown = (index: number) => {
    if (index >= activeSections.length - 1) return
    const newSections = [...activeSections]
    ;[newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
    setActiveSections(newSections)
  }

  // Remove section
  const removeSection = (index: number) => {
    const newSections = [...activeSections]
    const removedSection = newSections.splice(index, 1)[0]
    setActiveSections(newSections)

    // Add back to available sections
    setAvailableSections((prev) => [...prev, { id: removedSection.id, label: removedSection.label }])
  }

  // Add section
  const addSection = (sectionId: string) => {
    // Find the section in available sections
    const sectionToAdd = availableSections.find((section) => section.id === sectionId)
    if (!sectionToAdd) return

    // Remove from available sections
    setAvailableSections((prev) => prev.filter((section) => section.id !== sectionId))

    // Create the component based on section ID
    let newComponent
    switch (sectionId) {
      case "message":
        newComponent = (
          <MessageSection
            message={message}
            setMessage={setMessage}
            weddingHashtag={weddingHashtag}
            setWeddingHashtag={setWeddingHashtag}
          />
        )
        break
      case "story":
        newComponent = <OurStorySection initialStoryEvents={storyEvents} />
        break
      case "countdown":
        newComponent = <CountdownSection targetDate={weddingDate} />
        break
      case "details":
        newComponent = (
          <DateSection
            ceremony={ceremony}
            setCeremony={setCeremony}
            ceremonyDate={ceremonyDate}
            setCeremonyDate={setCeremonyDate}
            ceremonyLocation={ceremonyLocation}
            setCeremonyLocation={setCeremonyLocation}
            ceremonyAddress={ceremonyAddress}
            setCeremonyAddress={setCeremonyAddress}
            reception={reception}
            setReception={setReception}
            receptionDate={receptionDate}
            setReceptionDate={setReceptionDate}
            receptionLocation={receptionLocation}
            setReceptionLocation={setReceptionLocation}
            receptionAddress={receptionAddress}
            setReceptionAddress={setReceptionAddress}
            dressCode={dressCode}
            setDressCode={setDressCode}
          />
        )
        break
      case "gallery":
        newComponent = <GallerySection initialImages={galleryImages} />
        break
      case "weather":
        newComponent = <WeatherForecast weddingDate={weddingDate} location={weatherLocation} />
        break
      case "rsvp":
        newComponent = <RsvpSection deadline={rsvpDeadline} />
        break
      case "wishes":
        newComponent = <GuestWishes adminPassword={adminPassword} isAdmin={isGlobalAdmin} />
        break
      case "guestbook":
        newComponent = <VirtualGuestbook adminPassword={adminPassword} isAdmin={isGlobalAdmin} />
        break
      case "gifts":
        newComponent = (
          <GiftRegistrySection
            groomTitle={groomTitle}
            setGroomTitle={setGroomTitle}
            groomBank={groomBank}
            setGroomBank={setGroomBank}
            groomAccountNumber={groomAccountNumber}
            setGroomAccountNumber={setGroomAccountNumber}
            groomAccountName={groomAccountName}
            setGroomAccountName={setGroomAccountName}
            groomBranch={groomBranch}
            setGroomBranch={setGroomBranch}
            brideTitle={brideTitle}
            setBrideTitle={setBrideTitle}
            brideBank={brideBank}
            setBrideBank={setBrideBank}
            brideAccountNumber={brideAccountNumber}
            setBrideAccountNumber={setBrideAccountNumber}
            brideAccountName={brideAccountName}
            setBrideAccountName={setBrideAccountName}
            brideBranch={brideBranch}
            setBrideBranch={setBrideBranch}
            qrBankGroom={qrBankGroom}
            qrBankBride={qrBankBride}
          />
        )
        break
      case "accommodation":
        newComponent = <AccommodationSection accommodations={accommodations} transportation={transportation} />
        break
      case "location":
        newComponent = (
          <AccessSection
            access={access}
            setAccess={setAccess}
            googleMap={googleMap}
            locationAddress={ceremonyAddress}
          />
        )
        break
      case "share":
        newComponent = (
          <QrCodeGenerator
            title="Share Our Invitation"
            subtitle="Scan the QR code or share the link with your loved ones"
          />
        )
        break
      default:
        return
    }

    // Add to active sections
    setActiveSections((prev) => [
      ...prev,
      {
        id: sectionId,
        component: newComponent,
        label: sectionToAdd.label,
        isRemovable: true,
      },
    ])
  }

  const handleGlobalAdminLogin = () => {
    if (globalAdminPassword === adminPassword) {
      setIsGlobalAdmin(true)
      setShowGlobalAdminLogin(false)
      setGlobalAdminPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  // Add this after the other useEffect hooks:
  useEffect(() => {
    // Update any components that depend on admin status when isGlobalAdmin changes
    setActiveSections((prev) =>
      prev.map((section) => {
        if (section.id === "wishes") {
          return {
            ...section,
            component: <GuestWishes adminPassword={adminPassword} isAdmin={isGlobalAdmin} />,
            label: section.label,
            isRemovable: section.isRemovable,
          }
        }
        if (section.id === "guestbook") {
          return {
            ...section,
            component: <VirtualGuestbook adminPassword={adminPassword} isAdmin={isGlobalAdmin} />,
            label: section.label,
            isRemovable: section.isRemovable,
          }
        }
        return section
      }),
    )
  }, [isGlobalAdmin, adminPassword])

  // Add this state for floating elements images after other state declarations
  const [floatingImages, setFloatingImages] = useState([
    "/icon/petals.png",
    "/icon/sakura.png",
    "/icon/maple-leaf.png",
    "/icon/heart.png",
  ])
  const [showFloatingImagesModal, setShowFloatingImagesModal] = useState(false)
  const [newFloatingImage, setNewFloatingImage] = useState("")
  const floatingImageInputRef = useRef<HTMLInputElement>(null)

  // Add this function to handle adding a new floating image
  const handleAddFloatingImage = () => {
    if (newFloatingImage) {
      setFloatingImages((prev) => [...prev, newFloatingImage])
      setNewFloatingImage("")
    }
  }

  // Add this function to handle removing a floating image
  const handleRemoveFloatingImage = (index: number) => {
    setFloatingImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Add this function to handle file upload for floating images
  const handleFloatingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewFloatingImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const weddingMusic = "/music/bacbling.mp3"

  return (
    <main
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "hsl(var(--wedding-background))" }}
    >
      {/* Animated Envelope */}
      {showEnvelope && (
        <AnimatedEnvelope
          groomName={groomName}
          brideName={brideName}
          weddingDate={weddingDate}
          onComplete={handleEnvelopeComplete}
        />
      )}

      {/* Only show content after envelope animation or skip */}
      {(!showEnvelope || contentVisible) && (
        <>
          <FloatingNav
            sections={getAllSectionIds().map((id) => ({
              id,
              label:
                id === "home"
                  ? "Home"
                  : id === "footer"
                    ? "Footer"
                    : activeSections.find((s) => s.id === id)?.label || id,
            }))}
            isAdmin={isGlobalAdmin}
            setShowGlobalAdminLogin={() => {
              if (isGlobalAdmin) {
                // If already logged in, log out
                setIsGlobalAdmin(false)
              } else {
                // Otherwise show login modal
                setShowGlobalAdminLogin(true)
              }
            }}
          />
          <FloatingElements
            images={floatingImages}
            count={Math.floor(typeof window !== "undefined" ? window.innerWidth / 100 : 12)}
            minSize={20}
            maxSize={50}
            minSpeed={1}
            maxSpeed={3}
          />
          <MusicPlayer defaultMusic={weddingMusic} />
          <ThemeSelector />

          <button
            onClick={() => setShowFloatingImagesModal(true)}
            style={{
              position: "fixed",
              bottom: "10rem", // Position it above the other buttons
              right: "2rem",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              backgroundColor: "hsla(var(--wedding-primary), 0.8)",
              color: "white",
              border: "none",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "hsla(var(--wedding-primary-dark), 0.9)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "hsla(var(--wedding-primary), 0.8)"
            }}
            title="Change floating elements"
          >
            <Image src="/icon/petals.png" width={20} height={20} alt="Floating elements" />
          </button>

          {/* Section Manager Button */}
          <button
            onClick={() => setShowSectionManager(true)}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              backgroundColor: "hsl(var(--wedding-primary))",
              color: "white",
              border: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            <Settings size={20} />
          </button>

          {/* Section Manager Modal */}
          {showSectionManager && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
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
                  borderRadius: "0.75rem",
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
                    padding: "1.25rem",
                    borderBottom: "1px solid hsl(var(--wedding-secondary))",
                    backgroundColor: "hsl(var(--wedding-background))",
                    borderRadius: "0.75rem 0.75rem 0 0",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      color: "hsl(var(--wedding-primary-dark))",
                    }}
                  >
                    Manage Sections
                  </h3>
                  <button
                    onClick={() => setShowSectionManager(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "hsl(var(--wedding-text-light))",
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <h4 style={{ margin: "0 0 1rem 0", color: "hsl(var(--wedding-text-dark))" }}>Active Sections</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem",
                        backgroundColor: "hsl(var(--wedding-background-alt))",
                        borderRadius: "0.5rem",
                        border: "1px solid hsl(var(--wedding-secondary))",
                      }}
                    >
                      <div style={{ flex: 1, fontWeight: 500, color: "hsl(var(--wedding-text))" }}>Header (Fixed)</div>
                    </div>

                    {activeSections.map((section, index) => (
                      <div
                        key={section.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.75rem",
                          backgroundColor: "hsl(var(--wedding-background-alt))",
                          borderRadius: "0.5rem",
                          border: "1px solid hsl(var(--wedding-secondary))",
                        }}
                      >
                        <div style={{ flex: 1, fontWeight: 500, color: "hsl(var(--wedding-text))" }}>
                          {section.label}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => moveSectionUp(index)}
                            disabled={index === 0}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "0.25rem",
                              backgroundColor:
                                index === 0
                                  ? "hsl(var(--wedding-background-alt))"
                                  : "hsl(var(--wedding-primary-light))",
                              color:
                                index === 0 ? "hsl(var(--wedding-text-light))" : "hsl(var(--wedding-primary-dark))",
                              border: "none",
                              cursor: index === 0 ? "not-allowed" : "pointer",
                            }}
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => moveSectionDown(index)}
                            disabled={index === activeSections.length - 1}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "0.25rem",
                              backgroundColor:
                                index === activeSections.length - 1
                                  ? "hsl(var(--wedding-background-alt))"
                                  : "hsl(var(--wedding-primary-light))",
                              color:
                                index === activeSections.length - 1
                                  ? "hsl(var(--wedding-text-light))"
                                  : "hsl(var(--wedding-primary-dark))",
                              border: "none",
                              cursor: index === activeSections.length - 1 ? "not-allowed" : "pointer",
                            }}
                          >
                            <ChevronDown size={16} />
                          </button>
                          {section.isRemovable && (
                            <button
                              onClick={() => removeSection(index)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2rem",
                                height: "2rem",
                                borderRadius: "0.25rem",
                                backgroundColor: "hsl(var(--wedding-error-light))",
                                color: "hsl(var(--wedding-error))",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem",
                        backgroundColor: "hsl(var(--wedding-background-alt))",
                        borderRadius: "0.5rem",
                        border: "1px solid hsl(var(--wedding-secondary))",
                      }}
                    >
                      <div style={{ flex: 1, fontWeight: 500, color: "hsl(var(--wedding-text))" }}>Footer (Fixed)</div>
                    </div>
                  </div>

                  {availableSections.length > 0 && (
                    <>
                      <h4 style={{ margin: "0 0 1rem 0", color: "hsl(var(--wedding-text-dark))" }}>Add Sections</h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.75rem",
                        }}
                      >
                        {availableSections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => addSection(section.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.5rem 1rem",
                              backgroundColor: "hsl(var(--wedding-primary-light))",
                              color: "hsl(var(--wedding-primary-dark))",
                              borderRadius: "0.5rem",
                              border: "none",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
                              e.currentTarget.style.color = "white"
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-light))"
                              e.currentTarget.style.color = "hsl(var(--wedding-primary-dark))"
                            }}
                          >
                            <Plus size={16} />
                            {section.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div
                  style={{
                    padding: "1.25rem",
                    borderTop: "1px solid hsl(var(--wedding-secondary))",
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "hsl(var(--wedding-background-alt))",
                    borderRadius: "0 0 0.75rem 0.75rem",
                  }}
                >
                  <button
                    onClick={() => setShowSectionManager(false)}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "hsl(var(--wedding-primary))",
                      color: "white",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Global Admin Login Modal */}
          {showGlobalAdminLogin && (
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
                zIndex: 1100, // Increased z-index to ensure it's above other elements
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "0.5rem",
                  width: "90%",
                  maxWidth: "400px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    color: "hsl(var(--wedding-text))",
                  }}
                >
                  Admin Login
                </h3>
                <input
                  type="password"
                  value={globalAdminPassword}
                  onChange={(e) => setGlobalAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid hsl(var(--wedding-secondary))",
                    marginBottom: "1rem",
                  }}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={handleGlobalAdminLogin}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "hsl(var(--wedding-primary))",
                      color: "white",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowGlobalAdminLogin(false)
                      setGlobalAdminPassword("")
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#f3f4f6",
                      color: "#4b5563",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showFloatingImagesModal && (
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
                  borderRadius: "0.75rem",
                  width: "90%",
                  maxWidth: "500px",
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
                    padding: "1.25rem",
                    borderBottom: "1px solid hsl(var(--wedding-secondary))",
                    backgroundColor: "hsl(var(--wedding-background))",
                    borderRadius: "0.75rem 0.75rem 0 0",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      color: "hsl(var(--wedding-primary-dark))",
                    }}
                  >
                    Floating Elements
                  </h3>
                  <button
                    onClick={() => setShowFloatingImagesModal(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "hsl(var(--wedding-text-light))",
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <h4 style={{ margin: "0 0 1rem 0", color: "hsl(var(--wedding-text-dark))" }}>Current Elements</h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {floatingImages.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: "80px",
                          height: "80px",
                          border: "1px solid hsl(var(--wedding-secondary))",
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Floating element ${index + 1}`}
                          fill
                          style={{ objectFit: "contain", padding: "0.5rem" }}
                        />
                        <button
                          onClick={() => handleRemoveFloatingImage(index)}
                          style={{
                            position: "absolute",
                            top: "0.25rem",
                            right: "0.25rem",
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            cursor: "pointer",
                            color: "hsl(var(--wedding-error))",
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ margin: "1.5rem 0 1rem 0", color: "hsl(var(--wedding-text-dark))" }}>Add New Element</h4>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() => floatingImageInputRef.current?.click()}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          padding: "0.75rem",
                          backgroundColor: "hsl(var(--wedding-primary-light))",
                          color: "hsl(var(--wedding-primary-dark))",
                          borderRadius: "0.5rem",
                          border: "none",
                          cursor: "pointer",
                          flex: 1,
                        }}
                      >
                        <Upload size={16} />
                        Upload Image
                      </button>
                      <input
                        type="file"
                        ref={floatingImageInputRef}
                        onChange={handleFloatingImageUpload}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </div>

                    {newFloatingImage && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "1px solid hsl(var(--wedding-secondary))",
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={newFloatingImage || "/placeholder.svg"}
                            alt="New floating element"
                            fill
                            style={{ objectFit: "contain", padding: "0.5rem" }}
                          />
                        </div>
                        <button
                          onClick={handleAddFloatingImage}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: "hsl(var(--wedding-primary))",
                            color: "white",
                            borderRadius: "0.5rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <Plus size={16} />
                          Add to Elements
                        </button>
                      </div>
                    )}
                  </div>

                  <h4 style={{ margin: "1.5rem 0 1rem 0", color: "hsl(var(--wedding-text-dark))" }}>Preset Elements</h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {[
                      { name: "Petals", image: "/icon/petals.png" },
                      { name: "Sakura", image: "/icon/sakura.png" },
                      { name: "Maple Leaf", image: "/icon/maple-leaf.png" },
                      { name: "Heart", image: "/icon/heart.png" },
                    ].map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setFloatingImages((prev) => [...prev, preset.image])}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem",
                          backgroundColor: "hsl(var(--wedding-background-alt))",
                          borderRadius: "0.5rem",
                          border: "1px solid hsl(var(--wedding-secondary))",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={preset.image || "/placeholder.svg"}
                            alt={preset.name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "hsl(var(--wedding-text))",
                          }}
                        >
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    padding: "1.25rem",
                    borderTop: "1px solid hsl(var(--wedding-secondary))",
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "hsl(var(--wedding-background-alt))",
                    borderRadius: "0 0 0.75rem 0.75rem",
                  }}
                >
                  <button
                    onClick={() => setShowFloatingImagesModal(false)}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "hsl(var(--wedding-primary))",
                      color: "white",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fixed Header */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" id="home">
            <HeroSection
              invitationTitle={invitationTitle}
              setInvitationTitle={setInvitationTitle}
              invitationText={invitationText}
              setInvitationText={setInvitationText}
              groomName={groomName}
              setGroomName={setGroomName}
              brideName={brideName}
              setBrideName={setBrideName}
              weddingDate={weddingDate}
              setWeddingDate={setWeddingDate}
            />
          </motion.div>

          {/* Dynamic Sections */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "4rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8rem",
            }}
          >
            {activeSections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                id={section.id}
              >
                {index > 0 && <Divider />}
                {section.component}
              </motion.div>
            ))}
          </div>

          {/* Fixed Footer */}
          <footer
            id="footer"
            style={{
              background: "hsl(var(--wedding-primary-light))",
              padding: "2rem 0",
              marginTop: "5rem",
              textAlign: "center",
              color: "hsl(var(--wedding-primary-dark))",
            }}
          >
            <p style={{ fontSize: "0.875rem" }}>
              With love, {groomName} & {brideName}
            </p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>{weddingHashtag}</p>
          </footer>
        </>
      )}
    </main>
  )
}

