import React from "react";
import { Wrapper } from "../styles/Output.styled";

const Status: React.FC = () => {
   const browser = navigator.userAgent.split(" ")[0]; // Simple browser check
   const platform = navigator.platform;
   const size = `${window.innerWidth}x${window.innerHeight}`;
   const cores = navigator.hardwareConcurrency || "Unknown";
   const online = navigator.onLine ? "ONLINE" : "OFFLINE";
   const date = new Date().toLocaleString();

   return (
      <Wrapper data-testid="status">
         <div style={{ padding: "0.5rem 0", color: "#e0d7d7" }}>
            <div style={{ marginBottom: "0.5rem", fontWeight: "bold", color: "#4af626" }}>
               SYSTEM STATUS REPORT
            </div>
            <div>---------------------------</div>
            <div>
               OS ARCHITECTURE  : <span style={{ color: "#f2a" }}> {platform} </span>
            </div>
            <div>
               BROWSER AGENT    : <span style={{ color: "#f2a" }}> {browser} </span>
            </div>
            <div>
               DISPLAY RES      : <span style={{ color: "#f2a" }}> {size} </span>
            </div>
            <div>
               LOGICAL CORES    : <span style={{ color: "#f2a" }}> {cores} </span>
            </div>
            <div>
               NETWORK STATUS   : <span style={{ color: online === "ONLINE" ? "#4af626" : "red" }}> {online} </span>
            </div>
            <div>
               SYSTEM TIME      : <span style={{ color: "#f2a" }}> {date} </span>
            </div>
            <div>---------------------------</div>
            <div>
               STATUS           : <span style={{ color: "#4af626" }}>[OPTIMAL]</span>
            </div>
         </div>
      </Wrapper>
   );
};

export default Status;
