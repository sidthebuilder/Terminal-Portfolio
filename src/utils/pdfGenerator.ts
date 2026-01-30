import { jsPDF } from "jspdf";

export const generateResumePDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - (margin * 2);

    const checkPageBreak = (spaceNeeded: number) => {
        if (y + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            y = 20;
        }
    };

    const addSectionTitle = (title: string) => {
        checkPageBreak(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(title, 20, y);
        y += 5;
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += 6;
    };

    const addBulletPoints = (items: string[]) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        items.forEach(item => {
            const text = doc.splitTextToSize("- " + item, contentWidth);
            checkPageBreak(text.length * 4.5);
            doc.text(text, 20, y);
            y += text.length * 4.5;
        });
        y += 2;
    };

    const addParagraph = (text: string) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        const splitText = doc.splitTextToSize(text, contentWidth);
        checkPageBreak(splitText.length * 4.5);
        doc.text(splitText, 20, y);
        y += splitText.length * 4.5 + 2;
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════════
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SHASHANK KUMAR", 105, y, { align: "center" });
    y += 7;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("AI Systems Engineer and Full-Stack Developer", 105, y, { align: "center" });
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Delhi NCR, India | shashankchoudhary792@gmail.com", 105, y, { align: "center" });
    y += 5;
    
    // Clickable links - formatted properly on one line
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("github.com/sidthebuilder", 45, y, { url: "https://github.com/sidthebuilder" });
    doc.setTextColor(0, 0, 0);
    doc.text(" | ", 93, y);
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("sidthebuilder.github.io/Terminal-Portfolio", 100, y, { url: "https://sidthebuilder.github.io/Terminal-Portfolio/" });
    doc.setTextColor(0, 0, 0);
    y += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Available for worldwide freelance and contract engagements", 105, y, { align: "center" });
    y += 4;

    doc.setLineWidth(0.7);
    doc.line(20, y, 190, y);
    y += 7;

    // ═══════════════════════════════════════════════════════════════════════
    // PROFESSIONAL SUMMARY
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("PROFESSIONAL SUMMARY");
    addParagraph(
        "AI Systems Engineer with 4+ years of experience architecting intelligent systems and scalable applications. " +
        "Delivered measurable impact by improving model safety by 25%, building AI agents with 85% task accuracy, " +
        "and engineering solutions that drove 150% client growth. Combines expertise in LLM fine-tuning, " +
        "multi-agent architecture, and production-grade deployment."
    );

    // ═══════════════════════════════════════════════════════════════════════
    // CORE COMPETENCIES
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("CORE COMPETENCIES");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Large Language Models (LLMs) | Multi-Agent Systems | RAG Pipelines | FastAPI | Next.js | React | Docker | Python", 20, y);
    y += 7;

    // ═══════════════════════════════════════════════════════════════════════
    // TECHNICAL SKILLS
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("TECHNICAL SKILLS");
    addBulletPoints([
        "AI & Machine Learning: LLM Fine-Tuning (LoRA, DPO), RAG Pipeline Development, Prompt Engineering, Model Evaluation (MT-Bench, HELM), AI Agent Orchestration, NVIDIA Isaac Sim",
        "Programming: Python, JavaScript, TypeScript, C#, SQL, Bash",
        "Backend Development: FastAPI, Flask, Node.js, Express, PostgreSQL, MongoDB, RESTful APIs",
        "Frontend Development: Next.js 14, React, Tailwind CSS, HTML5, CSS3",
        "Tools & Platforms: Docker, Git, GitHub Actions, n8n, AWS, Hugging Face, OpenAI API, Anthropic API"
    ]);

    // ═══════════════════════════════════════════════════════════════════════
    // PROFESSIONAL EXPERIENCE
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("PROFESSIONAL EXPERIENCE");

    // Exp 1: AI Training
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("AI Training and Evaluation Specialist", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("2024 - Present", 190, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text("Contract for AI Research Platforms (via Upwork, Outlier, OneForma) | Remote", 20, y);
    y += 5;
    addBulletPoints([
        "Improved model safety scores by 25% by designing and executing 500+ adversarial prompts for red-teaming frontier LLMs.",
        "Accelerated data pipeline efficiency by 30% by creating annotation scripts and ontology systems for 10,000+ multilingual NLP samples, maintaining 98% QA accuracy.",
        "Trained and evaluated 3+ major LLMs on reasoning and code-generation tasks, directly contributing to production release cycles.",
        "Consistently rated Top Performer (top 5%) across 1,000+ complex evaluation tasks."
    ]);

    // Exp 2: Freelance
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Freelance AI and Full-Stack Developer", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("2021 - 2024", 190, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text("Fiverr and Direct Clients | Remote", 20, y);
    y += 5;
    addBulletPoints([
        "Architected 30+ full-stack applications, including 5+ AI-powered SaaS tools that automated workflows for 100+ monthly active users.",
        "Boosted client revenue by 40% for 3 key accounts by building custom RAG chatbots that improved support answer accuracy by 60%.",
        "Drove 150% average increase in organic traffic and automated 500+ business processes, saving clients 20+ hours per week.",
        "Maintained 99.9% uptime and sub-second load times for all deployed applications."
    ]);

    // ═══════════════════════════════════════════════════════════════════════
    // KEY PROJECTS (with realistic numbers)
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("KEY PROJECTS");

    // Project 1: Verdant AI
    checkPageBreak(22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("Verdant AI: Multi-Agent Orchestration System", 20, y, { url: "https://github.com/sidthebuilder/verdant-ai" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Python, FastAPI, Llama 3, Docker", 190, y, { align: "right" });
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("High-performance system that autonomously solves coding and physics problems with 85% success rate.", 20, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    addBulletPoints([
        "Engineered a 7-agent swarm using Router-Delegate pattern, reducing task completion time by 70%.",
        "Integrated LoRA fine-tuned Llama 3 and GPT-4 via unified adapter layer, handling 50+ concurrent simulations."
    ]);

    // Project 2: NeuroSim
    checkPageBreak(22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("NeuroSim Engine: AI Character Simulation", 20, y, { url: "https://github.com/sidthebuilder/-NeuroSim-Engine" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("C#, Unity, Behavior Trees", 190, y, { align: "right" });
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Simulation platform creating psychologically realistic AI agents with dynamic emotional states.", 20, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    addBulletPoints([
        "Implemented trait-emotion-goal architecture generating 2,000+ unique behavioral sequences for game NPCs.",
        "Reduced AI scripting time by 50% via visual behavior tree editor and modular emotion system."
    ]);

    // Project 3: GMX TradeDesk
    checkPageBreak(22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("GMX TradeDesk: DeFi Trading Automation", 20, y, { url: "https://github.com/sidthebuilder/gmx-v2-arbitrum-trader" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Python, Flask, Web3, PyQt5", 190, y, { align: "right" });
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Desktop application for automated trading strategies on GMX V2 perpetuals exchange.", 20, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    addBulletPoints([
        "Developed real-time position manager monitoring 10+ market indicators with sub-100ms execution latency.",
        "Built backtesting engine simulating 500+ historical trading scenarios."
    ]);

    // Project 4: Isaac Sim
    checkPageBreak(22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 204);
    doc.textWithLink("Isaac Sim Physics: Breakable Object Simulation", 20, y, { url: "https://github.com/sidthebuilder/Isaac-fishing-rod" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Python, NVIDIA Isaac Sim, PhysX", 190, y, { align: "right" });
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Robotics training environment simulating complex breakage dynamics for ML data generation.", 20, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    addBulletPoints([
        "Created 761-line modular physics simulation featuring configurable D6 joints and progressive damage.",
        "Generated 1,000+ training samples for reinforcement learning models at 60 FPS real-time."
    ]);

    // ═══════════════════════════════════════════════════════════════════════
    // EDUCATION (Fixed format - In Progress in right place)
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("EDUCATION");
    
    checkPageBreak(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("University of the People", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text("Expected 2026", 190, y, { align: "right" });
    y += 4;
    doc.setFont("helvetica", "italic");
    doc.text("Bachelor of Science in Computer Science (In Progress)", 20, y);
    y += 6;
    
    doc.setFont("helvetica", "bold");
    doc.text("Ch. Charan Singh University, Meerut", 20, y);
    y += 4;
    doc.setFont("helvetica", "italic");
    doc.text("Bachelor of Arts", 20, y);
    y += 7;

    // ═══════════════════════════════════════════════════════════════════════
    // CERTIFICATIONS
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("CERTIFICATIONS");
    addBulletPoints([
        "CS50: Introduction to Computer Science - Harvard University (edX)",
        "Scale AI Annotation Specialist Certification"
    ]);

    // ═══════════════════════════════════════════════════════════════════════
    // ADDITIONAL INFO
    // ═══════════════════════════════════════════════════════════════════════
    addSectionTitle("ADDITIONAL INFORMATION");
    addBulletPoints([
        "Languages: English (Fluent), Hindi (Native)",
        "Earned a 4.8/5 average platform rating and consistent 5-star reviews for delivering high-impact solutions"
    ]);

    doc.save("Shashank_Kumar_Resume.pdf");
};
