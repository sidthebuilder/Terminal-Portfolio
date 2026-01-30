import { Wrapper } from "../styles/Output.styled";

const Skills: React.FC = () => {
    return (
        <Wrapper data-testid="skills">
            <div style={{ marginBottom: "1.5rem" }}>
                <h3>AI & Machine Learning</h3>
                <p>
                    LLM Fine-Tuning (LoRA, DPO) | RAG Pipeline Development | Prompt Engineering <br />
                    Model Evaluation (MT-Bench, HELM) | AI Agent Orchestration | NVIDIA Isaac Sim
                </p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
                <h3>Programming Languages</h3>
                <p>
                    Python | JavaScript | TypeScript | C# | SQL | Bash
                </p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
                <h3>Backend Development</h3>
                <p>
                    FastAPI | Flask | Node.js | Express | PostgreSQL | MongoDB | RESTful APIs
                </p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
                <h3>Frontend Development</h3>
                <p>
                    Next.js 14 | React | Tailwind CSS | HTML5 | CSS3
                </p>
            </div>
            <div>
                <h3>Tools & Platforms</h3>
                <p>
                    Docker | Git | GitHub Actions | n8n | AWS | Hugging Face | OpenAI API
                </p>
            </div>
        </Wrapper>
    );
};

export default Skills;
