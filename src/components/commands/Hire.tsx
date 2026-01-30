import React from "react";
import { Wrapper } from "../styles/Output.styled";

const Hire: React.FC = () => {
    return (
        <Wrapper data-testid="hire">
            <div style={{ marginBottom: "1rem" }}>
                <p>Interested in working together? Here’s how we can collaborate:</p>
            </div>
            <div>
                <div style={{ color: "#4af626", marginBottom: "0.5rem" }}>✔ Open to worldwide clients</div>
                <div style={{ color: "#4af626", marginBottom: "0.5rem" }}>✔ Freelance & contract work</div>
                <div style={{ color: "#4af626", marginBottom: "0.5rem" }}>✔ Timezone: IST (flexible overlap)</div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "0.5rem", fontWeight: "bold", color: "#e5e7eb" }}>Pricing:</div>
                <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>• Flexible based on scope & complexity</div>
                <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>• Final rate discussed after requirements review</div>
                <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>• Fixed-price or hourly available</div>
            </div>
            <div style={{ marginTop: "1rem", color: "#9ca3af" }}>
                Type <span style={{ color: "#fff" }}>email</span> to get in touch.
            </div>
        </Wrapper>
    );
};

export default Hire;
