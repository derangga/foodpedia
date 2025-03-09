"use client";
export const ImageHeader = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={`${className || ""}`} />;
};
