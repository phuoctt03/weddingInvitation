import { Cormorant_Garamond, Dancing_Script } from "next/font/google"
import Image from "next/image"
import { Building, Car, Plane } from "lucide-react"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

const AccommodationSection = () => {
  const accommodations = [
    {
      name: "Luxury Hotel",
      icon: <Building style={{ width: "1.5rem", height: "1.5rem" }} />,
      description: "Special rates available for wedding guests. Mention 'Daisuke & Rinka Wedding' when booking.",
      address: "456 Celebration Avenue, Festivity Town",
      phone: "+1 (555) 123-4567",
      website: "https://www.luxuryhotel.com",
    },
    {
      name: "Cozy Inn",
      icon: <Building style={{ width: "1.5rem", height: "1.5rem" }} />,
      description: "Charming boutique hotel within walking distance to the venue.",
      address: "789 Comfort Street, Festivity Town",
      phone: "+1 (555) 987-6543",
      website: "https://www.cozyinn.com",
    },
  ]

  const transportation = [
    {
      type: "Airport",
      icon: <Plane style={{ width: "1.5rem", height: "1.5rem" }} />,
      description: "The nearest airport is International Airport (INT), approximately 30 minutes from the venue.",
    },
    {
      type: "Transportation",
      icon: <Car style={{ width: "1.5rem", height: "1.5rem" }} />,
      description: "We've arranged for a shuttle service between the recommended hotels and the venue.",
    },
  ]

  return (
    <section style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        {/* <Image
          src="/accommodation.png"
          alt="Accommodation"
          width={320}
          height={200}
          style={{ margin: "0 auto 1rem auto" }}
        /> */}
        <h2
          style={{
            fontFamily: dancingScript.style.fontFamily,
            fontSize: "2.25rem",
            color: "#8b6e5c",
            marginBottom: "0.5rem",
          }}
        >
          Accommodation & Travel
        </h2>
        <p
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.125rem",
            color: "#4b5563",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          For our out-of-town guests, we've arranged special rates at these nearby hotels.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Where to Stay
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {accommodations.map((accommodation, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0c9b1",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "9999px",
                    backgroundColor: "#f8e8d8",
                    color: "#8b6e5c",
                    marginRight: "0.75rem",
                  }}
                >
                  {accommodation.icon}
                </div>
                <h4
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#1f2937",
                  }}
                >
                  {accommodation.name}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  color: "#4b5563",
                  marginBottom: "1rem",
                }}
              >
                {accommodation.description}
              </p>
              <div
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                <p style={{ marginBottom: "0.25rem" }}>{accommodation.address}</p>
                <p style={{ marginBottom: "0.25rem" }}>{accommodation.phone}</p>
                <a
                  href={accommodation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#8b6e5c",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          style={{
            fontFamily: cormorant.style.fontFamily,
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Travel Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {transportation.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0c9b1",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "9999px",
                    backgroundColor: "#f8e8d8",
                    color: "#8b6e5c",
                    marginRight: "0.75rem",
                  }}
                >
                  {item.icon}
                </div>
                <h4
                  style={{
                    fontFamily: cormorant.style.fontFamily,
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#1f2937",
                  }}
                >
                  {item.type}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: cormorant.style.fontFamily,
                  color: "#4b5563",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AccommodationSection

