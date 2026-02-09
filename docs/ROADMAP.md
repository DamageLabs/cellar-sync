# CellarSync Roadmap

## Wine Collection Inventory Management System

**Generated from:** [GitHub Issues](https://github.com/DamageLabs/example-app-claude/issues) derived from [PRD](./PRD.md)
**Last updated:** 2026-02-09

---

## Overview

This roadmap maps 28 GitHub issues across 4 phases, with explicit dependency chains, parallel workstreams, and delivery milestones. Total estimated timeline: **8 weeks**.

```
Phase 1          Phase 2              Phase 3               Phase 4
Foundation       Core Inventory       Tasting & Analytics    Polish & Deploy
Weeks 1–2        Weeks 3–4            Weeks 5–6              Weeks 7–8
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 #1 Scaffold      #7 Wine API          #12 Tasting API        #22 E2E Tests
 #2 Database      #8 Bottle API        #15 Dashboard API      #23 GCP VM
 #3 Auth          #9 Storage API       #16 Export API         #24 Deploy Pipeline
 #4 API Base      #10 Search           #18 Tasting UI         #25 Backups
 #5 CI Pipeline   #11 Wine UI          #19 Dashboard UI       #26 Security
 #6 Dev Workflow  #13 Bottle UI        #20 Auth UI            #27 Admin UI
                  #14 Storage UI       #21 Phase 3 Tests      #28 Responsive QA
                  #17 Phase 2 Tests
```

---

## Dependency Graph

Issues are linked by technical dependencies. An issue cannot start until its dependencies are complete.

```
#1 Scaffold monorepo
 ├──▶ #2 SQLite + Drizzle ORM
 │     ├──▶ #7 Wine CRUD API ──────▶ #8 Bottle API ──────▶ #12 Tasting Notes API
 │     │     │                        │                      │
 │     │     ├──▶ #10 Search          ├──▶ #9 Storage API    ├──▶ #15 Dashboard API
 │     │     │                        │                      │
 │     │     └──▶ #11 Wine UI         ├──▶ #13 Bottle UI     ├──▶ #18 Tasting UI
 │     │          │                   │    │                  │
 │     │          │                   │    └──▶ #14 Stor. UI  ├──▶ #19 Dashboard UI
 │     │          │                   │                       │
 │     │          └───────────────────┴───────────────────────┴──▶ #17 P2 Tests
 │     │                                                          #21 P3 Tests
 │     │
 │     └──▶ #25 Backup System
 │
 ├──▶ #4 API Skeleton
 │     └──▶ #3 JWT Auth ──▶ #20 Auth UI (frontend)
 │                    │
 │                    └──▶ #16 Data Export
 │                    └──▶ #26 Security Hardening
 │                    └──▶ #27 Admin User Mgmt UI
 │
 ├──▶ #5 CI Pipeline ──▶ #22 E2E Tests (Playwright)
 │
 └──▶ #6 Dev Workflow

#23 GCP VM ──▶ #24 Deploy Pipeline
              └──▶ #25 Backup System

#22 E2E Tests ─┐
#26 Security ──┤
#27 Admin UI ──┼──▶ #28 Responsive QA (final)
#19 Dashboard ─┘
```

---

## Phase 1: Foundation (Weeks 1–2)

**Milestone:** [Phase 1: Foundation](https://github.com/DamageLabs/example-app-claude/milestone/1)
**Goal:** A developer can clone the repo, run `npm install && npm run dev`, log in, and hit the health endpoint.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1 | [#1](https://github.com/DamageLabs/example-app-claude/issues/1) | Scaffold monorepo with npm workspaces | High | setup, frontend, backend | None | Start here |
| 2a | [#2](https://github.com/DamageLabs/example-app-claude/issues/2) | Set up SQLite database with Drizzle ORM | High | setup, database | #1 | Yes (with #4) |
| 2b | [#4](https://github.com/DamageLabs/example-app-claude/issues/4) | Create base API skeleton and health endpoint | High | setup, backend | #1 | Yes (with #2) |
| 3 | [#3](https://github.com/DamageLabs/example-app-claude/issues/3) | Implement JWT authentication system | High | feature, backend, security | #2, #4 | No |
| 4a | [#5](https://github.com/DamageLabs/example-app-claude/issues/5) | Set up GitHub Actions CI pipeline | High | setup, infra, testing | #1 | Yes (with #3) |
| 4b | [#6](https://github.com/DamageLabs/example-app-claude/issues/6) | Configure local development workflow | Medium | setup, infra | #2, #4 | Yes (with #5) |

### Execution Plan

```
Week 1:
  Day 1-2:  #1 Scaffold monorepo
  Day 3:    #2 SQLite/Drizzle  ║  #4 API skeleton     (parallel)
  Day 4-5:  #3 JWT auth

Week 2:
  Day 1-2:  #5 CI pipeline  ║  #6 Dev workflow        (parallel)
  Day 3-5:  Buffer / polish / fix CI issues
```

### Exit Criteria
- [ ] `npm install && npm run dev` works from fresh clone
- [ ] Health endpoint returns 200
- [ ] Login endpoint returns JWT tokens
- [ ] CI pipeline runs lint + typecheck on PR
- [ ] Seed data populates dev database

---

## Phase 2: Core Inventory (Weeks 3–4)

**Milestone:** [Phase 2: Core Inventory](https://github.com/DamageLabs/example-app-claude/milestone/2)
**Goal:** A user can log in, add wines and bottles, assign storage locations, search the collection, and mark bottles as consumed.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#7](https://github.com/DamageLabs/example-app-claude/issues/7) | Implement Wine CRUD API endpoints | High | feature, backend, database | Phase 1 | Yes (with #9) |
| 1b | [#9](https://github.com/DamageLabs/example-app-claude/issues/9) | Implement storage location management API | Medium | feature, backend, database | Phase 1 | Yes (with #7) |
| 2 | [#8](https://github.com/DamageLabs/example-app-claude/issues/8) | Implement Bottle inventory API endpoints | High | feature, backend, database | #7 | No |
| 3 | [#10](https://github.com/DamageLabs/example-app-claude/issues/10) | Implement full-text search and filtering | High | feature, backend, database | #7, #8 | No |
| 4a | [#11](https://github.com/DamageLabs/example-app-claude/issues/11) | Build Wine list and detail pages (frontend) | High | feature, frontend | #7, #10 | Yes (with #14) |
| 4b | [#14](https://github.com/DamageLabs/example-app-claude/issues/14) | Build storage location management UI | Medium | feature, frontend | #9 | Yes (with #11) |
| 5 | [#13](https://github.com/DamageLabs/example-app-claude/issues/13) | Build Bottle management UI | High | feature, frontend | #8, #11 | No |
| 6 | [#17](https://github.com/DamageLabs/example-app-claude/issues/17) | Write unit and functional tests for Phase 2 | High | testing | #7–#14 | No |

### Execution Plan

```
Week 3:
  Day 1-2:  #7 Wine API  ║  #9 Storage API          (parallel)
  Day 3:    #8 Bottle API
  Day 4:    #10 Search & filtering
  Day 5:    #11 Wine UI (start)  ║  #14 Storage UI    (parallel)

Week 4:
  Day 1-2:  #11 Wine UI (finish) ║ #14 Storage UI     (parallel)
  Day 3:    #13 Bottle UI
  Day 4-5:  #17 Phase 2 tests
```

### Backend ↔ Frontend Parallelism

Once API endpoints are complete, frontend and backend work can happen in parallel if multiple developers are available:

```
Backend track:  #7 → #8 → #10 → (tests)
Frontend track: ──────────────── #11 → #13 → #14 → (tests)
                                  ▲ starts once #7 API is ready
```

### Exit Criteria
- [ ] Full wine and bottle CRUD working end-to-end
- [ ] Search returns results in < 300ms
- [ ] Storage locations can be created and assigned to bottles
- [ ] All Phase 2 unit and functional tests pass
- [ ] CI runs all tests green

---

## Phase 3: Tasting & Analytics (Weeks 5–6)

**Milestone:** [Phase 3: Tasting & Analytics](https://github.com/DamageLabs/example-app-claude/milestone/3)
**Goal:** A user can record tasting notes, view collection analytics, receive drink window alerts, and export their data.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#12](https://github.com/DamageLabs/example-app-claude/issues/12) | Implement Tasting Notes API endpoints | High | feature, backend, database | #8 | Yes (with #20) |
| 1b | [#20](https://github.com/DamageLabs/example-app-claude/issues/20) | Build login page and auth flow (frontend) | High | feature, frontend, security | #3 | Yes (with #12) |
| 2a | [#15](https://github.com/DamageLabs/example-app-claude/issues/15) | Implement Dashboard statistics API | High | feature, backend, database | #12 | Yes (with #18) |
| 2b | [#18](https://github.com/DamageLabs/example-app-claude/issues/18) | Build Tasting Notes UI | High | feature, frontend | #12, #20 | Yes (with #15) |
| 3a | [#16](https://github.com/DamageLabs/example-app-claude/issues/16) | Implement data export (CSV and JSON) | Medium | feature, backend | #3, #7, #8, #12 | Yes (with #19) |
| 3b | [#19](https://github.com/DamageLabs/example-app-claude/issues/19) | Build Dashboard with collection analytics | High | feature, frontend | #15, #20 | Yes (with #16) |
| 4 | [#21](https://github.com/DamageLabs/example-app-claude/issues/21) | Write unit and functional tests for Phase 3 | High | testing | #12–#20 | No |

### Execution Plan

```
Week 5:
  Day 1-2:  #12 Tasting API  ║  #20 Auth UI           (parallel)
  Day 3:    #15 Dashboard API ║  #18 Tasting UI        (parallel)
  Day 4-5:  #16 Export API    ║  #19 Dashboard UI      (parallel)

Week 6:
  Day 1-2:  #19 Dashboard UI (finish)
  Day 3-5:  #21 Phase 3 tests
```

### Exit Criteria
- [ ] Tasting notes can be added to consumed bottles
- [ ] Dashboard shows accurate collection statistics
- [ ] Drink window alerts display correctly
- [ ] CSV and JSON export download correctly
- [ ] Login/logout flow works end-to-end
- [ ] All Phase 3 unit and functional tests pass

---

## Phase 4: Polish & Deploy (Weeks 7–8)

**Milestone:** [Phase 4: Polish & Deploy](https://github.com/DamageLabs/example-app-claude/milestone/4)
**Goal:** Application is running in production on GCP, all tests pass in CI, backups are verified, and a non-technical user can be given an account and start cataloging wines.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#22](https://github.com/DamageLabs/example-app-claude/issues/22) | Write end-to-end tests with Playwright | High | testing, frontend | Phases 1–3 | Yes (with #23, #26) |
| 1b | [#23](https://github.com/DamageLabs/example-app-claude/issues/23) | Provision and configure GCP VM | High | setup, infra | None (can start early) | Yes (with #22, #26) |
| 1c | [#26](https://github.com/DamageLabs/example-app-claude/issues/26) | Implement security hardening | High | security, backend | #3 | Yes (with #22, #23) |
| 2a | [#24](https://github.com/DamageLabs/example-app-claude/issues/24) | Set up production deployment pipeline | High | setup, infra | #23 | Yes (with #25, #27) |
| 2b | [#25](https://github.com/DamageLabs/example-app-claude/issues/25) | Implement automated SQLite backup system | High | feature, infra, database | #2, #23 | Yes (with #24, #27) |
| 2c | [#27](https://github.com/DamageLabs/example-app-claude/issues/27) | Build admin user management UI | Medium | feature, frontend | #3, #20 | Yes (with #24, #25) |
| 3 | [#28](https://github.com/DamageLabs/example-app-claude/issues/28) | Responsive design QA and polish | Medium | feature, frontend | All UI issues | Last |

### Execution Plan

```
Week 7:
  Day 1-3:  #22 E2E tests  ║  #23 GCP VM  ║  #26 Security  (parallel)
  Day 4-5:  #24 Deploy      ║  #25 Backups ║  #27 Admin UI  (parallel)

Week 8:
  Day 1-2:  Finish #24, #25, #27
  Day 3-4:  #28 Responsive QA
  Day 5:    Final verification, first production deploy
```

### Exit Criteria
- [ ] All 15 E2E tests pass in CI
- [ ] Application deployed and running on GCP VM
- [ ] HTTPS working with valid certificate
- [ ] Daily backups running and verified
- [ ] Security headers and rate limiting active
- [ ] Admin can create user accounts
- [ ] UI works on mobile and desktop
- [ ] `npm audit` clean

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total issues** | 28 |
| **High priority** | 22 |
| **Medium priority** | 6 |
| **Backend issues** | 12 |
| **Frontend issues** | 12 |
| **Infrastructure issues** | 7 |
| **Testing issues** | 6 |
| **Security issues** | 5 |
| **Database issues** | 8 |

### Issues by Phase

| Phase | Issues | High | Medium |
|-------|--------|------|--------|
| Phase 1: Foundation | 6 | 5 | 1 |
| Phase 2: Core Inventory | 8 | 6 | 2 |
| Phase 3: Tasting & Analytics | 7 | 6 | 1 |
| Phase 4: Polish & Deploy | 7 | 5 | 2 |

### Critical Path

The longest dependency chain determines the minimum timeline:

```
#1 → #2 → #7 → #8 → #12 → #15 → #19 → #22 → #28
Scaffold  DB   Wine  Bottle Tasting Dashboard DashUI  E2E   QA
         API   API    API    API     UI      Tests
```

This chain spans all 4 phases and represents the core flow: you cannot build the dashboard until you have tasting data, which requires bottles, which require wines, which require a database.

### Parallelism Opportunities

At peak, up to 3 issues can be worked simultaneously:

- **Phase 1:** #2 + #4 (database + API skeleton)
- **Phase 2:** #7 + #9 (wine API + storage API), then #11 + #14 (wine UI + storage UI)
- **Phase 3:** #12 + #20 (tasting API + auth UI), then #15 + #18, then #16 + #19
- **Phase 4:** #22 + #23 + #26 (E2E + GCP + security), then #24 + #25 + #27

---

## Risk Checkpoints

At each phase boundary, evaluate:

| Checkpoint | Question | Action if No |
|------------|----------|-------------|
| End of Phase 1 | Can a developer clone, run, and log in? | Do not proceed — fix foundation |
| End of Phase 2 | Can a user manage their wine collection? | Defer Phase 3 nice-to-haves |
| End of Phase 3 | Are all core features working with tests? | Extend Phase 3, delay deploy |
| End of Phase 4 | Is production stable with backups verified? | Do not go live — fix issues |

---

*This roadmap is a living document. Update it as issues are completed, re-prioritized, or added.*
