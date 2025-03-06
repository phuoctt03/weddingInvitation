"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Edit2, Check, X } from "lucide-react"

interface EditableTextProps {
  initialText: string
  className?: string
  onSave?: (text: string) => void
  maxHeight1rem?: boolean
  placeholder?: string
  multiline?: boolean
  maxLength?: number
  textAlign?: "left" | "center" | "right"
  width?: string
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  className,
  onSave,
  maxHeight1rem,
  placeholder = "Click to edit text",
  multiline = true,
  maxLength = 500,
  textAlign = "center",
  width = "100%",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const [isHovering, setIsHovering] = useState(false)
  const [charCount, setCharCount] = useState(initialText.length)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [computedStyles, setComputedStyles] = useState<{
    fontSize?: string
    fontFamily?: string
    lineHeight?: string
    fontWeight?: string
    color?: string
  }>({})

  // Capture original text styles before editing
  useEffect(() => {
    if (containerRef.current) {
      const styles = window.getComputedStyle(containerRef.current)
      setComputedStyles({
        fontSize: styles.fontSize,
        fontFamily: styles.fontFamily,
        lineHeight: styles.lineHeight,
        fontWeight: styles.fontWeight,
        color: styles.color,
      })
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"

      // Position cursor at the end of text
      textareaRef.current.selectionStart = textareaRef.current.value.length
      textareaRef.current.selectionEnd = textareaRef.current.value.length
    }
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && isEditing) {
        handleSave()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditing) {
        handleCancel()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isEditing, text])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    if (onSave && text !== initialText) {
      onSave(text)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setText(initialText)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (maxLength && newText.length > maxLength) return

    setText(newText)
    setCharCount(newText.length)

    if (multiline) {
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !multiline) {
      e.preventDefault()
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          display: "block", // Changed from inline-block
          width: "100%", // Always use full width
          maxWidth: "100%",
        }}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={className}
          placeholder={placeholder}
          style={{
            width: "100%",
            minWidth: "100%", // Added to ensure full width
            backgroundColor: "hsla(var(--wedding-background), 0.1)",
            border: "1px solid hsla(var(--wedding-secondary), 0.5)",
            outline: "none",
            resize: "none",
            overflow: "hidden",
            minHeight: "1em",
            maxHeight: maxHeight1rem ? "1rem" : "none",
            padding: "0.5rem",
            margin: "0", // Added to remove any default margins
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            backdropFilter: "blur(2px)",
            fontSize: computedStyles.fontSize,
            fontFamily: computedStyles.fontFamily,
            lineHeight: computedStyles.lineHeight,
            fontWeight: computedStyles.fontWeight,
            color: computedStyles.color,
            textAlign,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Changed from space-between
            marginTop: "0.5rem",
            position: "absolute",
            bottom: "-2.5rem",
            right: 0, // Align to right
            zIndex: 10,
            gap: "0.5rem", // Added for spacing between elements
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: charCount >= maxLength ? "hsl(var(--wedding-error))" : "hsla(var(--wedding-primary), 0.8)",
              marginRight: "1rem", // Added spacing
            }}
          >
            {charCount}/{maxLength}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleCancel}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "50%",
                backgroundColor: "hsla(var(--wedding-background), 0.9)",
                border: "none",
                cursor: "pointer",
                color: "hsl(var(--wedding-text))",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              title="Cancel"
            >
              <X size={14} />
            </button>

            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "50%",
                backgroundColor: "hsl(var(--wedding-primary))",
                border: "none",
                cursor: "pointer",
                color: "hsl(var(--wedding-primary-foreground))",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              title="Save"
            >
              <Check size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
      style={{
        cursor: "pointer",
        whiteSpace: "pre-wrap",
        display: "block", // Changed from inline-block
        position: "relative",
        width: "100%", // Always use full width
        padding: "2px",
        borderRadius: "2px",
        transition: "background-color 0.2s",
        backgroundColor: isHovering ? "hsla(var(--wedding-primary), 0.1)" : "transparent",
        border: isHovering ? "1px dashed hsla(var(--wedding-primary), 0.5)" : "1px solid transparent",
        textAlign,
      }}
      title="Click to edit"
    >
      {text || placeholder}

      {isHovering && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "hsl(var(--wedding-primary))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Edit2 size={12} color="white" />
        </div>
      )}
    </div>
  )
}

export default EditableText

