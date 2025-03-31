'use client';
import { useEffect, useState } from "react";
import "./App.css"; 
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import timelineElements from "./timelineElements"; 
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isGroup1, setIsGroup1] = useState(true);
  const [direction, setDirection] = useState("typing");
  const [charIndex, setCharIndex] = useState(0);
  const router = useRouter();
  const group1Texts = [
    "Welcome to Khushipaglu.",
    "ft. चार दिन आया ladka",
  ];

  const group2Texts = [
    "Hey Khushi...",
    "You probably know what is this for...",
    "I want this to be a memorable day of ours...",
    "Scroll down lady, there's a lot more :p",
  ];

  useEffect(() => {
    const texts = isGroup1 ? group1Texts : group2Texts;
    let currentTextContent = texts[textIndex];

    const typingSpeed = isGroup1 ? 100 : 55;

    const typeBackspaceEffect = setInterval(() => {
      if (direction === "typing") {
        if (charIndex < currentTextContent.length) {
          setCurrentText((prev) => prev + currentTextContent[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setDirection("backspace");
        }
      } else if (direction === "backspace") {
        if (charIndex > 0) {
          setCurrentText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          clearInterval(typeBackspaceEffect);
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
            if (textIndex + 1 === texts.length) {
              setIsGroup1((prev) => !prev);
            }
            setDirection("typing");
          }, 1000);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeBackspaceEffect);
  }, [textIndex, isGroup1, direction, charIndex]);

  return (
    <div className="main-container">
      <div className="intro-container">
        <h1 className={isGroup1 ? "group1-text" : "group2-text"}>
          {currentText}<span className="cursor">|</span>
        </h1>
      </div>

      {/* Columns Section with Images */}
      <div className="columns-container">
        <div className="left-column">
          <h2 className="roboto">Why you should date me</h2>
          <img src="/sr.jpg" alt="Image1" className="column-image" />
          <p className="source-code-pro">Because I'm in love with you</p>
        </div>
        <div className="right-column">
          <h2 className="roboto">Why you're perfect for me</h2>
          <img src="k.jpg" alt="Image2" className="column-image" />
          <p className="source-code-pro">Because you exist</p>
        </div>
      </div>

      <div className="journey-container">
        <h2 className="journey-heading">Our Journey🤍</h2>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
      <VerticalTimeline>
  {timelineElements.map((element) => {
    let showButton =
      element.buttonText !== undefined &&
      element.buttonText !== null &&
      element.buttonText !== "";

    return (
      <VerticalTimelineElement
  key={element.id}  // Use element.id as the key here
  date={element.date}
  dateClassName="date"
>
  <h3 className="vertical-timeline-element-title">{element.title}</h3>
  <h5 className="vertical-timeline-element-subtitle">{element.location}</h5>
  <p id="description">{element.description}</p>
  <img src={element.image} alt={element.title} className="timeline-image" />
  {showButton && (
    <a className="button" href="/">
      {element.buttonText}
    </a>
  )}
</VerticalTimelineElement>
    );
  })}
</VerticalTimeline>
      </div>
      <div className="yesno-container">
        <h2 className="yesno">So,will you be my girlfriend?</h2>
        <div className="button-container">
        <button className="yes-button" onClick={() => router.push("/letter")}>YES</button>
        <button
  className="no-button"
  onMouseEnter={() => {
    const randomX = Math.floor(Math.random() * 300) - 150; // Moves between -150px to +150px
    const randomY = Math.floor(Math.random() * 300) - 150;
    document.documentElement.style.setProperty("--random-x", `${randomX}px`);
    document.documentElement.style.setProperty("--random-y", `${randomY}px`);
  }}
  onClick={() => {
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    document.documentElement.style.setProperty("--random-x", `${randomX}px`);
    document.documentElement.style.setProperty("--random-y", `${randomY}px`);
  }}
>
  NO
</button>
</div>

      </div>

      <style jsx>{`
        /* General Container */
        .main-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        /* Timeline Container */
.timeline-container {
  width: 100%;
  margin-top: 40px;
}

/* Equal size timeline boxes */
.vertical-timeline-element-content {
  min-height: 250px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Ensuring images scale dynamically */
.timeline-image {
  width: 100%; /* Full width */
  max-width: 400px; /* Limit max width */
  height: auto; /* Maintain aspect ratio */
  max-height: 150px; /* Prevent excessive stretching */
  border-radius: 8px;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

/* Image hover effect */
.timeline-image:hover {
  transform: scale(1.1);
}

        /* Timeline Container */
        .timeline-container {
          width: 950px;
          margin-top: 40px;
        }

        /* Styling for intro-container */
        .intro-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          position: relative;
          flex-direction: column;
          font-size: 45px;
        }

        .group1-text {
          font-family: 'Roboto', sans-serif;
          font-size: 80px;
          color: white;
        }

        .group2-text {
          font-family: 'Source Code Pro', monospace;
          font-size: 45px;
          color: white;
        }

        .cursor {
          font-weight: 100;
          font-size: 1.2em;
          color: white;
          animation: blink 0.7s step-end infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
          

        /* Columns Section */
        .columns-container {
          display: flex;
          justify-content: space-between;
          padding: 50px;
        
          gap: 50px;
        }

        .left-column,
        .right-column {
          flex: 1;
          padding: 20px;
          border: 4px solid white;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.1);
          width : 400px;
          color: white;
        }

        .left-column h2,
        .right-column h2 {
          font-family: 'Roboto', sans-serif;
          font-size: 30px;
          margin-bottom: 10px;
          margin-top : -10px;
        }

        .left-column p,
        .right-column p {
          font-family: 'Source Code Pro', monospace;
          font-size: 25px;
          margin-bottom : -10px;
          margin-top : 10px;
        }

        .column-image {
          width: 80%;
          height: auto;
          max-width: 380px;
          border-radius: 8px;
          object-fit: cover;
        }

        .journey-container {
          margin-top: -30px;
          text-align: center;
        }
        .yesno{
          font-size : 60px;
          color : white;
        }
        .journey-heading {
          font-family: 'Roboto', sans-serif;
          font-size: 60px;
          color: white;
        }
          .button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.yes-button, .no-button {
  font-size: 24px;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.yes-button, .no-button {
  font-size: 24px;
  width : 300px;
  padding: 10px 30px;
  border: 2px solid white; /* White border */
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(255, 192, 203, 0.2); /* Light pink transparent background */
  color: white; /* White text */
}

.yes-button:hover, .no-button:hover {
  background-color: rgba(255, 192, 203, 0.4); /* Slightly darker pink on hover */
}

.no-button {
  position: relative;
  transition: transform 0.2s ease-in-out;
}

.no-button:hover {
  transform: translate(var(--random-x, 0px), var(--random-y, 0px));
}

      `}</style>
    </div>
  );
}

