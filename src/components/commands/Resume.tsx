import { useEffect, useContext, useRef } from "react";
import { checkRedirect } from "../../utils/funcs";
import { termContext } from "../Terminal";
import { Wrapper } from "../styles/Output.styled";

const Resume: React.FC = () => {
    // Cast context to include our new fields (simple workaround for now)
    const { rerender, markExecuted, currentId, isProcessed } = useContext(termContext) as any;

    /* ===== get current command ===== */
    useEffect(() => {
        // Only run if NOT processed yet
        if (rerender && !isProcessed && markExecuted && currentId) {
            // Mark immediately as processed to prevent execution
            markExecuted(currentId);

            // Execute logic
            setTimeout(() => {
                import("../../utils/pdfGenerator").then(({ generateResumePDF }) => {
                    generateResumePDF();
                });
            }, 100);
        }
    }, [rerender, isProcessed, markExecuted, currentId]);

    return (
        <Wrapper>
            <span>Opening resume.pdf...</span>
        </Wrapper>
    );
};

export default Resume;
