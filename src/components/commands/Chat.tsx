import { useContext, useEffect, useState, useRef } from "react";
import { termContext } from "../Terminal";
import { chatWithAI } from "../../utils/ai";
import { Wrapper } from "../styles/Output.styled";
import { CmdBtn } from "../styles/Welcome.styled";
import { themeContext } from "../../App";
import { useTheme } from "../../hooks/useTheme";
import themes from "../styles/Themes";

const Chat: React.FC = () => {
    const { history, rerender } = useContext(termContext);
    const themeSwitcher = useContext(themeContext);
    const { theme } = useTheme();
    const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleTheme = () => {
        const newTheme = theme.name === 'dark' ? themes.light : themes.dark;
        themeSwitcher?.(newTheme);
    };

    const qna = [
        { label: "Check Resume", prompt: "Summarize Shashank's resume and experience.", icon: "📄", sub: "Summary of experience" },
        { label: "List Skills", prompt: "List Shashank's technical skills.", icon: "🛠", sub: "Technical Stack" },
        { label: "View Projects", prompt: "Tell me about Shashank's key projects.", icon: "💻", sub: "Key Achievements" },
        { label: "Contact Info", prompt: "How can I contact Shashank?", icon: "✉", sub: "Get in touch" },
        { label: "Download PDF", prompt: "resume", icon: "💾", sub: "Generate Resume" },
        { label: "Switch Theme", prompt: "theme_toggle", icon: "🎨", sub: "Toggle Mode" },
    ];

    useEffect(() => {
        if (showPrompt && inputRef.current) {
            inputRef.current.focus();
        }
    }, [messages, showPrompt]);

    const handleCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const userMsg = input.trim();
            if (userMsg === "exit") {
                setShowPrompt(false);
                return;
            }
            if (!userMsg) return;
            processMessage(userMsg);
        }
    };

    const processMessage = async (msg: string) => {
        if (msg === "resume") {
            import("../../utils/pdfGenerator").then(({ generateResumePDF }) => {
                generateResumePDF();
            });
            return;
        }
        if (msg === "theme_toggle") {
            toggleTheme();
            return;
        }

        setMessages((prev) => [...prev, { role: "user", text: msg }]);
        setInput("");
        setIsTyping(true);

        // Fallback responses (Hardcoded safety net)
        const fallbackMap: Record<string, string> = {
            "Summarize Shashank's resume and experience.": "SUMMARY: Senior AI Training Specialist & Full-Stack Dev (4+ yr). \n\nEXPERIENCE:\n• Scale AI: Led 10k+ voice/text annotations.\n• OneForma: LLM Fine-tuning & RLHF.\n• Fiverr: Delivered 30+ web projects.\n\nType 'about' for more.",
            "List Shashank's technical skills.": "SKILLS:\n[AI/ML]: LLM Fine-Tuning, RAG, Prompt Eng., Isaac Sim, Python.\n[Web]: React, TypeScript, Node.js, Flask, PostgreSQL.\n[Tools]: Docker, Git, n8n, Webflow.\n\nType 'skills' for full list.",
            "Tell me about Shashank's key projects.": "PROJECTS:\n1. Healthcare AI Chatbot (92% acc) - NLP/Python.\n2. Isaac Sim Simulation - PhysX/USD.\n3. E-Learning Platform - React/Node.\n\nType 'projects' for details.",
            "How can I contact Shashank?": "CONTACT:\nEmail: shashankchouhdhary792@gmail.com\nGitHub: github.com/sidthebuilder\nLinkedIn: linkedin.com/in/shashank-kumar-772a2035b\n\nType 'socials' to open links.",
        };

        try {
            // Try API first
            const aiResponse = await chatWithAI(msg, messages.map(m => ({ role: m.role, parts: m.text })));

            // Check for error in response
            if (aiResponse.includes("Error:") || aiResponse.includes("429")) {
                // Use fallback if available, otherwise generic offline message
                const fallbackText = fallbackMap[msg] || "Neural Core Offline. (API Quota Exceeded or Connection Failed). Please check the Resume manually.";
                setMessages((prev) => [...prev, { role: "model", text: fallbackText }]);
            } else {
                setMessages((prev) => [...prev, { role: "model", text: aiResponse }]);
            }
        } catch (e) {
            // Absolute fail-safe
            const fallbackText = fallbackMap[msg] || "Neural Core Offline. Try again.";
            setMessages((prev) => [...prev, { role: "model", text: fallbackText }]);
        }
        setIsTyping(false);
    };

    if (!showPrompt) return <div>AI Session Terminated.</div>;

    return (
        <Wrapper>
            <div style={{ marginBottom: "1rem", color: "#4af626" }}>
                I am ready. Ask me about Shashank's experience.
            </div>

            {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ color: msg.role === "user" ? "#d756ff" : "#4af626", fontWeight: "bold" }}>
                        {msg.role === "user" ? "visitor@terminal:~$ " : "AI@Core:~$ "}
                    </span>
                    <span style={{ color: "#e0d7d7" }}>{msg.text}</span>
                </div>
            ))}

            {isTyping && <div style={{ color: "#4af626" }}>AI is thinking...</div>}

            {isTyping && <div style={{ color: "#4af626" }}>Processing Data Stream...</div>}

            {!isTyping && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                    marginBottom: "1rem"
                }}>
                    {qna.map(q => (
                        <CmdBtn key={q.label} onClick={() => processMessage(q.prompt)} style={{ minWidth: "auto", width: "100%" }}>
                            <div className="btn-content">
                                <span className="btn-icon">{q.icon}</span>
                                <span className="btn-text">{q.label}</span>
                            </div>
                            <div className="btn-subtext">{q.sub}</div>
                        </CmdBtn>
                    ))}
                </div>
            )}

            {!isTyping && (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#d756ff", fontWeight: "bold", marginRight: "10px" }}>
                        visitor@terminal:~$
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCreate}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#e0d7d7",
                            outline: "none",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            flex: 1,
                        }}
                        autoFocus
                    />
                </div>
            )}
        </Wrapper>
    );
};

export default Chat;
