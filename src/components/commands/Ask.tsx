import { useContext, useEffect, useState, useRef } from "react";
import { termContext } from "../Terminal";
import { chatWithAI } from "../../utils/ai";
import { Wrapper } from "../styles/Output.styled";

const Ask: React.FC = () => {
    const { arg } = useContext(termContext);
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const executed = useRef(false);

    useEffect(() => {
        if (!executed.current) {
            executed.current = true;
            const query = arg.join(" ");

            if (!query) {
                setResponse("Usage: ask <your question>");
                setLoading(false);
                return;
            }

            const fetchReply = async () => {
                try {
                    const reply = await chatWithAI(query, []);
                    if (reply.includes("Error:") || reply.includes("429")) {
                        setResponse("Neural Core Offline. (API Quota Exceeded).");
                    } else {
                        setResponse(reply);
                    }
                } catch (e) {
                    setResponse("Error connecting to Neural Core.");
                }
                setLoading(false);
            };

            fetchReply();
        }
    }, [arg]);

    if (loading) {
        return (
            <Wrapper>
                <span style={{ color: "#4af626" }}>Thinking...</span>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div style={{ color: "#e0d7d7", whiteSpace: "pre-wrap", marginBottom: "0.5rem" }}>
                {response}
            </div>
        </Wrapper>
    );
};

export default Ask;
