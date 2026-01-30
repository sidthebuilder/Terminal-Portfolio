import styled from "styled-components";

export const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;

  @media (max-width: 932px) {
    margin-bottom: 1.5rem;
  }

  div {
    @media (min-width: 1024px) {
      flex-basis: 50%;
    }
  }
`;

export const PreName = styled.div`
  margin-bottom: 2rem;
  
  pre {
    font-size: 0.5rem;
    line-height: 0.6rem;
    
    @media (min-width: 550px) {
      font-size: 0.8rem;
      line-height: 1rem;
    }
  }
`;

export const CmdBtn = styled.button`
  background: #8B5CF6; /* Purple */
  border: none;
  border-radius: 8px;
  color: #ffffff;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace; /* Monospace */
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 80px; /* Taller for content */
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: scale(1.05); /* Scale up */
    box-shadow: 0 0 15px #10B981; /* Green glow */
    border: 1px solid #10B981;
    z-index: 10;
  }

  &:active {
    transform: scale(0.98);
  }

  /* Internal elements styling */
  .btn-content {
     display: flex;
     align-items: center;
     gap: 12px;
     width: 100%;
  }

  .btn-icon {
    font-size: 1.5rem;
  }

  .btn-text {
      font-size: 1.1rem;
  }

  .btn-subtext {
      font-size: 0.8rem;
      opacity: 0.9;
      margin-top: 6px;
      font-weight: normal;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Keep subtext readable? Or full mono? User said monospace. Let's keep main text mono. */
  }
  
  .cmd-hint {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.7rem;
      background: rgba(0,0,0,0.5);
      padding: 2px 6px;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.2s;
      color: #10B981;
  }

  &:hover .cmd-hint {
      opacity: 1;
  }

  &.running {
      cursor: wait;
      opacity: 0.9;
  }
  
  /* Spinner */
  &.running::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border: 2px solid #ffffff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
      to { transform: rotate(360deg); }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr !important; /* Force stack on mobile */
  }
`;

export const PreWrapper = styled.div`
  text-align: center;
`;

export const PreNameMobile = styled.pre`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const PreImg = styled.pre`
  @media (max-width: 550px) {
    display: none;
  }
`;

export const Seperator = styled.div`
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Cmd = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors?.secondary};
  text-decoration: none;
  line-height: 1.5rem;
  white-space: nowrap;
  border-bottom: 2px dashed ${({ theme }) => theme.colors?.secondary};

  &:hover {
    border-bottom-style: solid;
  }
`;
