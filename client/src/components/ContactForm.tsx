import { useState } from "react";
import { useContact } from "@/hooks/use-terminal-data";
import { motion } from "framer-motion";

interface ContactFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function ContactForm({ onComplete, onCancel }: ContactFormProps) {
  const [step, setStep] = useState<"name" | "email" | "message">("name");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  
  const createMessage = useContact();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const val = (e.currentTarget as HTMLInputElement).value;
      
      if (!val.trim()) {
        setError("Field cannot be empty.");
        return;
      }
      setError(null);

      if (step === "name") {
        setFormData(prev => ({ ...prev, name: val }));
        setStep("email");
      } else if (step === "email") {
        if (!val.includes("@")) {
          setError("Invalid email format.");
          return;
        }
        setFormData(prev => ({ ...prev, email: val }));
        setStep("message");
      } else if (step === "message") {
        // Submit
        const finalData = { ...formData, message: val };
        setFormData(finalData); // optimistic
        
        try {
          await createMessage.mutateAsync(finalData);
          onComplete();
        } catch (err: any) {
          setError(err.message || "Failed to transmit message.");
        }
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-primary/40 p-6 my-4 bg-primary/5 max-w-2xl relative"
    >
      <div className="absolute top-0 left-0 px-2 py-1 text-xs bg-primary text-black font-bold">
        SECURE TRANSMISSION LINK
      </div>
      
      <div className="mt-4 space-y-4 font-mono">
        {formData.name && (
          <div className="flex gap-4 opacity-50">
            <span className="w-20">NAME:</span>
            <span>{formData.name}</span>
          </div>
        )}
        
        {formData.email && (
          <div className="flex gap-4 opacity-50">
            <span className="w-20">EMAIL:</span>
            <span>{formData.email}</span>
          </div>
        )}

        <div className="flex gap-4 items-baseline">
          <span className="w-20 text-primary font-bold">
            {step.toUpperCase()}:
          </span>
          <div className="flex-1">
             {step === "message" ? (
               <textarea
                 className="w-full bg-transparent border-b border-primary/50 outline-none text-primary resize-none h-20 focus:border-primary transition-colors"
                 placeholder="Type your message (Enter to send)..."
                 autoFocus
                 onKeyDown={handleKeyDown}
               />
             ) : (
               <input
                 className="w-full bg-transparent border-b border-primary/50 outline-none text-primary focus:border-primary transition-colors"
                 placeholder="Type and press Enter..."
                 autoFocus
                 onKeyDown={handleKeyDown}
               />
             )}
             {error && (
               <div className="text-red-500 text-sm mt-1 animate-pulse">
                 [ERROR] {error}
               </div>
             )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs opacity-50 flex justify-between">
        <span>[ESC] CANCEL TRANSMISSION</span>
        {createMessage.isPending && <span className="animate-pulse">TRANSMITTING...</span>}
      </div>
    </motion.div>
  );
}
