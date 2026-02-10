# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-02-10

### Added

- npm workspaces monorepo with `@cellarsync/shared`, `@cellarsync/api`, and `@cellarsync/web` packages
- TypeScript project references with strict mode and `tsc --build` for incremental compilation
- ESLint v9 flat config with `typescript-eslint` projectService and Prettier integration
- Prettier configuration (semi, double quotes, trailing commas, 100 printWidth)
- `.env.example` with documented environment variables (DB path, JWT, CORS)
- ESM everywhere with Node 20+ engine requirement
- `data/` and `scripts/` scaffold directories
