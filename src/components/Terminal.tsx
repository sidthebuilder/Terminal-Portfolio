import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";
import { soundManager } from "../utils/SoundManager";
import SmartReply from "./SmartReply";
import Resume from "./commands/Resume";
import Ask from "./commands/Ask";

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "projects", desc: "view projects that I've coded", tab: 5 },
  { cmd: "skills", desc: "list technical skills", tab: 8 },
  { cmd: "hire", desc: "hire me", tab: 9 },
  { cmd: "resume", desc: "download/view resume", tab: 6 },
  { cmd: "email", desc: "send an email to me", tab: 8 },
  { cmd: "about", desc: "about Shashank Kumar", tab: 8 },
  { cmd: "chat", desc: "talk to my AI assistant", tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "coffee", desc: "brew some code", tab: 9 },
  { cmd: "echo", desc: "print out anything", tab: 9 },
  { cmd: "education", desc: "my education background", tab: 4 },
  { cmd: "gui", desc: "go to my portfolio in GUI", tab: 10 },
  { cmd: "help", desc: "check available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  { cmd: "pwd", desc: "print current working directory", tab: 10 },
  { cmd: "socials", desc: "check out my social accounts", tab: 6 },
  { cmd: "status", desc: "check system status", tab: 9 },
  { cmd: "themes", desc: "check available themes", tab: 7 },
  { cmd: "weather", desc: "check local weather", tab: 10 },
  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
  { cmd: "ai", desc: "talk to ai", tab: 8 },
  // Aliases
  { cmd: "cls", desc: "alias for clear", tab: 0 },
  { cmd: "p", desc: "alias for projects", tab: 0 },
  { cmd: "project", desc: "alias for projects", tab: 0 },
  { cmd: "s", desc: "alias for socials", tab: 0 },
  { cmd: "e", desc: "alias for education", tab: 0 },
  { cmd: "c", desc: "alias for chat", tab: 0 },
  { cmd: "h", desc: "alias for help", tab: 0 },
  { cmd: "r", desc: "alias for resume", tab: 0 },
  { cmd: "ls", desc: "list all commands", tab: 0 },
  { cmd: "ask", desc: "ask AI a question directly", tab: 4 },
];

type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
  runCommand?: (cmd: string) => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ===== Refactoring history to store objects for stable keys ===== */
  const [cmdHistory, setCmdHistory] = useState<{ id: string; cmd: string }[]>([
    { id: "welcome_init", cmd: "welcome" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRerender(false);
      setInputVal(e.target.value);
      soundManager.playClick();
    },
    [inputVal]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    soundManager.playEnter();
    const newEntry = { id: _.uniqueId("cmd_"), cmd: inputVal };
    setCmdHistory([newEntry, ...cmdHistory]);
    setInputVal("");
    setRerender(true);
    setHints([]);
    setPointer(-1);
  };

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
  };

  const runCommand = (cmd: string) => {
    soundManager.playEnter();
    const newEntry = { id: _.uniqueId("cmd_"), cmd };
    setCmdHistory([newEntry, ...cmdHistory]);
    setInputVal("");
    setRerender(true);
    setHints([]);
    setPointer(-1);
  };

  // focus on input when terminal is clicked
  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  // Keyboard Press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // if Tab or Ctrl + I
    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds: string[] = [];
      commands.forEach(({ cmd }) => {
        if (_.startsWith(cmd, inputVal)) {
          hintsCmds = [...hintsCmds, cmd];
        }
      });

      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      if (hintsCmds.length > 1) {
        setHints(hintsCmds);
      } else if (hintsCmds.length === 1) {
        const currentCmd = _.split(inputVal, " ");
        setInputVal(
          currentCmd.length !== 1
            ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}`
            : hintsCmds[0]
        );
        setHints([]);
      }
    }

    if (ctrlL) {
      clearHistory();
    }

    if (e.key === "ArrowUp") {
      if (pointer >= cmdHistory.length) return;
      if (pointer + 1 === cmdHistory.length) return;
      setInputVal(cmdHistory[pointer + 1]?.cmd || "");
      setPointer(prevState => prevState + 1);
      inputRef?.current?.blur();
    }

    if (e.key === "ArrowDown") {
      if (pointer < 0) return;
      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }
      setInputVal(cmdHistory[pointer - 1]?.cmd || "");
      setPointer(prevState => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputVal, pointer]);

  return (
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
      {hints.length > 1 && (
        <div>
          {hints.map(hCmd => (
            <Hints key={hCmd}>{hCmd}</Hints>
          ))}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="terminal-input">
          <TermInfo /> <MobileBr />
          <MobileSpan>&#62;</MobileSpan>
        </label>
        <Input
          title="terminal-input"
          type="text"
          id="terminal-input"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          autoCapitalize="off"
          ref={inputRef}
          value={inputVal}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </Form>

      {/* Interactive Hint */}
      {!inputVal && (
        <div style={{ marginTop: "0.2rem", color: "#666", fontSize: "0.8rem", marginLeft: "20px", fontStyle: "italic" }}>
          Type "help" to see available commands.
        </div>
      )}

      {cmdHistory.map(({ id, cmd }) => {
        const cmdH = cmd;
        const commandArray = _.split(_.trim(cmdH), " ");
        const validCommand = _.find(commands, { cmd: commandArray[0] });
        const contextValue = {
          arg: _.drop(commandArray),
          history: cmdHistory.map(h => h.cmd), // Pass string array to context for compatibility
          rerender,
          index: 0, // Simplified index
          clearHistory,
          runCommand,
        };
        return (
          <div key={id}> {/* STABLE KEY HERE */}
            <div>
              <TermInfo />
              <MobileBr />
              <MobileSpan>&#62;</MobileSpan>
              <span data-testid="input-command">{cmdH}</span>
            </div>
            {validCommand ? (
              <termContext.Provider value={contextValue}>
                <Output index={0} cmd={
                  validCommand.cmd === "cls" ? "clear" :
                    validCommand.cmd === "p" ? "projects" :
                      validCommand.cmd === "project" ? "projects" :
                        validCommand.cmd === "s" ? "socials" :
                          validCommand.cmd === "e" ? "education" :
                            validCommand.cmd === "c" ? "chat" :
                              validCommand.cmd === "h" ? "help" :
                                validCommand.cmd === "r" ? "resume" :
                                  validCommand.cmd === "ask" ? "ask" :
                                    validCommand.cmd === "ls" ? "ls" : // Added ls to mapped command
                                      validCommand.cmd === "hire" ? "hire" :
                                        validCommand.cmd === "coffee" ? "coffee" :
                                          validCommand.cmd === "ai" ? "chat" : // ai alias for chat
                                            commandArray[0]
                } />
              </termContext.Provider>
            ) : cmdH === "" ? (
              <Empty />
            ) : (
              <SmartReply cmd={cmdH} />
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Terminal;
