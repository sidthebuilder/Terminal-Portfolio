import { Monitor, Cpu, Mail, Terminal, FileText } from "lucide-react";

interface QuickActionsProps {
  onAction: (cmd: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    { label: "ABOUT", cmd: "about", icon: Monitor },
    { label: "PROJECTS", cmd: "projects", icon: FileText },
    { label: "SKILLS", cmd: "skills", icon: Cpu },
    { label: "CONTACT", cmd: "contact", icon: Mail },
    { label: "THEME", cmd: "theme", icon: Terminal },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-primary/30 bg-black/90 backdrop-blur-sm z-40">
      <div className="max-w-4xl mx-auto flex gap-2 md:gap-4 justify-center flex-wrap">
        {actions.map((action) => (
          <button
            key={action.cmd}
            onClick={() => onAction(action.cmd)}
            className="
              flex items-center gap-2 px-3 py-2 md:px-4 md:py-2
              border border-primary/50 text-primary text-xs md:text-sm font-bold
              hover:bg-primary hover:text-black transition-all duration-200
              active:scale-95 shadow-[0_0_10px_rgba(0,255,0,0.1)]
              hover:shadow-[0_0_15px_rgba(0,255,0,0.4)]
            "
          >
            <action.icon size={14} className="stroke-[2.5px]" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
