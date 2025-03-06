"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Acme, Dancing_Script } from "next/font/google"
import { Edit2, Trash2, Upload, X, Check, Plus, ImagePlus } from "lucide-react"

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

  // Update the GallerySection component to add functionality for adding new images and simplify the editor

  // First, add a new state for managing the "add image" functionality
  const [showAddImageModal, setShowAddImageModal] = useState(false)
  const [newImages, setNewImages] = useState<string[]>([])
  const addImageInputRef = useRef<HTMLInputElement | null>(null)

  // Add a function to handle adding multiple new images to the gallery
  const handleAddImages = () => {
    if (newImages.length > 0) {
      setImages([...images, ...newImages])
      setNewImages([])
      setShowAddImageModal(false)
    }
  }

  // Add a function to handle new image upload (multiple files)
  const handleNewImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      const promises = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(promises).then((results) => {
        setNewImages([...newImages, ...results])
      })
    }
  }

  // Remove a new image from the selection
  const removeNewImage = (index: number) => {
    const updatedImages = [...newImages]
    updatedImages.splice(index, 1)
    setNewImages(updatedImages)
  }

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

  // Delete image - completely remove it from the array
  const handleDeleteImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
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

      {/* Add this after the grid of images: */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowAddImageModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "hsl(var(--wedding-primary))",
            color: "white",
            borderRadius: "0.5rem",
            border: "none",
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "1.25rem",
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
          Add Photos
        </button>
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
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Image preview */}
              <div
                style={{
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
                </div>

                <input
                  type="file"
                  ref={editorFileInputRef}
                  onChange={handleEditorImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
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

      {/* Add Multiple Images Modal */}
      {showAddImageModal && (
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
              maxWidth: "800px",
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
                }}
              >
                Add Multiple Photos
              </h3>
              <button
                onClick={() => {
                  setShowAddImageModal(false)
                  setNewImages([])
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--wedding-text-light))",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                {/* Upload area */}
                <div
                  onClick={() => addImageInputRef.current?.click()}
                  style={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "hsl(var(--wedding-background-alt))",
                    borderRadius: "0.5rem",
                    border: "2px dashed hsl(var(--wedding-secondary))",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  <ImagePlus size={40} color="hsl(var(--wedding-primary))" />
                  <p
                    style={{
                      fontFamily: dancingScript.style.fontFamily,
                      fontSize: "1.25rem",
                      color: "hsl(var(--wedding-text))",
                      marginTop: "0.5rem",
                    }}
                  >
                    Click to upload multiple images
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "hsl(var(--wedding-text-light))",
                    }}
                  >
                    You can select multiple files at once
                  </p>
                </div>

                <input
                  type="file"
                  ref={addImageInputRef}
                  onChange={handleNewImageUpload}
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />

                {/* Preview of selected images */}
                {newImages.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: acme.style.fontFamily,
                        fontSize: "1.125rem",
                        color: "hsl(var(--wedding-primary-dark))",
                        marginBottom: "1rem",
                      }}
                    >
                      Selected Images ({newImages.length})
                    </h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: "1rem",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "0.5rem",
                        backgroundColor: "hsl(var(--wedding-background-alt))",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {newImages.map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: "relative",
                            height: "120px",
                            borderRadius: "0.375rem",
                            overflow: "hidden",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`New image ${idx + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNewImage(idx)
                            }}
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
                              padding: 0,
                            }}
                          >
                            <X size={14} color="hsl(var(--wedding-error))" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowAddImageModal(false)
                      setNewImages([])
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "hsl(var(--wedding-background-alt))",
                      color: "hsl(var(--wedding-text))",
                      borderRadius: "0.5rem",
                      border: "none",
                      fontFamily: dancingScript.style.fontFamily,
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddImages}
                    disabled={newImages.length === 0}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: newImages.length > 0 ? "hsl(var(--wedding-primary))" : "#e5e7eb",
                      color: newImages.length > 0 ? "white" : "#9ca3af",
                      borderRadius: "0.5rem",
                      border: "none",
                      fontFamily: dancingScript.style.fontFamily,
                      fontSize: "1rem",
                      cursor: newImages.length > 0 ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Plus size={16} />
                    Add {newImages.length} Photos to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

