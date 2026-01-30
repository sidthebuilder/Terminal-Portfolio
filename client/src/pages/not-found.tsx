import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="border border-primary p-8 max-w-md w-full text-center relative bg-black/90 z-20">
        <div className="scanlines" />
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500 animate-pulse" />
        
        <h1 className="text-4xl font-bold mb-4 text-red-500 tracking-wider">
          FATAL ERROR 404
        </h1>
        
        <p className="mb-8 font-mono text-lg">
          The requested memory sector could not be located.
          Data may be corrupted or missing.
        </p>

        <Link href="/" className="inline-block border border-primary px-6 py-3 hover:bg-primary hover:text-black font-bold transition-colors uppercase">
          Reboot System
        </Link>
      </div>
    </div>
  );
}
