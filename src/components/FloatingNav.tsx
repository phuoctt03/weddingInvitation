"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Lock } from 'lucide-react'

interface NavSection {
  id: string
  label: string
}

interface FloatingNavProps {
  sections: NavSection[]
  isAdmin?: boolean
  setShowGlobalAdminLogin?: () => void // This function now handles both showing login and logging out
}

const FloatingNav: React.FC<FloatingNavProps> = ({ sections, isAdmin, setShowGlobalAdminLogin }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "#f8e8d8",
              color: "#8b6e5c",
              padding: "0.75rem",
              borderRadius: "9999px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0c9b1")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f8e8d8")}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "3.5rem",
                  right: 0,
                  background: "white",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  width: "12rem",
                }}
              >
                <div style={{ padding: "0.5rem 0" }}>
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.5rem 1rem",
                        color: "#4b5563",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8e8d8")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {section.label}
                    </button>
                  ))}

                  {/* Admin Login Button */}
                  <div style={{ borderTop: "1px solid #e0c9b1", margin: "0.5rem 0" }}></div>
                  <button
                    onClick={() => {
                      if (setShowGlobalAdminLogin) {
                        if (isAdmin) {
                          // If already in admin mode, clicking will log out
                          if (window.confirm("Are you sure you want to log out of admin mode?")) {
                            // We need to call a logout function passed from the parent
                            setShowGlobalAdminLogin(); // This will trigger logout in parent
                          }
                        } else {
                          // If not in admin mode, show login modal
                          setShowGlobalAdminLogin();
                          setIsOpen(false);
                        }
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.5rem 1rem",
                      color: isAdmin ? "#d4b396" : "#4b5563",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      fontWeight: isAdmin ? 600 : 400,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8e8d8")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <Lock size={14} style={{ marginRight: "0.5rem" }} />
                    {isAdmin ? "Logout Admin Mode" : "Admin Login"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingNav
