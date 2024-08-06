// CarouselImage.js
import React from "react";

export default function CarouselImage({ image }) {
  return (
    <div
      style={{
        height: "400px",
        backgroundColor: "#ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {image && (
        <img
          src={image}
          alt="Banner Image"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 2,
        }}
      ></div>
    </div>
  );
}
