"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Edit2, Check, X } from 'lucide-react'

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
    
    // Special validation for date fields
    if (placeholder === "YYYY.MM.DD" && text !== initialText) {
      // Validate date format
      const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
      if (!datePattern.test(text)) {
        setText(initialText);
        return;
      }
      
      // Parse date components
      const [year, month, day] = text.split(".").map(Number);
      
      // Validate month (1-12)
      if (month < 1 || month > 12) {
        setText(initialText);
        return;
      }
      
      // Validate day based on month
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
        setText(initialText);
        return;
      }
    }
    
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

    // Special handling for date fields
    if (placeholder === "YYYY.MM.DD") {
      // Only allow numbers and dots in the correct format
      const datePattern = /^\d{0,4}(\.\d{0,2}){0,2}$/;
      if (!datePattern.test(newText)) {
        return;
      }
      
      // If we're adding a digit after 4 digits and there's no dot, add a dot
      if (text.length === 4 && newText.length === 5 && !newText.includes('.')) {
        setText(text + '.');
        return;
      }
      
      // If we're adding a digit after 7 characters (YYYY.MM) and there's only one dot, add another dot
      if (text.length === 7 && newText.length === 8 && text.split('.').length === 2 && newText.split('.').length === 2) {
        setText(text + '.');
        return;
      }
    }

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

    // Special handling for date fields
    if (placeholder === "YYYY.MM.DD") {
      // Only allow numbers, dots, and control keys
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        return;
      }

      // Prevent more than 10 characters (YYYY.MM.DD)
      if (text.length >= 10 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
        return;
      }

      // Auto-add dots after year and month
      if (text.length === 4 && e.key !== '.' && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        setText(text + '.');
      } else if (text.length === 7 && e.key !== '.' && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        setText(text + '.');
      }

      // Validate month input (prevent values > 12)
      if (text.length === 5 && e.key > '1') {
        e.preventDefault();
        return;
      }
      if (text.length === 6 && text[5] === '1' && e.key > '2') {
        e.preventDefault();
        return;
      }

      // Validate day input (prevent values > 31)
      if (text.length === 8 && e.key > '3') {
        e.preventDefault();
        return;
      }
      if (text.length === 9 && text[8] === '3' && e.key > '1') {
        e.preventDefault();
        return;
      }
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
