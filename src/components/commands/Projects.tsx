import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import Usage from "../Usage";

const Projects: React.FC = () => {
  return (
    <div data-testid="projects">
      <ProjectsIntro>
        Here are my key projects. <br />
        Numbers don't lie. Neither does the code.
      </ProjectsIntro>
      {projects.map(({ id, title, desc, metrics, stack }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>{`${id}. ${title}`}</ProjectTitle>
          <div style={{ marginLeft: "20px", color: "#e5e7eb" }}>
            <div style={{ marginBottom: "5px" }}>→ <span style={{ color: "#4af626" }}>{metrics}</span></div>
            <div style={{ marginBottom: "5px", fontSize: "0.9rem", color: "#9ca3af" }}>→ Stack: {stack}</div>
          </div>
          <ProjectDesc style={{ marginLeft: "20px", display: "none" }}>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Verdant AI: Multi-Agent Orchestration",
    metrics: "85% success rate • 7-agent swarm • 70% faster task completion",
    stack: "Python, FastAPI, Next.js 14, Llama 3, Docker",
    desc: "High-performance multi-agent system for complex problem-solving.",
    url: "https://github.com/sidthebuilder/verdant-ai",
  },
  {
    id: 2,
    title: "NeuroSim Engine: AI Character Simulation",
    metrics: "2,000+ behavioral sequences • 50% less scripting time",
    stack: "C#, Unity, Behavior Trees, Emotion Modeling",
    desc: "AI character simulation with emotional intelligence.",
    url: "https://github.com/sidthebuilder/-NeuroSim-Engine",
  },
  {
    id: 3,
    title: "GMX TradeDesk: DeFi Trading Automation",
    metrics: "Sub-100ms execution • 500+ backtested scenarios",
    stack: "Python, Flask, Web3, PyQt5, SQLAlchemy",
    desc: "Desktop trading app for GMX V2 perpetuals exchange.",
    url: "https://github.com/sidthebuilder/gmx-v2-arbitrum-trader",
  },
  {
    id: 4,
    title: "Isaac Sim Physics: Breakable Simulation",
    metrics: "761 lines • 60 FPS • 1,000+ training samples",
    stack: "Python, NVIDIA Isaac Sim, PhysX, USD",
    desc: "Robotics training environment for ML data generation.",
    url: "https://github.com/sidthebuilder/Isaac-fishing-rod",
  },
  {
    id: 5,
    title: "Quantum-Inspired Distributed Optimizer",
    metrics: "QAOA & Annealing algorithms • NP-hard problems",
    stack: "Python, React, GitHub Actions",
    desc: "Classical solver using quantum-inspired algorithms.",
    url: "https://github.com/sidthebuilder/Quantum-Inspired-Distributed-Optimizer",
  },
];

export default Projects;
