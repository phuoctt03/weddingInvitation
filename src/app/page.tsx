"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import HeroSection from "../components/HeroSection"
import MessageSection from "../components/MessageSection"
import DateSection from "../components/DateSection"
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

export default function Home() {
  const [invitationTitle, setInvitationTitle] = useState("Wedding Invitation")
  const [invitationText, setInvitationText] = useState(
    "We request the honor of your presence and blessings on the auspicious occasion of our wedding ceremony.",
  )
  const [groomName, setGroomName] = useState("DAISUKE")
  const [brideName, setBrideName] = useState("RINKA")
  const [weddingDate, setWeddingDate] = useState("2025.5.29")
  const [message, setMessage] = useState(
    "We are overjoyed to announce our wedding and would be honored to have you join us in celebrating this special day. Your presence will make our celebration even more memorable.",
  )
  const [ceremony, setCeremony] = useState("Ceremony")
  const [ceremonyDate, setCeremonyDate] = useState("2025.5.29 THU 13:00~")
  const [ceremonyLocation, setCeremonyLocation] = useState("St. Mary's Cathedral")
  const [ceremonyAddress, setCeremonyAddress] = useState("123 Wedding Lane, Celebration City")
  const [reception, setReception] = useState("Reception")
  const [receptionDate, setReceptionDate] = useState("2025.5.29 THU 14:30~")
  const [receptionLocation, setReceptionLocation] = useState("Grand Ballroom, Luxury Hotel")
  const [receptionAddress, setReceptionAddress] = useState("456 Celebration Avenue, Festivity Town")
  const [access, setAccess] = useState("Access")
  const [dressCode, setDressCode] = useState("Semi-formal attire. We kindly request that guests wear pastel colors.")
  const [weddingHashtag, setWeddingHashtag] = useState("#DaisukeAndRinka2025")
  const googleMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030880383!2d139.7454329151579!3d35.69116618019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c5e412329bb%3A0x7db38e6732953dc!2sTokyo%20Station!5e0!3m2!1sen!2sjp!4v1645451968098!5m2!1sen!2sjp"

  // Animation config
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const sections = [
    { id: "home", label: "Home" },
    { id: "message", label: "Message" },
    { id: "countdown", label: "Countdown" },
    { id: "details", label: "Details" },
    { id: "gallery", label: "Gallery" },
    { id: "weather", label: "Weather" },
    { id: "rsvp", label: "RSVP" },
    { id: "wishes", label: "Wishes" },
    { id: "gifts", label: "Gifts" },
    { id: "accommodation", label: "Stay" },
    { id: "location", label: "Location" },
    { id: "share", label: "Share" },
  ]

  return (
    <main style={{ position: "relative", width: "100%", overflow: "hidden", background: "#fffaf5" }}>
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
          <GallerySection />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="weather"
        >
          <WeatherForecast weddingDate={weddingDate} location="Tokyo, Japan" />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="rsvp"
        >
          <RsvpSection />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="wishes"
        >
          <GuestWishes />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="gifts"
        >
          <GiftRegistrySection />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="accommodation"
        >
          <AccommodationSection />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="location"
        >
          <AccessSection access={access} setAccess={setAccess} googleMap={googleMap} />
        </motion.div>

        <Divider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          id="share"
        >
          <QrCodeGenerator />
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
    </main>
  )
}

