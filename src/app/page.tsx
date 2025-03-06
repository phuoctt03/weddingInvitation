"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

export default function Home() {
  // Hero Section
  const [invitationTitle, setInvitationTitle] = useState("Wedding Invitation")
  const [invitationText, setInvitationText] = useState(
    "We request the honor of your presence and blessings on the auspicious occasion of our wedding ceremony.",
  )
  const [groomName, setGroomName] = useState("DAISUKE")
  const [brideName, setBrideName] = useState("RINKA")
  const [weddingDate, setWeddingDate] = useState("2025.5.29")

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
  const [locationAddress, setLocationAddress] = useState("123 Wedding Lane, Celebration City")

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

  // Gift Registry Section
  const [registries, setRegistries] = useState([
    {
      name: "Amazon Wedding Registry",
      icon: "Gift",
      url: "https://www.amazon.com/wedding",
      description: "Find a variety of items we've selected for our new home.",
    },
    {
      name: "Honeymoon Fund",
      icon: "Heart",
      url: "https://www.honeyfund.com",
      description: "Help us create memories on our dream honeymoon.",
    },
    {
      name: "Charity Donation",
      icon: "CreditCard",
      url: "https://www.charity.org",
      description: "Make a donation to a cause that's close to our hearts.",
    },
  ])

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

  // Envelope and animation states
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  // Animation config
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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

  const sections = [
    { id: "home", label: "Home" },
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
  ]

  return (
    <main style={{ position: "relative", width: "100%", overflow: "hidden", background: "#fffaf5" }}>
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
          <FloatingNav sections={sections} />
          <FloatingElements />
          <MusicPlayer />

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

          {/* Additional Sections */}
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
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="message"
            >
              <MessageSection
                message={message}
                setMessage={setMessage}
                weddingHashtag={weddingHashtag}
                setWeddingHashtag={setWeddingHashtag}
              />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              id="story"
            >
              <OurStorySection initialStoryEvents={storyEvents} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="countdown"
            >
              <CountdownSection targetDate={weddingDate} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="details"
            >
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
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="gallery"
            >
              <GallerySection initialImages={galleryImages} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="weather"
            >
              <WeatherForecast weddingDate={weddingDate} location={weatherLocation} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="rsvp"
            >
              <RsvpSection deadline={rsvpDeadline} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="wishes"
            >
              <GuestWishes adminPassword={adminPassword} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="guestbook"
            >
              <VirtualGuestbook adminPassword={adminPassword} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="gifts"
            >
              <GiftRegistrySection registries={registries} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="accommodation"
            >
              <AccommodationSection accommodations={accommodations} transportation={transportation} />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="location"
            >
              <AccessSection
                access={access}
                setAccess={setAccess}
                googleMap={googleMap}
                locationAddress={locationAddress}
              />
            </motion.div>

            <Divider />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              id="share"
            >
              <QrCodeGenerator
                title="Share Our Invitation"
                subtitle="Scan the QR code or share the link with your loved ones"
              />
            </motion.div>
          </div>

          <footer
            style={{
              background: "#f8e8d8",
              padding: "2rem 0",
              marginTop: "5rem",
              textAlign: "center",
              color: "#5d4037",
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

