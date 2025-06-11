import { useState } from "react";

export default function SkeletonAvatar({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  const isRelative = src && !src.startsWith("http");
  const fullSrc = isRelative ? `${window.location.origin}${src}` : src;

  return (
    <div className="aspect-square w-full rounded-xl border-white border-2 overflow-hidden bg-white/30 flex items-center duration-300 hover:scale-107 justify-center">
      {!loaded && (
      <div className="w-6 h-6 ml-2 border-4 border-white border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin" />

      )}
      <img
        src={fullSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
