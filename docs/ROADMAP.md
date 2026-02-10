# CellarSync Roadmap

## Wine Collection Inventory Management System

**Generated from:** [GitHub Issues](https://github.com/DamageLabs/cellar-sync/issues) derived from [PRD](./PRD.md)
**Last updated:** 2026-02-10

---

## Overview

This roadmap maps 28 GitHub issues across 4 phases, with explicit dependency chains, parallel workstreams, and delivery milestones. Total estimated timeline: **8 weeks**.

```
Phase 1          Phase 2              Phase 3               Phase 4
Foundation       Core Inventory       Tasting & Analytics    Polish & Deploy
Weeks 1–2        Weeks 3–4            Weeks 5–6              Weeks 7–8
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 #30 Scaffold     #36 Wine API         #44 Tasting API        #51 E2E Tests
 #31 Database     #37 Bottle API       #45 Dashboard API      #52 GCP VM
 #33 Auth         #38 Storage API      #46 Export API         #53 Deploy Pipeline
 #32 API Base     #39 Search           #47 Auth UI            #54 Backups
 #34 CI Pipeline  #40 Wine UI          #48 Tasting UI         #55 Security
 #35 Dev Workflow #41 Bottle UI        #49 Dashboard UI       #56 Admin UI
                  #42 Storage UI       #50 Phase 3 Tests      #57 Responsive QA
                  #43 Phase 2 Tests
```

---

## Dependency Graph

Issues are linked by technical dependencies. An issue cannot start until its dependencies are complete.

```
#30 Scaffold monorepo
 ├──▶ #31 SQLite + Drizzle ORM
 │     ├──▶ #36 Wine CRUD API ──────▶ #37 Bottle API ──────▶ #44 Tasting Notes API
 │     │     │                        │                      │
 │     │     ├──▶ #39 Search          ├──▶ #38 Storage API   ├──▶ #45 Dashboard API
 │     │     │                        │                      │
 │     │     └──▶ #40 Wine UI         ├──▶ #41 Bottle UI     ├──▶ #48 Tasting UI
 │     │          │                   │    │                  │
 │     │          │                   │    └──▶ #42 Stor. UI  ├──▶ #49 Dashboard UI
 │     │          │                   │                       │
 │     │          └───────────────────┴───────────────────────┴──▶ #43 P2 Tests
 │     │                                                          #50 P3 Tests
 │     │
 │     └──▶ #54 Backup System
 │
 ├──▶ #32 API Skeleton
 │     └──▶ #33 JWT Auth ──▶ #47 Auth UI (frontend)
 │                    │
 │                    └──▶ #46 Data Export
 │                    └──▶ #55 Security Hardening
 │                    └──▶ #56 Admin User Mgmt UI
 │
 ├──▶ #34 CI Pipeline ──▶ #51 E2E Tests (Playwright)
 │
 └──▶ #35 Dev Workflow

#52 GCP VM ──▶ #53 Deploy Pipeline
              └──▶ #54 Backup System

#51 E2E Tests ─┐
#55 Security ──┤
#56 Admin UI ──┼──▶ #57 Responsive QA (final)
#49 Dashboard ─┘
```

---

## Phase 1: Foundation (Weeks 1–2)

**Milestone:** [Phase 1: Foundation](https://github.com/DamageLabs/cellar-sync/milestone/1)
**Goal:** A developer can clone the repo, run `npm install && npm run dev`, log in, and hit the health endpoint.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1 | [#30](https://github.com/DamageLabs/cellar-sync/issues/30) | ~~Scaffold monorepo with npm workspaces~~ | High | setup, frontend, backend | None | **Done** |
| 2a | [#31](https://github.com/DamageLabs/cellar-sync/issues/31) | Set up SQLite database with Drizzle ORM | High | setup, database | #30 | Yes (with #32) |
| 2b | [#32](https://github.com/DamageLabs/cellar-sync/issues/32) | Create base API skeleton and health endpoint | High | setup, backend | #30 | Yes (with #31) |
| 3 | [#33](https://github.com/DamageLabs/cellar-sync/issues/33) | Implement JWT authentication system | High | feature, backend, security | #31, #32 | No |
| 4a | [#34](https://github.com/DamageLabs/cellar-sync/issues/34) | Set up GitHub Actions CI pipeline | High | setup, infra, testing | #30 | Yes (with #33) |
| 4b | [#35](https://github.com/DamageLabs/cellar-sync/issues/35) | Configure local development workflow | Medium | setup, infra | #31, #32 | Yes (with #34) |

### Execution Plan

```
Week 1:
  Day 1-2:  #30 Scaffold monorepo
  Day 3:    #31 SQLite/Drizzle  ║  #32 API skeleton     (parallel)
  Day 4-5:  #33 JWT auth

Week 2:
  Day 1-2:  #34 CI pipeline  ║  #35 Dev workflow        (parallel)
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

**Milestone:** [Phase 2: Core Inventory](https://github.com/DamageLabs/cellar-sync/milestone/2)
**Goal:** A user can log in, add wines and bottles, assign storage locations, search the collection, and mark bottles as consumed.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#36](https://github.com/DamageLabs/cellar-sync/issues/36) | Implement Wine CRUD API endpoints | High | feature, backend, database | Phase 1 | Yes (with #38) |
| 1b | [#38](https://github.com/DamageLabs/cellar-sync/issues/38) | Implement storage location management API | Medium | feature, backend, database | Phase 1 | Yes (with #36) |
| 2 | [#37](https://github.com/DamageLabs/cellar-sync/issues/37) | Implement Bottle inventory API endpoints | High | feature, backend, database | #36 | No |
| 3 | [#39](https://github.com/DamageLabs/cellar-sync/issues/39) | Implement full-text search and filtering | High | feature, backend, database | #36, #37 | No |
| 4a | [#40](https://github.com/DamageLabs/cellar-sync/issues/40) | Build Wine list and detail pages (frontend) | High | feature, frontend | #36, #39 | Yes (with #42) |
| 4b | [#42](https://github.com/DamageLabs/cellar-sync/issues/42) | Build storage location management UI | Medium | feature, frontend | #38 | Yes (with #40) |
| 5 | [#41](https://github.com/DamageLabs/cellar-sync/issues/41) | Build Bottle management UI | High | feature, frontend | #37, #40 | No |
| 6 | [#43](https://github.com/DamageLabs/cellar-sync/issues/43) | Write unit and functional tests for Phase 2 | High | testing | #36–#42 | No |

### Execution Plan

```
Week 3:
  Day 1-2:  #36 Wine API  ║  #38 Storage API          (parallel)
  Day 3:    #37 Bottle API
  Day 4:    #39 Search & filtering
  Day 5:    #40 Wine UI (start)  ║  #42 Storage UI    (parallel)

Week 4:
  Day 1-2:  #40 Wine UI (finish) ║ #42 Storage UI     (parallel)
  Day 3:    #41 Bottle UI
  Day 4-5:  #43 Phase 2 tests
```

### Backend / Frontend Parallelism

Once API endpoints are complete, frontend and backend work can happen in parallel if multiple developers are available:

```
Backend track:  #36 → #37 → #39 → (tests)
Frontend track: ──────────────── #40 → #41 → #42 → (tests)
                                  ▲ starts once #36 API is ready
```

### Exit Criteria
- [ ] Full wine and bottle CRUD working end-to-end
- [ ] Search returns results in < 300ms
- [ ] Storage locations can be created and assigned to bottles
- [ ] All Phase 2 unit and functional tests pass
- [ ] CI runs all tests green

---

## Phase 3: Tasting & Analytics (Weeks 5–6)

**Milestone:** [Phase 3: Tasting & Analytics](https://github.com/DamageLabs/cellar-sync/milestone/3)
**Goal:** A user can record tasting notes, view collection analytics, receive drink window alerts, and export their data.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#44](https://github.com/DamageLabs/cellar-sync/issues/44) | Implement Tasting Notes API endpoints | High | feature, backend, database | #37 | Yes (with #47) |
| 1b | [#47](https://github.com/DamageLabs/cellar-sync/issues/47) | Build login page and auth flow (frontend) | High | feature, frontend, security | #33 | Yes (with #44) |
| 2a | [#45](https://github.com/DamageLabs/cellar-sync/issues/45) | Implement Dashboard statistics API | High | feature, backend, database | #44 | Yes (with #48) |
| 2b | [#48](https://github.com/DamageLabs/cellar-sync/issues/48) | Build Tasting Notes UI | High | feature, frontend | #44, #47 | Yes (with #45) |
| 3a | [#46](https://github.com/DamageLabs/cellar-sync/issues/46) | Implement data export (CSV and JSON) | Medium | feature, backend | #33, #36, #37, #44 | Yes (with #49) |
| 3b | [#49](https://github.com/DamageLabs/cellar-sync/issues/49) | Build Dashboard with collection analytics | High | feature, frontend | #45, #47 | Yes (with #46) |
| 4 | [#50](https://github.com/DamageLabs/cellar-sync/issues/50) | Write unit and functional tests for Phase 3 | High | testing | #44–#49 | No |

### Execution Plan

```
Week 5:
  Day 1-2:  #44 Tasting API  ║  #47 Auth UI           (parallel)
  Day 3:    #45 Dashboard API ║  #48 Tasting UI        (parallel)
  Day 4-5:  #46 Export API    ║  #49 Dashboard UI      (parallel)

Week 6:
  Day 1-2:  #49 Dashboard UI (finish)
  Day 3-5:  #50 Phase 3 tests
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

**Milestone:** [Phase 4: Polish & Deploy](https://github.com/DamageLabs/cellar-sync/milestone/4)
**Goal:** Application is running in production on GCP, all tests pass in CI, backups are verified, and a non-technical user can be given an account and start cataloging wines.

| Order | Issue | Title | Priority | Labels | Dependencies | Parallel? |
|-------|-------|-------|----------|--------|-------------|-----------|
| 1a | [#51](https://github.com/DamageLabs/cellar-sync/issues/51) | Write end-to-end tests with Playwright | High | testing, frontend | Phases 1–3 | Yes (with #52, #55) |
| 1b | [#52](https://github.com/DamageLabs/cellar-sync/issues/52) | Provision and configure GCP VM | High | setup, infra | None (can start early) | Yes (with #51, #55) |
| 1c | [#55](https://github.com/DamageLabs/cellar-sync/issues/55) | Implement security hardening | High | security, backend | #33 | Yes (with #51, #52) |
| 2a | [#53](https://github.com/DamageLabs/cellar-sync/issues/53) | Set up production deployment pipeline | High | setup, infra | #52 | Yes (with #54, #56) |
| 2b | [#54](https://github.com/DamageLabs/cellar-sync/issues/54) | Implement automated SQLite backup system | High | feature, infra, database | #31, #52 | Yes (with #53, #56) |
| 2c | [#56](https://github.com/DamageLabs/cellar-sync/issues/56) | Build admin user management UI | Medium | feature, frontend | #33, #47 | Yes (with #53, #54) |
| 3 | [#57](https://github.com/DamageLabs/cellar-sync/issues/57) | Responsive design QA and polish | Medium | feature, frontend | All UI issues | Last |

### Execution Plan

```
Week 7:
  Day 1-3:  #51 E2E tests  ║  #52 GCP VM  ║  #55 Security  (parallel)
  Day 4-5:  #53 Deploy      ║  #54 Backups ║  #56 Admin UI  (parallel)

Week 8:
  Day 1-2:  Finish #53, #54, #56
  Day 3-4:  #57 Responsive QA
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
#30 → #31 → #36 → #37 → #44 → #45 → #49 → #51 → #57
Scaffold  DB   Wine  Bottle Tasting Dashboard DashUI  E2E   QA
         API   API    API    API     UI      Tests
```

This chain spans all 4 phases and represents the core flow: you cannot build the dashboard until you have tasting data, which requires bottles, which require wines, which require a database.

### Parallelism Opportunities

At peak, up to 3 issues can be worked simultaneously:

- **Phase 1:** #31 + #32 (database + API skeleton)
- **Phase 2:** #36 + #38 (wine API + storage API), then #40 + #42 (wine UI + storage UI)
- **Phase 3:** #44 + #47 (tasting API + auth UI), then #45 + #48, then #46 + #49
- **Phase 4:** #51 + #52 + #55 (E2E + GCP + security), then #53 + #54 + #56

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
