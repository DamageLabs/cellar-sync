# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-02-09

### Added

- Monorepo structure with npm workspaces (`packages/shared`, `apps/api`, `apps/web`)
- SQLite database with Drizzle ORM, WAL mode, and FTS5 full-text search
- Database schema: users, wines, bottles, tasting notes, storage locations, refresh tokens
- Database migration and seed scripts with sample data (2 users, 5 locations, ~50 wines, ~130 bottles, ~30 tasting notes)
- Fastify 5 API server with Zod type provider and structured error handling
- `GET /api/health` endpoint
- JWT authentication with access (15min) and refresh (7d) token rotation
- `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout` endpoints
- Refresh token reuse detection for security
- `requireAuth` and `requireAdmin` middleware
- Shared Zod schemas and TypeScript types consumed across packages
- Shared constants (wine colors, bottle sizes, bottle statuses, user roles)
- Vite 6 + React 19 frontend placeholder with API proxy configuration
- GitHub Actions CI pipeline (lint, typecheck, unit tests, functional tests)
- Vitest configuration with unit and functional test projects
- ESLint 9 flat config with typescript-eslint and Prettier integration
- `.env.example` with documented environment variables
- Local development workflow with `npm run dev` (concurrent API + web servers)

[Unreleased]: https://github.com/DamageLabs/example-app-claude/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/DamageLabs/example-app-claude/releases/tag/v0.1.0
