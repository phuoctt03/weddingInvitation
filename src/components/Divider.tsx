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
          background: "hsl(var(--wedding-secondary))",
          width: "25%",
        }}
      ></div>
      <div
        style={{
          height: "1px",
          background: "hsl(var(--wedding-secondary))",
          width: "25%",
        }}
      ></div>
    </div>
  )
}

export default Divider

