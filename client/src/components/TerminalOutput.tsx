import { motion } from "framer-motion";
import { type Project, type Skill } from "@shared/schema";
import { ExternalLink, Github } from "lucide-react";

interface TerminalOutputProps {
  type: 'text' | 'error' | 'success' | 'projects' | 'skills' | 'help' | 'about';
  content?: string;
  data?: any;
}

export function TerminalOutput({ type, content, data }: TerminalOutputProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (type === 'error') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-red-500 mb-2"
      >
        [ERROR] {content}
      </motion.div>
    );
  }

  if (type === 'success') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-green-400 mb-2 font-bold"
      >
        [SUCCESS] {content}
      </motion.div>
    );
  }

  if (type === 'help') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-4 space-y-1 text-sm md:text-base"
      >
        <p className="font-bold border-b border-primary/30 pb-1 mb-2">AVAILABLE COMMANDS:</p>
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <span className="text-primary font-bold">about</span>
          <span className="opacity-80">Display system information and bio</span>
          
          <span className="text-primary font-bold">projects</span>
          <span className="opacity-80">List project directory</span>
          
          <span className="text-primary font-bold">skills</span>
          <span className="opacity-80">Analyze technical capabilities</span>
          
          <span className="text-primary font-bold">contact</span>
          <span className="opacity-80">Open communication frequency</span>
          
          <span className="text-primary font-bold">clear</span>
          <span className="opacity-80">Clear terminal buffer</span>
          
          <span className="text-primary font-bold">theme</span>
          <span className="opacity-80">Cycle visual interface profiles</span>
        </div>
      </motion.div>
    );
  }

  if (type === 'projects') {
    const projects = data as Project[];
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.1 }}
            className="border border-primary/40 p-4 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold">./{project.title}</h3>
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <Github size={16} />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm opacity-80 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.techStack?.map(tech => (
                <span key={tech} className="px-1.5 py-0.5 border border-primary/30 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'skills') {
    const skills = data as Skill[];
    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      acc[skill.category] = [...(acc[skill.category] || []), skill];
      return acc;
    }, {} as Record<string, Skill[]>);

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-4 space-y-4"
      >
        {Object.entries(grouped).map(([category, items], i) => (
          <div key={category}>
            <h3 className="font-bold border-b border-primary/20 inline-block mb-2 text-sm uppercase tracking-wider">
              {`>> MODULE: ${category}`}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {items.map((skill, j) => (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (i * 0.2) + (j * 0.05) }}
                  className="text-sm"
                >
                  <span className="text-primary/60 mr-1">[*]</span> {skill.name}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (type === 'about') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-4 max-w-2xl"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="border border-primary/30 p-1 shrink-0">
             {/* Dynamic ASCII-like avatar placeholder */}
             <div className="w-24 h-24 bg-primary/10 flex items-center justify-center text-xs font-mono text-center leading-none overflow-hidden select-none">
              01010101
              10101010
              00110011
              11001100
              01010101
              10101010
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">SYSTEM USER: DEV_PROFILE</h2>
            <p className="mb-2 opacity-90 leading-relaxed">
              Full-stack developer specialized in building accessible, performant web applications. 
              Currently operating in the React/Node.js ecosystem. 
              Obsessed with clean code, retro aesthetics, and optimizing user experiences.
            </p>
            <p className="opacity-70 text-sm">
              Current Status: <span className="text-green-400 animate-pulse">ONLINE</span>
            </p>
            <p className="opacity-70 text-sm">
              Location: Remote // Earth
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-1 whitespace-pre-wrap break-words"
    >
      {content}
    </motion.div>
  );
}
