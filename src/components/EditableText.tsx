"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface EditableTextProps {
  initialText: string
  className?: string
  onSave?: (text: string) => void
  min500?: boolean
  maxHeight1rem?: boolean
}

const EditableText: React.FC<EditableTextProps> = ({ initialText, className, onSave, min500, maxHeight1rem }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [isEditing])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (onSave) {
      onSave(text)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = e.target.scrollHeight + "px"
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
    }
  }

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={className}
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          overflow: "hidden",
          minHeight: "1em",
          maxHeight: maxHeight1rem ? "1rem" : "none",
          minWidth: min500 ? "500px" : "400px",
          maxWidth: "400px",
          lineHeight: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          textAlign: "inherit",
          color: "inherit",
          whiteSpace: "pre-wrap",
        }}
      />
    )
  }

  return (
    <span
      onClick={handleClick}
      className={className}
      style={{
        cursor: "text",
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </span>
  )
}

export default EditableText

