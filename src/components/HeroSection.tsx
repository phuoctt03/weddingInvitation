"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Cormorant_Garamond, Dancing_Script, Allura } from "next/font/google"
import EditableText from "./EditableText"
import Image from "next/image"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"
import ImageUploader from "./ImageUploader"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const madinaScript = Allura({
  subsets: ["latin"],
  weight: ["400", "400"],
  display: "swap",
})

interface HeroSectionProps {
  invitationTitle: string
  setInvitationTitle: (title: string) => void
  invitationText: string
  setInvitationText: (text: string) => void
  groomName: string
  setGroomName: (name: string) => void
  brideName: string
  setBrideName: (name: string) => void
  weddingDate: string
  setWeddingDate: (date: string) => void
}

const HeroSection: React.FC<HeroSectionProps> = ({
  invitationTitle,
  setInvitationTitle,
  invitationText,
  setInvitationText,
  groomName,
  setGroomName,
  brideName,
  setBrideName,
  weddingDate,
  setWeddingDate,
}) => {
  const [backgroundImage, setBackgroundImage] = useState("/flower.png")
  const [dayOfWeek, setDayOfWeek] = useState("THU")
  const [isLoaded, setIsLoaded] = useState(false)
  const [showImageUploader, setShowImageUploader] = useState(false)

  useEffect(() => {
    // Set isLoaded to true after component mounts to trigger animations
    setIsLoaded(true)
  }, [])

  const handleImageChange = (imageData: string) => {
    setBackgroundImage(imageData)
    setShowImageUploader(false)
  }

  const getDayOfWeek = (date: Date): string => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    return days[date.getDay()]
  }

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim()

    // Kiểm tra định dạng YYYY.MM.DD (năm 4 số, tháng/ngày tối đa 2 số)
    const datePattern = /^\d{4}\.\d{1,2}\.\d{1,2}$/
    if (!datePattern.test(inputValue)) {
      setWeddingDate("2025.11.11")
      return
    }

    // Tách các phần tử năm, tháng, ngày
    const [year, month, day] = inputValue.split(".").map(Number)

    // Kiểm tra năm (chỉ được nhập 4 số)
    if (year < 1000 || year > 9999) {
      setWeddingDate("2025.11.11")
      return
    }

    // Kiểm tra tháng hợp lệ (1-12)
    if (month < 1 || month > 12) {
      setWeddingDate("2025.11.11")
      return
    }

    // Kiểm tra ngày hợp lệ theo tháng
    const daysInMonth = new Date(year, month, 0).getDate() // Lấy số ngày trong tháng
    if (day < 1 || day > daysInMonth) {
      setWeddingDate("2025.11.11")
      return
    }

    // Kiểm tra ngày không được nhỏ hơn ngày hiện tại
    const inputDate = new Date(year, month - 1, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Đặt về 0 giờ để chỉ so sánh ngày

    if (inputDate < today) {
      setWeddingDate("2025.11.11")
      return
    } // Nếu nhập ngày trong quá khứ thì không hợp lệ

    // Lấy thứ trong tuần và cập nhật state
    const dayOfWeek = getDayOfWeek(inputDate)
    setDayOfWeek(dayOfWeek)
  }

  // Animation styles
  const animationStyles = {
    fadeIn: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 1.5s ease-in-out",
    },
    slideUp: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out, transform 1.5s ease-out",
    },
    slideUpDelay1: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s",
    },
    slideUpDelay2: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out 0.6s, transform 1.5s ease-out 0.6s",
    },
    slideUpDelay3: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out 0.9s, transform 1.5s ease-out 0.9s",
    },
    slideUpDelay4: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out 1.2s, transform 1.5s ease-out 1.2s",
    },
    slideUpDelay5: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1.5s ease-out 1.5s, transform 1.5s ease-out 1.5s",
    },
  }

  return (
    <div
      style={{
        position: "relative",
        height: "120vh",
        width: "100%",
        overflow: "hidden",
        textAlign: "center",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "hsl(var(--wedding-primary-light))",
          opacity: 0.2,
        }}
      ></div>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Wedding couple"
          style={{
            position: "absolute",
            zIndex: 0,
            left: "calc(50% - 300px)",
            ...animationStyles.fadeIn,
          }}
          width={600}
          height={1200}
          priority
          className="object-cover"
          quality={100}
        />

        {/* Edit background button */}
        <button
          onClick={() => setShowImageUploader(true)}
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "hsl(var(--wedding-primary-dark))",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 4px hsla(var(--wedding-text), 0.2)",
          }}
        >
          <Camera size={16} />
          Change Background
        </button>
      </motion.div>

      {/* Image uploader modal */}
      {showImageUploader && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              padding: "2rem",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 1.5rem 0",
                color: "#1f2937",
                fontFamily: cormorant.style.fontFamily,
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Change Background Image
            </h3>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <ImageUploader
                initialImage={backgroundImage}
                onImageChange={handleImageChange}
                aspectRatio={0.6}
                height={300}
                width={200}
                placeholder="Upload background image"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={() => setShowImageUploader(false)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f3f4f6",
                  color: "#4b5563",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1
            style={{
              fontFamily: madinaScript.style.fontFamily,
              fontSize: "6em",
              maxWidth: "400px",
              position: "relative",
              left: "calc(50% - 200px)",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              ...animationStyles.slideUp,
            }}
          >
            <EditableText initialText={invitationTitle} onSave={setInvitationTitle} placeholder="Wedding Invitation" />
          </h1>
        </motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "80%",
            maxWidth: "32rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p
              style={{
                fontFamily: cormorant.style.fontFamily,
                maxWidth: "400px",
                position: "relative",
                left: "calc(50% - 200px)",
                fontSize: "1.5em",
                fontWeight: "500",
                textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                ...animationStyles.slideUpDelay1,
              }}
            >
              <EditableText
                initialText={invitationText}
                onSave={setInvitationText}
                placeholder="Enter your invitation message"
              />
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <h1
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "4em",
                margin: 0,
                padding: 0,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                ...animationStyles.slideUpDelay2,
              }}
            >
              <EditableText
                initialText={groomName}
                onSave={setGroomName}
                maxHeight1rem={true}
                placeholder="Groom Name"
                multiline={false}
              />
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <h2
              style={{
                fontFamily: dancingScript.style.fontFamily,
                fontSize: "4em",
                margin: 0,
                padding: 0,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                ...animationStyles.slideUpDelay3,
              }}
            >
              &
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <h1
              style={{
                fontFamily: cormorant.style.fontFamily,
                fontSize: "4em",
                margin: 0,
                padding: 0,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                ...animationStyles.slideUpDelay4,
              }}
            >
              <EditableText
                initialText={brideName}
                onSave={setBrideName}
                maxHeight1rem={true}
                placeholder="Bride Name"
                multiline={false}
              />
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <p
              style={{
                fontFamily: dancingScript.style.fontFamily,
                fontSize: "4em",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                ...animationStyles.slideUpDelay5,
              }}
              onChange={handleDayChange}
            >
              <EditableText
                initialText={weddingDate}
                onSave={setWeddingDate}
                maxHeight1rem={true}
                placeholder="YYYY.MM.DD"
                multiline={false}
              />{" "}
              {dayOfWeek}
            </p>
          </motion.div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `,
          }}
        />
      </div>
    </div>
  )
}

export default HeroSection

