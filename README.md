# CellarSync

Wine collection inventory management system.

## Development Workflow

This project follows a structured planning-to-execution workflow using Claude Code:

### 1. Create the PRD

Write a comprehensive Product Requirements Document that defines the application's scope, features, technical architecture, and success criteria.

```
/create-prd
```

The PRD lives in `docs/PRD.md` and serves as the single source of truth for all downstream planning.

### 2. Generate GitHub Issues from the PRD

Analyze the PRD and break it down into well-scoped, actionable GitHub issues with labels, priorities, and dependency relationships.

```
/analyze-issue (or prompt Claude Code to generate issues from the PRD)
```

Each issue includes:
- Clear acceptance criteria
- Technical implementation details
- Priority level and labels
- Dependencies on other issues

### 3. Generate a Roadmap from GitHub Issues

Organize the issues into a phased roadmap with dependency graphs, parallel workstreams, execution plans, and exit criteria for each phase.

The roadmap lives in `docs/ROADMAP.md` and includes:
- Phase-by-phase breakdown with milestones
- Dependency graph showing issue relationships
- Execution plans with parallelism opportunities
- Exit criteria that must be met before advancing

### 4. Implement Phase by Phase

Work through each phase sequentially, using the roadmap as a guide:
- Implement issues in dependency order
- Verify exit criteria before moving to the next phase
- Update the roadmap and changelog as phases complete
- Create PRs, close issues, and cut releases at phase boundaries

## License

[Apache 2.0](LICENSE)
