import React, { useEffect, useState } from "react";
import { Wrapper } from "../styles/Output.styled";

const Coffee: React.FC = () => {
    const [status, setStatus] = useState("☕ Brewing code...");

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus("☕ Code brewed! (Caffeine efficiency +50%)");
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Wrapper data-testid="coffee">
            <div>{status}</div>
        </Wrapper>
    );
};

export default Coffee;
