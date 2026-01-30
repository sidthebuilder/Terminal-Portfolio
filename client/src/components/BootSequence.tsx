import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const bootText = [
      "BIOS Date 01/15/99 14:23:51 Ver: 08.00.12",
      "CPU: Intel(R) Pentium(R) III CPU 500MHz",
      "Memory Test: 640K OK",
      "",
      "Detecting Primary Master ... Quantum Fireball CR 8.4A",
      "Detecting Primary Slave  ... None",
      "Detecting Secondary Master ... CD-ROM Drive",
      "",
      "Booting from C:...",
      "Loading KERNEL.SYS...",
      "Initializing Video Adapter...",
      "Setting Resolution 800x600...",
      "",
      "SYSTEM READY."
    ];

    let delay = 0;
    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
        
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="font-mono text-sm md:text-base leading-relaxed p-4 md:p-8 h-screen w-full flex flex-col justify-end pb-20">
      {lines.map((line, i) => (
        <div key={i}>{line || "\u00A0"}</div>
      ))}
      <div className="cursor-blink mt-2">_</div>
    </div>
  );
}
