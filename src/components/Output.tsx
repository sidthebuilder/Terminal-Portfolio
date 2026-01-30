import About from "./commands/About";
import Clear from "./commands/Clear";
import Echo from "./commands/Echo";
import Education from "./commands/Education";
import Email from "./commands/Email";
import Gui from "./commands/Gui";
import Help from "./commands/Help";
import Welcome from "./commands/Welcome";
import History from "./commands/History";
import Projects from "./commands/Projects";
import Resume from "./commands/Resume";
import Skills from "./commands/Skills";
import Socials from "./commands/Socials";
import Themes from "./commands/Themes";
import Chat from "./commands/Chat";
import Status from "./commands/Status";
import Weather from "./commands/Weather";
import Hire from "./commands/Hire";
import Coffee from "./commands/Coffee";
import { OutputContainer, UsageDiv, Wrapper } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { useContext } from "react";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  const specialCmds = ["projects", "socials", "themes", "echo"];

  // return 'Usage: <cmd>' if command arg is not valid
  // eg: about tt
  if (!specialCmds.includes(cmd) && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {
        {
          about: <About />,
          clear: <Clear />,
          echo: <Echo />,
          education: <Education />,
          email: <Email />,
          gui: <Gui />,
          help: <Help />,
          history: <History />,
          projects: <Projects />,
          resume: <Resume />,
          pwd: <Wrapper>/home/shashank</Wrapper>,
          skills: <Skills />,
          socials: <Socials />,
          themes: <Themes />,
          welcome: <Welcome />,
          whoami: <Wrapper>visitor</Wrapper>,
          chat: <Chat />,
          status: <Status />,
          weather: <Weather />,
          hire: <Hire />,
          coffee: <Coffee />,
        }[cmd]
      }
    </OutputContainer>
  );
};

export default Output;
