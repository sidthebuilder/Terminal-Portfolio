import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Education</h3>
        <p>
          B.S. in Computer Science | University of the People | Expected 2026 <br />
          B.A. | Ch. Charan Singh University, Meerut
        </p>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Experience</h3>
        <p>
          AI Training & Evaluation Specialist | Upwork, Outlier, OneForma | 2024 - Present
        </p>
        <p>
          Freelance AI & Full-Stack Developer | Fiverr | 2021 - 2024
        </p>
      </div>
      <div>
        <h3>Certifications</h3>
        <p>
          CS50: Introduction to Computer Science – Harvard University (edX)
        </p>
        <p>
          Scale AI Annotation Specialist Certification
        </p>
      </div>
    </Wrapper>
  );
};

export default Education;
