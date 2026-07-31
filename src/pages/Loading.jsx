import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import loadingVideo from "../assets/videos/loading.mp4";

function Loading() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Play video
    videoRef.current?.play().catch((err) => {
      console.error("Video Play Error:", err);
    });

    // Navigate after 4 seconds
    const timer = setTimeout(() => {
      navigate("/character-select");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={loadingVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Center Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">

        <h1
          className="
            text-5xl
            md:text-6xl
            font-black
            tracking-[8px]
            text-white
            drop-shadow-2xl
          "
        >
          
        </h1>

        <p
          className="
            mt-4
            text-lg
            tracking-[6px]
            uppercase
            text-white/80
          "
        >
          
        </p>

      </div>

    </div>
  );
}

export default Loading;