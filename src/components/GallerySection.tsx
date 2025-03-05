"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Acme } from "next/font/google"

const acme = Acme({ subsets: ["latin"], weight: ["400", "400"] })

export default function GallerySection() {
  const initialImages = [
    "/flower1.png",
    "/flower2.png",
    "/flower3.png",
    "/flower4.png",
    "/flower5.png",
    "/flower6.png",
    "/flower7.png",
    "/flower8.png",
    "/flower9.png",
  ]

  // State to track the current images
  const [images, setImages] = useState(initialImages)
  // State to track which image is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // State to track if we're on mobile or desktop
  const [isMobile, setIsMobile] = useState(true)
  // Refs for file inputs
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initialize refs array
  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, images.length)
  }, [images.length])

  // Handle image change
  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImages = [...images]
        newImages[index] = e.target?.result as string
        setImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle edit button click
  const handleEditClick = (index: number) => {
    fileInputRefs.current[index]?.click()
  }

  return (
    <section style={{ margin: "1rem 0" }}>
      <p
        className={`${acme.className}`}
        style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", textAlign: "center" }}
      >
        Album Wedding
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "1rem",
          minWidth: "600px",
        }}
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            style={{
              position: "relative",
              height: isMobile ? "16rem" : "20rem",
              overflow: "hidden",
              borderRadius: "0.5rem",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Wedding image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />

              {/* Edit button */}
              <button
                onClick={() => handleEditClick(index)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#333",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  zIndex: 10,
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Edit
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                ref={(el) => {
                  fileInputRefs.current[index] = el
                }}
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

