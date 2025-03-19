"use client";

export type ImageClientProps = {
  src: string;
  alt?: string;
  className?: string;
};
export const ImageClient = (props: ImageClientProps) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={`${props.className || ""}`}
    />
  );
};
