"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Paintbrush, Check, X, RefreshCw, Palette } from "lucide-react"

interface ThemeColors {
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  accent: string
  background: string
  text: string
  textLight: string
}

interface ThemeOption {
  name: string
  colors: ThemeColors
  preview: string
}

const predefinedThemes: ThemeOption[] = [
  {
    name: "Classic Blush",
    colors: {
      primary: "25, 30%, 60%",
      primaryLight: "25, 30%, 85%",
      primaryDark: "25, 30%, 45%",
      secondary: "25, 15%, 75%",
      accent: "25, 70%, 75%",
      background: "30, 30%, 98%",
      text: "25, 30%, 20%",
      textLight: "25, 10%, 40%",
    },
    preview: "#d4b396",
  },
  {
    name: "Sage Green",
    colors: {
      primary: "120, 15%, 50%",
      primaryLight: "120, 15%, 85%",
      primaryDark: "120, 20%, 35%",
      secondary: "120, 10%, 75%",
      accent: "120, 30%, 70%",
      background: "120, 20%, 98%",
      text: "120, 15%, 20%",
      textLight: "120, 10%, 40%",
    },
    preview: "#8fad91",
  },
  {
    name: "Dusty Blue",
    colors: {
      primary: "210, 25%, 60%",
      primaryLight: "210, 25%, 85%",
      primaryDark: "210, 30%, 45%",
      secondary: "210, 15%, 75%",
      accent: "210, 40%, 70%",
      background: "210, 30%, 98%",
      text: "210, 25%, 20%",
      textLight: "210, 15%, 40%",
    },
    preview: "#8ca3b8",
  },
  {
    name: "Lavender",
    colors: {
      primary: "270, 20%, 60%",
      primaryLight: "270, 20%, 85%",
      primaryDark: "270, 25%, 45%",
      secondary: "270, 15%, 75%",
      accent: "270, 35%, 70%",
      background: "270, 25%, 98%",
      text: "270, 20%, 20%",
      textLight: "270, 15%, 40%",
    },
    preview: "#a990c4",
  },
  {
    name: "Terracotta",
    colors: {
      primary: "20, 40%, 55%",
      primaryLight: "20, 40%, 85%",
      primaryDark: "20, 45%, 40%",
      secondary: "20, 25%, 75%",
      accent: "20, 60%, 65%",
      background: "30, 30%, 98%",
      text: "20, 40%, 20%",
      textLight: "20, 30%, 40%",
    },
    preview: "#c87f61",
  },
  {
    name: "Navy",
    colors: {
      primary: "220, 45%, 40%",
      primaryLight: "220, 45%, 85%",
      primaryDark: "220, 50%, 30%",
      secondary: "220, 25%, 70%",
      accent: "220, 60%, 55%",
      background: "220, 30%, 98%",
      text: "220, 45%, 15%",
      textLight: "220, 35%, 35%",
    },
    preview: "#3a5b8c",
  },
]

const ThemeSelector = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(predefinedThemes[0])
  const [customTheme, setCustomTheme] = useState<ThemeColors>({
    primary: "25, 30%, 60%",
    primaryLight: "25, 30%, 85%",
    primaryDark: "25, 30%, 45%",
    secondary: "25, 15%, 75%",
    accent: "25, 70%, 75%",
    background: "30, 30%, 98%",
    text: "25, 30%, 20%",
    textLight: "25, 10%, 40%",
  })
  const [isCustom, setIsCustom] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#d4b396")

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("weddingTheme")
    const savedCustom = localStorage.getItem("weddingThemeIsCustom")

    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        if (savedCustom === "true") {
          setCustomTheme(parsedTheme)
          setIsCustom(true)
          applyTheme(parsedTheme)
        } else {
          const foundTheme = predefinedThemes.find((theme) => theme.name === parsedTheme.name)
          if (foundTheme) {
            setSelectedTheme(foundTheme)
            applyTheme(foundTheme.colors)
          }
        }
      } catch (error) {
        console.error("Error parsing saved theme:", error)
      }
    }
  }, [])

  // Apply theme to CSS variables
  const applyTheme = (colors: ThemeColors) => {
    document.documentElement.style.setProperty("--wedding-primary", colors.primary)
    document.documentElement.style.setProperty("--wedding-primary-light", colors.primaryLight)
    document.documentElement.style.setProperty("--wedding-primary-dark", colors.primaryDark)
    document.documentElement.style.setProperty("--wedding-secondary", colors.secondary)
    document.documentElement.style.setProperty("--wedding-accent", colors.accent)
    document.documentElement.style.setProperty("--wedding-background", colors.background)
    document.documentElement.style.setProperty("--wedding-text", colors.text)
    document.documentElement.style.setProperty("--wedding-text-light", colors.textLight)
  }

  // Handle theme selection
  const handleSelectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme)
    setIsCustom(false)
    applyTheme(theme.colors)
    localStorage.setItem("weddingTheme", JSON.stringify(theme))
    localStorage.setItem("weddingThemeIsCustom", "false")
  }

  // Handle custom theme color change
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value
    setPrimaryColor(hexColor)

    // Convert hex to HSL
    const r = Number.parseInt(hexColor.slice(1, 3), 16) / 255
    const g = Number.parseInt(hexColor.slice(3, 5), 16) / 255
    const b = Number.parseInt(hexColor.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h = Math.round(h * 60)
    }

    s = Math.round(s * 100)
    l = Math.round(l * 100)

    // Create a custom theme based on the selected color
    const newCustomTheme: ThemeColors = {
      primary: `${h}, ${s}%, ${l}%`,
      primaryLight: `${h}, ${Math.max(s - 10, 0)}%, ${Math.min(l + 25, 95)}%`,
      primaryDark: `${h}, ${Math.min(s + 10, 100)}%, ${Math.max(l - 15, 20)}%`,
      secondary: `${h}, ${Math.max(s - 15, 0)}%, ${Math.min(l + 15, 90)}%`,
      accent: `${h}, ${Math.min(s + 20, 100)}%, ${Math.min(l + 10, 85)}%`,
      background: `${h}, ${Math.max(s - 20, 0)}%, 98%`,
      text: `${h}, ${Math.min(s + 5, 100)}%, ${Math.max(l - 40, 15)}%`,
      textLight: `${h}, ${Math.max(s - 10, 0)}%, ${Math.max(l - 20, 30)}%`,
    }

    setCustomTheme(newCustomTheme)
    setIsCustom(true)
    applyTheme(newCustomTheme)
    localStorage.setItem("weddingTheme", JSON.stringify(newCustomTheme))
    localStorage.setItem("weddingThemeIsCustom", "true")
  }

  // Reset to default theme
  const resetToDefault = () => {
    handleSelectTheme(predefinedThemes[0])
    setPrimaryColor("#d4b396")
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "6rem", // Changed from "2rem" to "6rem" to move it up
          right: "2rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          backgroundColor: "hsla(var(--wedding-primary), 0.8)",
          color: "white",
          border: "none",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "hsla(var(--wedding-primary-dark), 0.9)"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "hsla(var(--wedding-primary), 0.8)"
        }}
        title="Change theme colors"
      >
        <Paintbrush size={16} />
      </button>

      {/* Theme Selector Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              maxWidth: "500px",
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
                backgroundColor: "hsl(var(--wedding-background))",
                borderRadius: "0.75rem 0.75rem 0 0",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  color: "hsl(var(--wedding-text))",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Palette size={20} />
                Color Theme
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--wedding-text-light))",
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <h4 style={{ margin: "0 0 1rem 0", color: "hsl(var(--wedding-text))" }}>Predefined Themes</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {predefinedThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleSelectTheme(theme)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "0.75rem",
                      backgroundColor: "white",
                      border: `2px solid ${
                        !isCustom && selectedTheme.name === theme.name ? `hsl(var(--wedding-primary))` : "#e5e7eb"
                      }`,
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        backgroundColor: theme.preview,
                        marginBottom: "0.5rem",
                        position: "relative",
                      }}
                    >
                      {!isCustom && selectedTheme.name === theme.name && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "hsl(var(--wedding-text))",
                        textAlign: "center",
                      }}
                    >
                      {theme.name}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h4 style={{ margin: "0 0 1rem 0", color: "hsl(var(--wedding-text))" }}>Custom Theme</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.25rem",
                    backgroundColor: "hsl(var(--wedding-background))",
                    borderRadius: "0.5rem",
                    border: "1px solid hsl(var(--wedding-secondary))",
                  }}
                >
                  <div>
                    <label
                      htmlFor="primary-color"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        color: "hsl(var(--wedding-text))",
                        fontWeight: 500,
                      }}
                    >
                      Primary Color
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <input
                        type="color"
                        id="primary-color"
                        value={primaryColor}
                        onChange={handleCustomColorChange}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          border: "none",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: "0 0 0.5rem 0",
                            fontSize: "0.875rem",
                            color: "hsl(var(--wedding-text-light))",
                          }}
                        >
                          Choose a primary color for your wedding theme
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "hsl(var(--wedding-primary))",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "hsl(var(--wedding-primary-light))",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "hsl(var(--wedding-primary-dark))",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "hsl(var(--wedding-accent))",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={resetToDefault}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={16} />
                  Reset to Default
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "hsl(var(--wedding-primary))",
                    color: "white",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ThemeSelector

