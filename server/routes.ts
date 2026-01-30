import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects, skills, messages } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ 
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed Data (if empty)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding database...");
    
    await db.insert(projects).values([
      {
        title: "Enterprise Dashboard",
        description: "A comprehensive analytics dashboard for managing microservices architecture. Features real-time data visualization.",
        techStack: ["React", "TypeScript", "D3.js", "GraphQL"],
        link: "https://dashboard.demo.com",
        github: "https://github.com/demo/dashboard"
      },
      {
        title: "Cloud Infrastructure CLI",
        description: "Automated command-line interface for provisioning cloud resources across AWS and Azure.",
        techStack: ["Go", "AWS SDK", "Terraform"],
        github: "https://github.com/demo/cloud-cli"
      },
      {
        title: "Collaboration Platform",
        description: "Secure, real-time team collaboration workspace with end-to-end encryption.",
        techStack: ["Node.js", "WebSocket", "Redis", "PostgreSQL"],
        link: "https://collab.app"
      }
    ]);

    await db.insert(skills).values([
      { name: "System Architecture", category: "Backend" },
      { name: "React & Modern UI", category: "Frontend" },
      { name: "Cloud Native (AWS/GCP)", category: "DevOps" },
      { name: "Database Optimization", category: "Database" },
      { name: "CI/CD Pipelines", category: "DevOps" },
      { name: "TypeScript", category: "Frontend" }
    ]);
  }
}
