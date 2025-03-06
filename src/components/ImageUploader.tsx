"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  initialImage?: string
  onImageChange: (imageData: string) => void
  aspectRatio?: number
  maxSize?: number // in MB
  className?: string
  height?: number
  width?: number
  placeholder?: string
}

export default function ImageUploader({
  initialImage,
  onImageChange,
  aspectRatio = 1,
  maxSize = 5,
  className = "",
  height = 200,
  width = 200,
  placeholder = "Upload an image",
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | undefined>(initialImage)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    // Reset error
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      setImage(imageData)
      onImageChange(imageData)

      // Check image dimensions
      const img = document.createElement('img')
      img.onload = () => {
        const imgAspectRatio = img.width / img.height
        if (Math.abs(imgAspectRatio - aspectRatio) > 0.2) {
          setError(`Image aspect ratio should be close to ${aspectRatio}:1`)
        }
      }
      img.src = imageData
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file)
    } else {
      setError("Please drop an image file")
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setImage(undefined)
    onImageChange("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className}>
      <div
        style={{
          position: "relative",
          height: `${height}px`,
          width: `${width}px`,
          borderRadius: "0.5rem",
          overflow: "hidden",
          border: isDragging
            ? "2px dashed #d4b396"
            : error
              ? "2px dashed #ef4444"
              : image
                ? "2px solid #d4b396"
                : "2px dashed #e0c9b1",
          backgroundColor: isDragging ? "rgba(212, 179, 150, 0.1)" : "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <>
            <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill style={{ objectFit: "cover" }} />
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                backgroundColor: "#f8e8d8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8b6e5c",
              }}
            >
              {isDragging ? <Upload size={24} /> : <ImageIcon size={24} />}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              {isDragging ? "Drop image here" : placeholder}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}
            >
              Click or drag & drop
            </p>
          </div>
        )}
      </div>

      {error && (
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "0.75rem",
            color: "#ef4444",
          }}
        >
          {error}
        </p>
      )}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
    </div>
  )
}

