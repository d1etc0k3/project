'use client';
import { useEffect, useRef } from 'react';

export default function MediaPage() {
  const audioRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!audioRef.current) {
      audioRef.current = new Audio('/hehe.mp3');
      audioRef.current.loop = true;
    }

    const attemptPlay = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Autoplay prevented:', error);
      }
    };

    attemptPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(0, 0, 0, 0.8)' // Optional: Adds a slight dark overlay
    }}>
      
      {/* Main Container for Text & Image */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
      }}>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '48px',
          color: 'white',
          marginBottom: '20px'
        }}>
          I Love You ❤️
        </h1>

        {/* Image */}
        <img 
          src="/cook.jpg" 
          alt="Display Image"
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />
      </div>

    </div>
  );
}
