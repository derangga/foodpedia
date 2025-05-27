"use client";

import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import DOMPurify from "isomorphic-dompurify";

interface TypingMarkdownMessageProps {
  content: string;
  messageId: string;
  onComplete?: () => void;
}
const TypingMarkdownMessage: React.FC<TypingMarkdownMessageProps> = ({
  content,
  messageId,
  onComplete,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    // Clean up previous instance
    if (typedInstanceRef.current) {
      typedInstanceRef.current.destroy();
    }

    // Create typing animation
    typedInstanceRef.current = new Typed(elementRef.current, {
      strings: [content],
      typeSpeed: 20,
      showCursor: true,
      cursorChar: "|",
      onComplete: async () => {
        setIsTypingComplete(true);

        // Convert markdown to HTML after typing is complete
        try {
          const html = await marked.parse(content);
          const sanitized = DOMPurify.sanitize(html);

          if (elementRef.current) {
            // Smoothly transition from typed text to rendered markdown
            elementRef.current.style.opacity = "0";

            setTimeout(() => {
              if (elementRef.current) {
                elementRef.current.innerHTML = sanitized;
                elementRef.current.style.opacity = "1";
                elementRef.current.classList.add(
                  "prose",
                  "prose-sm",
                  "max-w-none"
                );
              }
              onComplete?.();
            }, 200);
          }
        } catch (error) {
          console.error("Error parsing markdown:", error);
          onComplete?.();
        }
      },
    });

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, [content, messageId, onComplete]);

  return (
    <div
      ref={elementRef}
      className="transition-opacity duration-200"
      style={{
        minHeight: "20px",
        whiteSpace: "pre-wrap",
        fontFamily: isTypingComplete ? "inherit" : "monospace",
      }}
    />
  );
};

export default TypingMarkdownMessage;
