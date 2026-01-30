import { useState, useRef, useEffect } from "react";
import { useProjects, useSkills } from "@/hooks/use-terminal-data";
import { TerminalOutput } from "@/components/TerminalOutput";
import { CommandInput } from "@/components/CommandInput";
import { BootSequence } from "@/components/BootSequence";
import { QuickActions } from "@/components/QuickActions";
import { ContactForm } from "@/components/ContactForm";

type HistoryItem = {
  id: string;
  type: 'command' | 'output';
  content?: string;
  dataType?: 'text' | 'error' | 'success' | 'projects' | 'skills' | 'help' | 'about';
  data?: any;
};

export default function TerminalPage() {
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [formMode, setFormMode] = useState(false);
  const [theme, setTheme] = useState<'green' | 'amber' | 'cyber'>('green');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Data hooks
  const { data: projects, refetch: refetchProjects } = useProjects();
  const { data: skills, refetch: refetchSkills } = useSkills();

  // Scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, formMode]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => [...prev, item]);
  };

  const handleThemeChange = () => {
    const themes: ('green' | 'amber' | 'cyber')[] = ['green', 'amber', 'cyber'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    
    // Apply theme class to body
    document.body.className = '';
    if (nextTheme !== 'green') {
      document.body.classList.add(`theme-${nextTheme}`);
    }
    
    return nextTheme;
  };

  const handleCommand = async (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    
    // Add command to display
    addToHistory({
      id: Date.now().toString(),
      type: 'command',
      content: cmdRaw
    });

    // Add to input history
    setCommandHistory(prev => [...prev, cmdRaw]); // oldest -> newest logic for this stack

    switch(cmd) {
      case 'help':
        addToHistory({ id: Date.now() + 'o', type: 'output', dataType: 'help' });
        break;
        
      case 'clear':
        setHistory([]);
        break;
        
      case 'about':
        addToHistory({ id: Date.now() + 'o', type: 'output', dataType: 'about' });
        break;
        
      case 'projects':
        await refetchProjects();
        if (projects) {
          addToHistory({ 
            id: Date.now() + 'o', 
            type: 'output', 
            dataType: 'projects',
            data: projects 
          });
        } else {
           addToHistory({ 
            id: Date.now() + 'o', 
            type: 'output', 
            dataType: 'text',
            content: "Loading project directory..." 
          });
        }
        break;
        
      case 'skills':
        await refetchSkills();
        if (skills) {
          addToHistory({ 
            id: Date.now() + 'o', 
            type: 'output', 
            dataType: 'skills',
            data: skills 
          });
        } else {
          addToHistory({ 
            id: Date.now() + 'o', 
            type: 'output', 
            dataType: 'text',
            content: "Analyzing capabilities..." 
          });
        }
        break;
        
      case 'contact':
        setFormMode(true);
        break;
        
      case 'theme':
        const newTheme = handleThemeChange();
        addToHistory({ 
          id: Date.now() + 'o', 
          type: 'output', 
          dataType: 'success',
          content: `Visual interface updated: ${newTheme.toUpperCase()}_PROFILE` 
        });
        break;

      default:
        addToHistory({ 
          id: Date.now() + 'o', 
          type: 'output', 
          dataType: 'error',
          content: `Command not found: '${cmd}'. Type 'help' for available commands.` 
        });
    }
  };

  const handleFormComplete = () => {
    setFormMode(false);
    addToHistory({ 
      id: Date.now() + 'o', 
      type: 'output', 
      dataType: 'success',
      content: "Message transmitted successfully." 
    });
  };

  const handleFormCancel = () => {
    setFormMode(false);
    addToHistory({ 
      id: Date.now() + 'o', 
      type: 'output', 
      dataType: 'text',
      content: "Transmission aborted." 
    });
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen text-base md:text-lg pb-24 relative overflow-hidden">
      {/* CRT Overlay Effects */}
      <div className="scanlines" />
      <div className="vignette" />
      
      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Persistent Header */}
        <div className="mb-8 opacity-70 border-b border-primary/30 pb-2 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold">PORTFOLIO_TERM_V1.0</h1>
            <p className="text-xs">LOGGED IN AS: VISITOR</p>
          </div>
          <div className="text-right text-xs">
            <p className="flicker">SYS_STATUS: ONLINE</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Introduction (only shown if history is empty) */}
        {history.length === 0 && (
          <div className="mb-6 space-y-2">
            <p>Welcome to the interactive portfolio terminal.</p>
            <p>Type <span className="font-bold text-primary">'help'</span> to view available commands.</p>
          </div>
        )}

        {/* History Output */}
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id}>
              {item.type === 'command' ? (
                <div className="flex items-center text-primary/70 mb-1">
                  <span className="mr-2">visitor@portfolio:~$</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <TerminalOutput 
                  type={item.dataType || 'text'} 
                  content={item.content} 
                  data={item.data} 
                />
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        {formMode ? (
          <ContactForm onComplete={handleFormComplete} onCancel={handleFormCancel} />
        ) : (
          <CommandInput 
            onCommand={handleCommand} 
            history={commandHistory} 
            disabled={false}
          />
        )}
        
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Mobile/Quick Actions */}
      <QuickActions onAction={handleCommand} />
    </div>
  );
}
