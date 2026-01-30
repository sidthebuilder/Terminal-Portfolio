import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

interface CommandInputProps {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
  history: string[];
}

export function CommandInput({ onCommand, disabled, history }: CommandInputProps) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 means current buffer (not in history)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep focus on input unless user selects text elsewhere
    const handleKey = () => inputRef.current?.focus();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!value.trim()) return;
      onCommand(value);
      setValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      
      const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      if (nextIndex !== historyIndex) {
        setHistoryIndex(nextIndex);
        // History is stored oldest -> newest. But ArrowUp should go Newest -> Oldest visually.
        // Wait, standard terminal: Up Arrow = Previous command (most recent).
        // Let's assume 'history' prop is passed as [oldest, ..., newest]
        // So accessing it from the end:
        setValue(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return; // Already at bottom
      
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      
      if (nextIndex === -1) {
        setValue("");
      } else {
        setValue(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const commands = ["help", "about", "projects", "skills", "contact", "clear", "theme"];
      const match = commands.find(c => c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    <div className="flex items-center w-full mt-2 group">
      <span className="text-primary mr-2 flex items-center shrink-0">
        visitor@portfolio:~$
      </span>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none text-primary font-mono caret-transparent p-0 m-0 uppercase"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
        {/* Custom cursor implementation to ensure it blinks properly */}
        <span 
          className="absolute pointer-events-none text-primary"
          style={{ 
            left: `${value.length}ch`, 
            top: 0 
          }}
        >
          <span className="cursor-blink"> </span>
        </span>
      </div>
    </div>
  );
}
