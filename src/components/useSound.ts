import { useRef } from "react";

export function useSound() {
  const soundRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const playSound = (key: string, src: string) => {
    if (!soundRefs.current[key]) {
      const audio = new Audio(src);
      soundRefs.current[key] = audio;
    }
    const audio = soundRefs.current[key]!;
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio play failed:", err));
  };

  return { playSound };
}
