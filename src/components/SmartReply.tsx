import React, { useEffect, useState } from "react";
import { chatWithAI } from "../utils/ai";
import { Wrapper } from "./styles/Output.styled";

type Props = {
    cmd: string;
};

const SmartReply: React.FC<Props> = ({ cmd }) => {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const processCommand = async () => {
            await new Promise(r => setTimeout(r, 600));

            // 1. Check for specific triggers
            if (cmd.toLowerCase().includes("resume")) {
                if (isMounted) {
                    setResponse("Opening PDF Resume Generator...");
                    setLoading(false);
                    import("../utils/pdfGenerator").then(({ generateResumePDF }) => {
                        generateResumePDF();
                    });
                }
                return;
            }

            // 2. Define Fallback Map (Same as Chat.tsx)
            const fallbackMap: Record<string, string> = {
                "Summarize Shashank's resume and experience.": "SUMMARY: Senior AI Training Specialist & Full-Stack Dev (4+ yr). Exp: Scale AI (10k+ annotations), OneForma (LLM Tuning), Fiverr (30+ sites). Key stats: 92% chatbot accuracy, 150% SEO growth.",
                "List Shashank's technical skills.": "SKILLS: [AI] LLM Fine-Tuning, Voice Annotation, Isaac Sim, GPT-4. [Web] React, TS, Python, Flask, n8n. [Tools] Docker, Git, Webflow.",
                "Tell me about Shashank's key projects.": "PROJECTS: 1. Healthcare AI Chatbot (92% acc). 2. Isaac Sim PhysX Simulation. 3. E-Learning Platform (4.8/5 rating). 4. n8n Automation Pipelines (500+ users).",
                "How can I contact Shashank?": "CONTACT: Email: shashankchouhdhary792@gmail.com | GitHub: github.com/sidthebuilder",
            };

            try {
                // 3. Try AI
                const reply = await chatWithAI(cmd, []);

                if (isMounted) {
                    // Check for rate limit or errors
                    if (reply.includes("Error:") || reply.includes("429")) {
                        setResponse(fallbackMap[cmd] || "Neural Core Offline. (API Quota Exceeded). Please check the Resume command for manual download.");
                    } else {
                        setResponse(reply);
                    }
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setResponse(fallbackMap[cmd] || "Error: System Offline.");
                    setLoading(false);
                }
            }
        };

        processCommand();

        return () => { isMounted = false; };
    }, [cmd]);

    if (loading) {
        return (
            <Wrapper>
                <span style={{ color: "#4af626" }}>Thinking...</span>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div style={{ color: "#e0d7d7", whiteSpace: "pre-wrap" }}>
                {response}
            </div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#666" }}>
                (Processed by AI Fallback)
            </div>
        </Wrapper>
    );
};

export default SmartReply;
