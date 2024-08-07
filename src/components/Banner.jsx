import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";
import firstImage from "../assets/Banner-1.jpg";
import secondImage from "../assets/Banner-2.jpg";
import thirdImage from "../assets/Banner-3.jpg";
import "../styles/Banner.css"

export default function Banner() {
  const styles = {
    heading: {
      color: "#ffffff",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", 
      fontSize: "2rem",
    },
    description: {
      color: "#e0e0e0",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
      fontSize: "1.25rem",
    },
  };
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <CarouselImage image={firstImage} />
        <Carousel.Caption style={{ zIndex: 3 }}>
          <h3 style={styles.heading}>Professionalism</h3>
          <p style={styles.description}>
            Striving to maintain the highest standards in every project
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <CarouselImage image={secondImage} />
        <Carousel.Caption style={{ zIndex: 3 }}>
          <h3 style={styles.heading}>Expertise</h3>
          <p style={styles.description}>
            In search of deep knowledge and skills to deliver top-notch results
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image={thirdImage} />
        <Carousel.Caption style={{ zIndex: 3 }}>
          <h3 style={styles.heading}>Trust</h3>
          <p style={styles.description}>
            Building long-lasting relationships based on trust and reliability.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
