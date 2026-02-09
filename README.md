# example-app-claude

A project documenting the process of building an example application entirely using Claude Code. This repo serves as a reference for workflows, patterns, and practices when developing software with AI-assisted coding through Claude Code.

## AI-Assisted Development Workflow

This project follows a structured, AI-driven workflow from concept to implementation:

```
1. Create PRD
   Define the product requirements document with full technical
   architecture, functional specs, and delivery milestones.
         │
         ▼
2. Generate GitHub Issues from PRD
   Break the PRD down into trackable, actionable GitHub issues
   organized by phase and labeled by category.
         │
         ▼
3. Generate Roadmap from GitHub Issues
   Produce a comprehensive roadmap that maps issues to milestones,
   defines dependencies, and establishes delivery timelines.
         │
         ▼
4. Implement (issue by issue)
   Work through the roadmap, using GitHub issues as the unit of
   work, with CI/CD validating each change.
```

Each step is executed with Claude Code, producing artifacts that feed into the next stage. The goal is a fully traceable path from product idea to deployed software.

## Project: CellarSync

A wine collection inventory management system for personal and small group use. See [docs/PRD.md](docs/PRD.md) for the full product requirements document.

**Tech Stack:** React SPA | Fastify | SQLite | GCP VM | GitHub Actions CI/CD

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
