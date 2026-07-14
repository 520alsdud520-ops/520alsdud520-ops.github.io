# MEMORY

This file tracks the current state and guardrails for the professional portfolio project.

## Goal

- Complete a GitHub Pages ready professional website
- Support responsive desktop and mobile layouts
- Implement a `Games` tab
- Implement a snake game controllable by keyboard and mobile touch
- Perform the first GitHub Pages deployment
- Reflect the Step 1 `[게임 추가 기능:]` requirement

## Required Deliverables

- Project root `index.html`
- `styles.css`
- `script.js`
- `game.js` if needed
- Required images and static assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- Static HTML, CSS, JavaScript
- Professional website content
- Responsive layout
- `Games` tab
- Snake game
- GitHub Pages deployment

## Out of Scope

- Backend server
- Database
- Login and signup
- Payments
- User data collection
- External APIs without approval
- Framework changes without approval

## Current State

- Current status: deployed to GitHub Pages
- Completed loops: repository inspection, `AORR.md` design, `Self-Correcting TDD Loop` design, base website implementation, snake engine implementation, bootstrap wiring, GitHub Pages push
- Next loop: post-deploy verification or content refinement
- Current retry count: 0
- Current error fingerprint: none
- Blocker: none
- Last known good state: GitHub Pages `built` state confirmed by API

## Guardrails

- Do not delete existing personal content without confirmation
- Do not invent unverified career or project information
- Do not delete or weaken tests
- Do not print tokens
- Do not store tokens in HTML, CSS, JavaScript
- Do not commit tokens to git
- Do not commit `github_token.txt`
- Do not commit `env_settings.txt`
- Do not add backend features
- Do not do large refactors
- Do not remove functionality just to satisfy tests

## Acceptance Criteria

- Root `index.html` exists
- Loads successfully from a local static server
- CSS and JavaScript load successfully
- No fatal console errors
- Layout works on mobile and desktop
- `Games` tab works
- Snake game works
- Keyboard controls work
- Mobile touch controls work
- Score and restart work
- GitHub Pages returns HTTP 200
- Deployed site behaves the same way

## Retry Policy

- Maximum 3 retries per error
- Stop if the same fingerprint repeats twice
- Fix only one root cause per retry
- Re-run the same verifier after each retry

## HITL Conditions

- Personal profile content is unclear
- Existing content must be removed
- Requirements conflict
- GitHub repository permissions are missing
- GitHub Pages settings must change
- External services must be added
- Retry limit is reached

## Tool Policy

- Codex handles work control, file edits, and tests
- Use Claude Code CLI as an independent verifier when possible
- Record the actual Claude model name if one is used
- Never store token values in logs or documents

## Execution Log Template

- Loop ID
- Start time
- Goal
- Start state
- Hypothesis
- Act
- Changed files
- Verifier
- Test result
- Exit code
- Error fingerprint
- Retry count
- End state
- Next action
- Human-check items

## Latest Loop Log

- Loop ID: `loop-001`
- Start time: `2026-07-14`
- Goal: build the safest first static website structure
- Start state: only repository docs and the base scaffold existed
- Hypothesis: a minimal HTML/CSS/JS shell plus `Games` section is the safest first loop
- Act: created `index.html`, `styles.css`, `game.js`, `script.js`
- Changed files: `index.html`, `styles.css`, `game.js`, `script.js`
- Verifier: `node --check`, `python -m http.server`, HTTP response checks, HTML scan, engine smoke tests, bootstrap smoke test
- Test result: `index.html`, `styles.css`, `script.js`, `game.js` all returned HTTP 200; HTML scan passed; game logic passed; bootstrap smoke passed
- Exit code: `0`
- Error fingerprint: none
- Retry count: `0`
- End state: `DEPLOY_APPROVAL_REQUIRED`
- Next action: ask the user for GitHub Pages deployment approval
- Human-check items: actual browser viewport visuals, final personal profile content, deployment approval

- Loop ID: `loop-003`
- Start time: `2026-07-14`
- Goal: push the completed portfolio site to the GitHub Pages repository and confirm deployment state
- Start state: local implementation complete and ready for publish
- Hypothesis: a direct Git push to `main` will trigger GitHub Pages deployment
- Act: committed the completed site and pushed `main` to the target repository
- Changed files: none in this loop; repository state moved from local commit to remote
- Verifier: GitHub Pages API lookup for `https://api.github.com/repos/520alsdud520-ops/520alsdud520-ops.github.io/pages`
- Test result: Pages status returned `built`, `html_url` reported as `https://520alsdud520-ops.github.io/`
- Exit code: `0`
- Error fingerprint: none
- Retry count: `0`
- End state: `DEPLOYED`
- Next action: post-deploy browser check or polish if needed
- Human-check items: direct browser HTTP check from this shell returned unavailable, final visual confirmation `[사람 확인 필요]`

## Change Request Intake

- New Change Request ID: `CR-20260714-01`
- Last normal site-content commit: `082ca57`
- Last recorded repository commit: `838cf78`
- Last known deployment URL: <https://520alsdud520-ops.github.io/>
- Current status: `HITL_REQUIRED`
- Current blocker: live browser visibility from this shell is not fully confirmed; the user reported the deployed page was not visible
- Next Step 9 loop ID: `L-001`
- Loop order:
  - `L-001` baseline capture and deployment visibility confirmation
  - `L-002` OneUI-inspired visual redesign and header/icon refresh
  - `L-003` hero, profile, about, experience, and contact content fill
  - `L-004` projects content and imagery
  - `L-005` games UX, pause shortcut, leaderboard, and board clipping fix
  - `L-006` final regression and deployment readiness
- Rollback criteria:
  - Any new broken anchor or console error
  - Any requirement for unapproved external services or assets
  - Any repeated deployment visibility mismatch
- Human-check items:
  - Exact OneUI asset/source choice
  - Whether the user wants literal Samsung-branded icons or OneUI-inspired equivalents
  - Final approval of project imagery style

## Change Execution Log

- Loop ID: `loop-004`
- Change Request ID: `CR-20260714-01`
- Change Item IDs: `CR-001` through `CR-010`
- Start state: `CHANGE_PLANNED`
- End state: `HITL_REQUIRED`
- Goal: implement the requested redesign, content fill, and Games improvements
- Hypothesis: the current codebase can absorb the requested changes without changing framework or backend shape
- Act:
  - Rebuilt the landing page to a OneUI-inspired, sectioned layout
  - Updated the header brand to `MX` + `520alsdud520-ops`
  - Filled the requested profile, About, Projects, Experience, and Contact content
  - Added local SVG icons and project illustrations
  - Reworked the Games section to use in-board Start/Restart controls, `P` pause, and a local leaderboard
  - Refined the snake game bootstrap and rendering path
- Changed files:
  - `index.html`
  - `styles.css`
  - `script.js`
  - `assets/icon-profile.svg`
  - `assets/icon-about.svg`
  - `assets/icon-projects.svg`
  - `assets/icon-experience.svg`
  - `assets/icon-games.svg`
  - `assets/icon-contact.svg`
  - `assets/project-cancer.svg`
  - `assets/project-artifact.svg`
  - `CHANGE_REQUEST.md`
  - `AORR.md`
  - `MEMORY.md`
- Verifier:
  - `node --check script.js`
  - `node --check game.js`
  - Node-based local HTTP self-fetch checks
  - Node-based game engine smoke test
  - Node-based script bootstrap smoke test with a stub DOM
- Test result:
  - Static assets returned HTTP 200 in the local self-fetch test
  - Snake engine smoke test passed
  - Script bootstrap smoke test passed after fixing a real `loopState` reference bug
  - Browser-based local visual checks were blocked by the browser URL policy in this environment
- Exit code: `0` for all successful verifier commands; one smoke-test retry was required to fix the `loopState` bug
- Error fingerprint: `JAVASCRIPT:ReferenceError: loopState is not defined`
- Retry count: `1`
- Current normal commit candidate: `838cf78` until a new commit is made
- Rollback criteria:
  - Any regression in navigation, section anchors, or game controls
  - Any broken static asset or missing file
  - Any repeated browser-visibility mismatch
  - Any new dependency or framework requirement
- Human-check items:
  - Real browser viewport verification
  - Final visual approval of the redesign
  - Final approval of project imagery style

- Loop ID: `loop-005`
- Change Request ID: `CR-20260714-01`
- Change Item IDs: `CR-009`
- Start state: `HITL_REQUIRED`
- End state: `PASSED` for the start/restart hotfix portion of `CR-009`
- Goal: make the Games Start and Restart buttons reliably begin a new game
- Hypothesis: using a single delegated handler and forcing a fresh game start will eliminate the non-starting button behavior
- Act:
  - Changed `startGame()` to always restart the snake game cleanly
  - Added delegated overlay button handling so regenerated buttons continue to work
- Changed files:
  - `script.js`
- Verifier:
  - `node --check script.js`
  - Node-based bootstrap and start-flow smoke test
- Test result:
  - Script syntax passed
  - Button-driven start flow now transitions to running state in the smoke test
- Exit code: `0`
- Error fingerprint: `JAVASCRIPT:Start button did not reliably transition the game to running`
- Retry count: `1`
- Current normal commit candidate: `838cf78` until a new commit is made
- Rollback criteria:
  - If future visual or gameplay checks reveal any regression in the snake game controls
- Human-check items:
  - Real browser confirmation of the Start/Restart behavior
