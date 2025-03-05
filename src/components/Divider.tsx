import Image from "next/image"

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0",
      }}
    >
      <div
        style={{
          height: "1px",
          background: "#e0c9b1",
          width: "25%",
        }}
      ></div>
      {/* <div style={{ margin: "0 1rem" }}>
        <Image src="/divider.jpeg" alt="Divider" width={60} height={30} style={{ opacity: 0.8 }} />
      </div> */}
      <div
        style={{
          height: "1px",
          background: "#e0c9b1",
          width: "25%",
        }}
      ></div>
    </div>
  )
}

export default Divider

