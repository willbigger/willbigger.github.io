import React from "react";
import { useState, useEffect } from "react";

// FAQ Page
// Stackoverflow? https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

function FAQ() {
  const { height, width } = useWindowDimensions();

  return (
    <div class="d-flex flex-column min-vh-100 align-items-center">
        <h2 style={{ textAlign: "center" }}>FAQ</h2>
        <br></br>
        <p>
        <iframe width={width * 0.75} height={height * 0.5} src="https://docs.google.com/document/d/e/2PACX-1vQDFSfM5oO93U8sjhB8FNZmilbo7JAuvYqXzhBPruPNbwx_gWwi1V7HzwT6995Htw7XMAwJZwFt8bag/pub?embedded=true"></iframe>
        </p>
    </div>
  );
}


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default FAQ;