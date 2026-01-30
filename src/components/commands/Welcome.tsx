import {
  HeroContainer,
  Seperator,
  PreName,
  CmdBtn,
  GridContainer,
} from "../styles/Welcome.styled";
import { useContext, useState } from "react";
import { termContext } from "../Terminal";
import { themeContext } from "../../App";
import { useTheme } from "../../hooks/useTheme";
import themes from "../styles/Themes";

const Welcome: React.FC = () => {
  const { runCommand } = useContext(termContext);
  const themeSwitcher = useContext(themeContext);
  const { theme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme.name === 'dark' ? themes.light : themes.dark;
    themeSwitcher?.(newTheme);
  };

  return (
    <HeroContainer data-testid="welcome">
      <div className="about" style={{ maxWidth: "800px" }}> {/* Constrain width */}
        <div style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
          Welcome to Shashank’s interactive terminal portfolio.
        </div>
        <div style={{ marginBottom: "1.5rem", lineHeight: "1.6rem" }}>
          I build scalable web apps and AI automations that ship to production.<br />
          Ask anything about my projects, skills, or experience.
        </div>
        <div style={{ marginBottom: "2rem", color: theme.colors.text[200] }}>
          Try: <span style={{ color: "#4af626" }}>help</span>, <span style={{ color: "#4af626" }}>projects</span>, <span style={{ color: "#4af626" }}>hire</span>
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "2rem" }}>
          <CmdBtn onClick={() => runCommand?.("Summarize Shashank's resume and experience.")}>
            <div className="btn-content">
              <span className="btn-icon">📄</span>
              <span className="btn-text">Check Resume</span>
            </div>
            <div className="btn-subtext">View a summary of my experience</div>
            <div className="cmd-hint">&gt; cat resume.txt</div>
          </CmdBtn>

          <CmdBtn onClick={() => runCommand?.("List Shashank's technical skills.")}>
            <div className="btn-content">
              <span className="btn-icon">🛠</span>
              <span className="btn-text">List Skills</span>
            </div>
            <div className="btn-subtext">See my technical stack</div>
            <div className="cmd-hint">&gt; ls skills/</div>
          </CmdBtn>

          <CmdBtn onClick={() => runCommand?.("How can I contact Shashank?")}>
            <div className="btn-content">
              <span className="btn-icon">✉</span>
              <span className="btn-text">Contact</span>
            </div>
            <div className="btn-subtext">Get in touch with me</div>
            <div className="cmd-hint">&gt; mail -s "Hello"</div>
          </CmdBtn>
        </div>



        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="command">resume.pdf:</span>
          <span
            onClick={() => import("../../utils/pdfGenerator").then(({ generateResumePDF }) => generateResumePDF())}
            style={{
              color: "#4af626",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            [Download Resume]
          </span>
          <span style={{ color: "#9ca3af", fontSize: "0.85rem", marginLeft: "10px" }}>Last updated: Jan 2026</span>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
