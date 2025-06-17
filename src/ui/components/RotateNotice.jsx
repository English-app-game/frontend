import { useEffect, useState } from "react";

export default function RotateNotice() {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);

      if (!portrait) {
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isPortrait) return null;

  return (
    <div
      className={`
    fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md backdrop-saturate-150 
    border border-white/10 shadow-inner
    flex flex-col items-center justify-center text-white text-center px-4
    transition-all duration-500 ease-in-out
    ${
      isPortrait
        ? "opacity-100 scale-100"
        : "opacity-0 scale-90 pointer-events-none"
    }
  `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-28 h-28"
      >
        <circle cx="4" cy="12" r="1" fill="white" />
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-20 h-20 text-white"
      >
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7l3 3" />
      </svg>
      <p className="text-xl font-bold">
        Rotate your device for a better gaming experience
      </p>
    </div>
  );
}
