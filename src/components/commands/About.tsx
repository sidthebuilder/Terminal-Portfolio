import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Shashank Kumar</HighlightSpan>!
      </p>
      <p>
        I'm <HighlightAlt>an AI Systems Engineer and Full-Stack Developer</HighlightAlt> based in Delhi NCR,
        India.
      </p>
      <p>
        I have 4+ years of experience building intelligent systems, <br />
        LLM evaluation, multi-agent architectures, and scalable web applications.
      </p>
    </AboutWrapper>
  );
};

export default About;
