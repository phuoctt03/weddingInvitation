"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Acme, Dancing_Script } from "next/font/google"
import { Edit2, Trash2, Upload, X, ZoomIn, RotateCw, Filter, Sun, Check } from "lucide-react"

const acme = Acme({ subsets: ["latin"], weight: ["400", "400"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

interface GallerySectionProps {
  initialImages: string[]
}

export default function GallerySection({ initialImages }: GallerySectionProps) {
  // State to track the current images
  const [images, setImages] = useState(initialImages)
  // State to track which image is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // State to track if we're on mobile or desktop
  const [isMobile, setIsMobile] = useState(true)
  // State for image editor
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [rotation, setRotation] = useState(0)
  // Refs for file inputs
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const editorFileInputRef = useRef<HTMLInputElement | null>(null)

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
  }, [fileInputRefs])

  // Initialize refs array
  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, images.length)
  }, [images.length, fileInputRefs])

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
    setEditingIndex(index)
    setEditingImage(images[index])
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setRotation(0)
  }

  // Handle image upload in editor
  const handleEditorImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditingImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle save edited image
  const handleSaveEdit = () => {
    if (editingIndex !== null && editingImage) {
      const newImages = [...images]
      newImages[editingIndex] = editingImage
      setImages(newImages)
      closeEditor()
    }
  }

  // Close image editor
  const closeEditor = () => {
    setEditingIndex(null)
    setEditingImage(null)
  }

  // Apply image filters
  const getFilterStyle = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
      transform: `rotate(${rotation}deg)`,
    }
  }

  // Reset filters
  const resetFilters = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setRotation(0)
  }

  // Delete image
  const handleDeleteImage = (index: number) => {
    const newImages = [...images]
    newImages[index] = "/icon/sakura.png"
    setImages(newImages)
  }

  return (
    <section style={{ margin: "1rem 0" }}>
      <p
        style={{
          fontSize: "2.25rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "hsl(var(--wedding-primary-dark))",
          fontFamily: dancingScript.style.fontFamily,
        }}
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
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid hsl(var(--wedding-secondary))",
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
                transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Wedding image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />

              {/* Edit overlay */}
              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    opacity: 0,
                    animation: "fadeIn 0.3s forwards",
                  }}
                >
                  <style jsx>{`
                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                  `}</style>

                  <button
                    onClick={() => handleEditClick(index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "white",
                      color: "#333",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                    <Edit2 size={16} />
                    Edit Photo
                  </button>

                  <button
                    onClick={() => handleDeleteImage(index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      color: "hsl(var(--wedding-error))",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)"
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
                    }}
                  >
                    <Trash2 size={16} />
                    Remove Photo
                  </button>
                </div>
              )}

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

      {/* Image Editor Modal */}
      {editingIndex !== null && editingImage && (
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
              borderRadius: "0.75rem",
              width: "90%",
              maxWidth: "900px",
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
                backgroundColor: "hsl(var(--wedding-background-alt))",
                borderRadius: "0.75rem 0.75rem 0 0",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: acme.style.fontFamily,
                  fontSize: "1.5rem",
                  color: "hsl(var(--wedding-primary-dark))",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Edit2 size={20} color="hsl(var(--wedding-primary-dark))" />
                Edit Wedding Photo
              </h3>
              <button
                onClick={closeEditor}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--wedding-text-light))",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "1.5rem",
              }}
            >
              {/* Image preview */}
              <div
                style={{
                  flex: "1 1 60%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  backgroundColor: "hsl(var(--wedding-background-alt))",
                  borderRadius: "0.75rem",
                  position: "relative",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "350px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    border: "1px solid hsl(var(--wedding-secondary))",
                  }}
                >
                  <Image
                    src={editingImage || "/placeholder.svg"}
                    alt="Editing preview"
                    fill
                    style={{
                      objectFit: "contain",
                      ...getFilterStyle(),
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginTop: "1.5rem",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => editorFileInputRef.current?.click()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "hsl(var(--wedding-background-alt))",
                      color: "hsl(var(--wedding-text))",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                    }}
                  >
                    <Upload size={16} />
                    Upload New Photo
                  </button>

                  <button
                    onClick={resetFilters}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "hsl(var(--wedding-background-alt))",
                      color: "hsl(var(--wedding-text))",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                    }}
                  >
                    <RotateCw size={16} />
                    Reset All Filters
                  </button>
                </div>

                <input
                  type="file"
                  ref={editorFileInputRef}
                  onChange={handleEditorImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>

              {/* Controls */}
              <div
                style={{
                  flex: "1 1 40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.75rem",
                  padding: "1.5rem",
                  backgroundColor: "hsl(var(--wedding-background-alt))",
                  borderRadius: "0.75rem",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontFamily: acme.style.fontFamily,
                    fontSize: "1.125rem",
                    color: "hsl(var(--wedding-primary-dark))",
                  }}
                >
                  Adjust Photo Settings
                </h4>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-text))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      <Sun size={18} color="hsl(var(--wedding-primary-dark))" />
                      Brightness
                    </label>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-primary-dark))",
                        fontWeight: "600",
                        backgroundColor: "hsl(var(--wedding-primary-light))",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {brightness}%
                    </span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: "0.5rem",
                      backgroundColor: "hsl(var(--wedding-secondary-light))",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: `${brightness}%`,
                        backgroundColor: "hsl(var(--wedding-primary))",
                        borderRadius: "9999px",
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number.parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "0.5rem 0 0 0",
                      accentColor: "#d4b396",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-text))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      <ZoomIn size={18} color="hsl(var(--wedding-primary-dark))" />
                      Contrast
                    </label>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-primary-dark))",
                        fontWeight: "600",
                        backgroundColor: "hsl(var(--wedding-primary-light))",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {contrast}%
                    </span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: "0.5rem",
                      backgroundColor: "hsl(var(--wedding-secondary-light))",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: `${contrast}%`,
                        backgroundColor: "hsl(var(--wedding-primary))",
                        borderRadius: "9999px",
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number.parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "0.5rem 0 0 0",
                      accentColor: "#d4b396",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-text))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      <Filter size={18} color="hsl(var(--wedding-primary-dark))" />
                      Saturation
                    </label>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-primary-dark))",
                        fontWeight: "600",
                        backgroundColor: "hsl(var(--wedding-primary-light))",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {saturation}%
                    </span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: "0.5rem",
                      backgroundColor: "hsl(var(--wedding-secondary-light))",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: `${saturation / 2}%`,
                        backgroundColor: "hsl(var(--wedding-primary))",
                        borderRadius: "9999px",
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number.parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "0.5rem 0 0 0",
                      accentColor: "#d4b396",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-text))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: "500",
                      }}
                    >
                      <RotateCw size={18} color="hsl(var(--wedding-primary-dark))" />
                      Rotation
                    </label>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-primary-dark))",
                        fontWeight: "600",
                        backgroundColor: "hsl(var(--wedding-primary-light))",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {rotation}°
                    </span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: "0.5rem",
                      backgroundColor: "hsl(var(--wedding-secondary-light))",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: `${rotation / 3.6}%`,
                        backgroundColor: "hsl(var(--wedding-primary))",
                        borderRadius: "9999px",
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotation}
                    onChange={(e) => setRotation(Number.parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "0.5rem 0 0 0",
                      accentColor: "#d4b396",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "1.25rem",
                borderTop: "1px solid hsl(var(--wedding-secondary))",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
                backgroundColor: "hsl(var(--wedding-background-alt))",
                borderRadius: "0 0 0.75rem 0.75rem",
              }}
            >
              <button
                onClick={closeEditor}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "hsl(var(--wedding-background-alt))",
                  color: "hsl(var(--wedding-text))",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-background-alt))"
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "hsl(var(--wedding-primary))",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary-dark))"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--wedding-primary))"
                }}
              >
                <Check size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

