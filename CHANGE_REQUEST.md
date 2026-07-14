# Change Request

- Change Request ID: `CR-20260714-01`
- Project: `520alsdud520-ops/520alsdud520-ops.github.io`
- Baseline branch: `main`
- Baseline commit visible in local history: `838cf78` (`Record deployment status`)
- Last known site-content commit: `082ca57` (`Build professional portfolio and snake game`)
- Last known deployment URL: <https://520alsdud520-ops.github.io/>
- Current overall status: `HITL_REQUIRED`

## Baseline and Current State

- Repository root inspected: `target-site`
- Current tracked files: `index.html`, `styles.css`, `script.js`, `game.js`, `AORR.md`, `MEMORY.md`, `README.md`
- No PDF, DOCX, PPT, PNG, JPG, WEBP, or SVG reference files were found in the workspace.
- Existing tests and execution records:
  - `node --check script.js` and `node --check game.js` previously passed.
  - Local static server checks previously returned HTTP 200 for `index.html`, `styles.css`, `script.js`, and `game.js`.
  - HTML scan, snake engine smoke test, and bootstrap smoke test previously passed.
  - GitHub Pages API previously reported `built`, but direct browser visibility of the live URL is still `[사람 확인 필요]` because the user reported that the page was not visible from their side.

## Original User Request

```text
웹페이지 디자인
- 디자인이 전반적으로 마음에 들지 않아 바꿔줘.
- 삼성 갤럭시의 OneUI 아이콘 형태로 전반적으로 수정해줘.
- View Projects, Open games등이 지금은 하나의 긴 스크롤 화면위에 있는 것처럼 느껴지는데, 스크롤을 하면서 바치 스마트폰 배경 화면의 다음 섹션으로 넘어가는 듯한 효과를 적용해줘.
- 맨 처음에 메인 페이지에서 스크롤을 내리다가, 일정 부분 이상에 도달하면 'ABOUT' 페이지로 넘어가는거지. 넘어가는 효과는 바치 스마트폰 배경화면의 2번째 섹션으로 넘어가는 듯한 모습을 취해줘.
- 그리고 Projects, games 등의 각 챕터 제목 왼쪽에 그에 어울리는 삼성 갤럭시 OneUI 아이콘 이미지를 삽입해줘. 삼성 갤럭시 OneUI 기본 아이콘 (시계, 캘린더, 게임 등)을 적절히 삽입해줘.

웹페이지 상단바
- 아이콘에 520이 적혀 있고 그 다음에 텍스트로 alsdud520-ops가 적혀있는데, 이 부분을 수정해줘.
- 아이콘에는 MX라고 적혀 있으면 좋겠어 그리고 그 옆에 520alsdud520-ops를 적어줘.
- 아랫부분에 적힌 Professional Portfolio는 그대로 두어줘.

웹페이지 최상단
- 제목 비어 있음 - Welcome to the personal website
- 제목 아래 본문 비어 있음 - This webpage is a personal website with a built-in snake game.

Profile
- 제목 비어 있음
- 제목 아래 본문 비어 있음 
- Name 비어 있음
- Role 비어 있음
- Location 비어 있음
- 아래의 <내 정보>를 보고, [사람 확인 필요] 라고 적힌 부분에 알맞게 채워줘.
<내 정보>
- 내 이름은 이민영이야. 내 역할은 앱 개발자이자, 프롬프팅 엔지니어야. 장소는 삼성전자 모바일 연구소에서 근무하고 있어.

About
- 제목 비어 있음
- 본문 비어 있음
- 아래의 <내 정보>를 보고, 내용을 알맞게 채워줘.
<내 정보>
- 나는 AI 영상처리에 관심이 있는 사람이고, 앱 개발을 하고 있으며, Creative Studio라는 앱 개발에 참여하고 있어.

Projects
- 제목 비어 있음
- 본문 비어 있음
- Project one, Project two 모두 비어 있음
- 아래의 <내 정보>를 보고, 내용을 알맞게 채워줘.
<내 정보>
- 내가 석사 과정일 때 참여했던 프로젝트를 알려줄게.
- 첫 번쨰 프로젝트는 암진단 네트워크 개발이고, 두 번째 프로젝트는 현미경 이미지 artifact 제거야.
- 암조직 이미지를 보고 암영역이 어디인지 검출하는 프로젝트이고,
- 현미경 이미지에 줄무늬 왜곡이 있는데 이걸 제거하는 프로젝트야.
- 내 설명을 듣고 어떤 프로젝트일지 상상해서 적당한 이미지도 Project 2개에 각각 삽입해줘.

Experience
- 비어 있음
- 아래의 <내 정보>를 보고, 내용을 알맞게 채워줘.
- 석사과정을 졸업했고, 현재 삼성전자 MX 사업부에서 주니어 개발자로 일하고 있어.

Games
- 게임 실행 시 하단 바 영역 때문에 게임 영역이 잘려서 안보임
- 게임 시작, 중단, 재시작 버튼이 게임 본문 영역과 거리가 멀어서 사용성이 안좋음.
- 시작, 재시작 버튼은 게임을 처음 시작할 때, Game over일 때 게임 본문에 보여야 함 (시작, 재시작 버튼은 이 상황에서만 필요하기 때문)
- Pause 버튼은 키보드의 P버튼을 누르는 것으로 대체
- Leader board를 만들어서 그동안의 게임 기록을 랭킹으로 기록하고 싶음

Contact
- Email에 주소 추가: 520alsdud520@gmail.com
- LinkedIn 항목은 삭제 필요
```

추가 자료:
```text
Games
- 게임 실행 시 하단 바 영역 때문에 게임 영역이 잘려서 안보임
```

## Reference Material Status

- No CV, PDF, document, or image reference files were found in the current repository or workspace.
- All personal details currently come from the user message above.
- Any content not explicitly confirmed by the user must stay as `[사람 확인 필요]`.

## Change Items

### CR-001
- User request: `디자인이 전반적으로 마음에 들지 않아 바꿔줘.`
- Summary: Rebuild the overall visual system into a Samsung OneUI-inspired, section-based portfolio experience.
- Classification: `UI_UX`, `RESPONSIVE`, `INFORMATION_ARCHITECTURE`
- Current behavior: The site uses a single long-scrolling portfolio layout with a warm generic visual style.
- Expected behavior: The site feels like moving through mobile wallpaper-like sections, with stronger visual separation between chapters and a OneUI-inspired aesthetic.
- Reproduction: Open the page and scroll from top to bottom; the current transition between sections feels continuous rather than panel-like.
- Evidence: Current `index.html` and `styles.css` use a standard stacked section layout.
- Target feature: Global layout, color system, spacing, section transitions, and chapter presentation.
- Expected files: `index.html`, `styles.css`, possibly `script.js` for scroll interaction.
- Allowed scope: Layout, typography, spacing, backgrounds, section framing, and icon presentation.
- Forbidden scope: Backend, auth, data collection, framework changes, and removal of confirmed content.
- Prerequisites: Baseline inspection complete.
- Follow-up: Chapter icon insertion and content updates should align with the new visual system.
- Dependencies: CR-002, CR-003, CR-004, CR-005, CR-006, CR-007, CR-008, CR-009.
- Completion criteria: The page feels like a sequence of distinct sections on mobile and desktop, without broken navigation or horizontal overflow.
- Verification: Viewport checks at mobile, tablet, and desktop sizes; scroll behavior check; no horizontal scroll.
- Regression tests: Header navigation, hero links, section anchors, Games entry, board visibility, and mobile menu.
- Risk: `HIGH`
- Deployment needed: `Yes`
- Human-check items: Exact OneUI icon source/licensing and final aesthetic approval.

### CR-002
- User request: `삼성 갤럭시의 OneUI 아이콘 형태로 전반적으로 수정해줘.`
- Summary: Replace chapter markers and supporting visuals with OneUI-style iconography.
- Classification: `UI_UX`, `CONTENT`, `SPEC_CHANGE`
- Current behavior: Sections use text-only labels and generic UI decorations.
- Expected behavior: Chapter titles and key UI surfaces have Samsung OneUI-like icon treatment.
- Reproduction: Inspect chapter headings; there are no section-leading icons.
- Evidence: Current `index.html` renders plain text headings only.
- Target feature: Chapter iconography for Home/About/Projects/Games/Contact and any supporting badges.
- Expected files: `index.html`, `styles.css`, possibly new static assets under `assets/`.
- Allowed scope: SVG icons, inline icon markup, section title decoration, and visual alignment.
- Forbidden scope: External APIs, framework introduction, or deleting existing copy.
- Prerequisites: CR-001.
- Follow-up: Header branding update and chapter-specific icon placement.
- Dependencies: CR-001, CR-003.
- Completion criteria: Each major chapter has a clear icon treatment that reads consistently across breakpoints.
- Verification: Visual inspection at mobile/tablet/desktop sizes.
- Regression tests: All section links, mobile nav, and content readability.
- Risk: `MEDIUM`
- Deployment needed: `Yes`
- Human-check items: If exact Samsung assets are required, asset source approval is needed.

### CR-003
- User request: `아이콘에는 MX라고 적혀 있으면 좋겠어 그리고 그 옆에 520alsdud520-ops를 적어줘.`
- Summary: Update the header brand badge and adjacent text.
- Classification: `UI_UX`, `CONTENT`
- Current behavior: The brand badge shows `520` and the adjacent text reads `alsdud520-ops`.
- Expected behavior: The badge shows `MX`, and the adjacent text is `520alsdud520-ops`; the lower line `Professional Portfolio` remains unchanged.
- Reproduction: Load the top bar and inspect the brand area.
- Evidence: Current `index.html` header markup.
- Target feature: Header brand block.
- Expected files: `index.html`, `styles.css`.
- Allowed scope: Header text, badge text, sizing, and alignment.
- Forbidden scope: Any content outside the brand block unless required for spacing.
- Prerequisites: None.
- Follow-up: Should visually fit within the redesign from CR-001.
- Dependencies: CR-001.
- Completion criteria: The header displays `MX` + `520alsdud520-ops` and still preserves `Professional Portfolio`.
- Verification: Manual visual check and HTML text check.
- Regression tests: Header navigation and mobile header collapse.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None beyond normal visual approval.

### CR-004
- User request: `제목 비어 있음 - Welcome to the personal website` and `제목 아래 본문 비어 있음 - This webpage is a personal website with a built-in snake game.`
- Summary: Fill the hero title and intro copy with the provided English text.
- Classification: `CONTENT`
- Current behavior: The hero text uses generic placeholder copy.
- Expected behavior: The top section shows the exact requested title and supporting sentence.
- Reproduction: Open the home section.
- Evidence: Current `index.html` hero copy does not match the requested wording.
- Target feature: Hero title and intro paragraph.
- Expected files: `index.html`.
- Allowed scope: Hero copy only.
- Forbidden scope: Changing other sections unless needed for layout alignment.
- Prerequisites: None.
- Follow-up: Profile and about content should be consistent with the new introduction.
- Dependencies: CR-001.
- Completion criteria: The exact requested copy appears in the top section.
- Verification: DOM text check and visual review.
- Regression tests: Hero buttons, navigation, and spacing.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None.

### CR-005
- User request: Profile section details for name, role, and location.
- Summary: Replace profile placeholders with the user's confirmed personal information.
- Classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`
- Current behavior: Profile fields contain `[사람 확인 필요]`.
- Expected behavior: Name, role, and location are filled with the provided details.
- Reproduction: Open the hero/profile panel.
- Evidence: Current `index.html` profile panel contains placeholders.
- Target feature: Profile panel and summary facts.
- Expected files: `index.html`.
- Allowed scope: Profile name, role, location, and short supporting summary.
- Forbidden scope: Inventing any additional personal history.
- Prerequisites: None.
- Follow-up: About and experience sections should match this profile tone.
- Dependencies: CR-001.
- Completion criteria: The profile block shows the provided name, role, and workplace without placeholder text in those fields.
- Verification: Visual review and text assertion.
- Regression tests: Hero layout, facts grid, and mobile stacking.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None, assuming the user-provided details are used exactly as given.

### CR-006
- User request: About section details on AI video processing, app development, and Creative Studio.
- Summary: Write the About section from the user-provided background.
- Classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`
- Current behavior: About is generic placeholder text.
- Expected behavior: About describes the user’s interest in AI video processing, app development work, and Creative Studio participation.
- Reproduction: Open the About section.
- Evidence: Current `index.html` about copy is placeholder-based.
- Target feature: About heading and body copy.
- Expected files: `index.html`.
- Allowed scope: About text only.
- Forbidden scope: Adding unverified claims or unrelated achievements.
- Prerequisites: CR-005.
- Follow-up: Projects section should reflect the same professional tone.
- Dependencies: CR-001, CR-005.
- Completion criteria: The About section contains the requested background and no placeholder text.
- Verification: Visual and textual inspection.
- Regression tests: Section anchors and layout spacing.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None.

### CR-007
- User request: Projects section details for cancer diagnosis network and microscopy artifact removal, plus suitable images.
- Summary: Populate the Projects section with the two requested project descriptions and add representative imagery.
- Classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`, `UI_UX`
- Current behavior: Project cards are placeholders without meaningful project narratives or images.
- Expected behavior: Two project cards describe the requested projects and each shows a fitting image or illustration.
- Reproduction: Open the Projects section.
- Evidence: Current project cards show placeholder text.
- Target feature: Project cards, descriptions, and supporting visuals.
- Expected files: `index.html`, `styles.css`, and possibly new static assets under `assets/`.
- Allowed scope: Project text, card structure, and locally created static illustrations.
- Forbidden scope: Inventing project facts beyond the user-provided descriptions.
- Prerequisites: CR-001 and CR-006.
- Follow-up: Images should match the visual language from CR-001.
- Dependencies: CR-001, CR-006.
- Completion criteria: Two project entries exist, each with a specific title, short description, and a relevant image or illustration.
- Verification: Visual inspection, responsive layout check, and no broken image links.
- Regression tests: Project card layout, mobile stacking, and overall page height.
- Risk: `MEDIUM`
- Deployment needed: `Yes`
- Human-check items: If a real image source is preferred over generated or illustrated assets, approval is needed.

### CR-008
- User request: Experience section details on completing a master’s degree and working as a junior developer in Samsung MX.
- Summary: Replace the Experience placeholders with the requested career summary.
- Classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`
- Current behavior: Experience content is still placeholder-based.
- Expected behavior: The section states the completed master’s degree and current Samsung MX junior developer role.
- Reproduction: Open the Experience section.
- Evidence: Current `index.html` experience area contains generic placeholder entries.
- Target feature: Experience section copy and timeline items.
- Expected files: `index.html`.
- Allowed scope: Experience text only.
- Forbidden scope: Adding unsupported employment details.
- Prerequisites: CR-005.
- Follow-up: Should remain concise and consistent with the rest of the portfolio tone.
- Dependencies: CR-001, CR-005.
- Completion criteria: The section accurately reflects the user-provided experience summary.
- Verification: Visual and textual inspection.
- Regression tests: Experience layout and section anchors.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None.

### CR-009
- User request: Games section usability and leaderboard improvements, plus the bottom bar clipping issue.
- Summary: Rework the game section so controls appear only when relevant, add a keyboard `P` pause shortcut, add leaderboard support, and ensure the board is not clipped.
- Classification: `GAME_CONTROL`, `GAME_STATE`, `NEW_FEATURE`, `RESPONSIVE`
- Current behavior: Start/Pause/Restart controls are separate from the game body, pause uses a button, and the section can feel cramped relative to the viewport.
- Expected behavior: Start and Restart appear inside the game body only when the game is idle or over, Pause is handled by the `P` key, a leaderboard tracks prior runs, and the board stays fully visible above the bottom area.
- Reproduction: Open the Games section and start a game on a smaller viewport.
- Evidence: Current `index.html`, `script.js`, and `styles.css` already show a playable snake game but not the requested control behavior.
- Target feature: Games section layout, game state display rules, pause shortcut, leaderboard, and viewport-safe game board sizing.
- Expected files: `index.html`, `styles.css`, `script.js`, `game.js`.
- Allowed scope: Game UI placement, keyboard shortcut handling, leaderboard persistence, and responsive board sizing.
- Forbidden scope: Removing existing game behavior just to simplify the implementation.
- Prerequisites: CR-001.
- Follow-up: Must be verified on desktop and mobile sizes.
- Dependencies: CR-001, CR-002.
- Completion criteria: The game starts, pauses via `P`, restarts from the game body when appropriate, maintains a leaderboard, and the board is fully visible on supported viewports.
- Verification: Keyboard test, mobile test, state transition check, leaderboard persistence check, and viewport check.
- Regression tests: Existing arrow/WASD/touch controls, score updates, game over state, and repeat opening of the Games tab.
- Risk: `HIGH`
- Deployment needed: `Yes`
- Human-check items: Leaderboard policy and any desired ranking rules if not fully specified.

### CR-010
- User request: `Email에 주소 추가: 520alsdud520@gmail.com` and `LinkedIn 항목은 삭제 필요`
- Summary: Update the Contact section with the email address and remove the LinkedIn line.
- Classification: `CONTENT`, `DOCUMENT_BASED_CONTENT`
- Current behavior: Email is still a placeholder and LinkedIn is still present.
- Expected behavior: The contact section shows the provided email and no LinkedIn entry.
- Reproduction: Open the Contact section.
- Evidence: Current `index.html` contact block.
- Target feature: Contact block.
- Expected files: `index.html`.
- Allowed scope: Contact text only.
- Forbidden scope: Adding any unrequested contact methods.
- Prerequisites: None.
- Follow-up: Should remain consistent with the rest of the professional profile.
- Dependencies: CR-001.
- Completion criteria: The email is present and LinkedIn is removed.
- Verification: Visual/text inspection.
- Regression tests: Footer and section anchor links.
- Risk: `LOW`
- Deployment needed: `Yes`
- Human-check items: None.

## Execution Order

1. CR-001 baseline capture and visual-system redesign planning
2. CR-002 OneUI-style icon treatment
3. CR-003 header brand update
4. CR-004 hero copy update
5. CR-005 profile content fill
6. CR-006 about content fill
7. CR-007 projects content and imagery
8. CR-008 experience content fill
9. CR-009 games UX and leaderboard improvements
10. CR-010 contact update
11. Final regression and deployment verification after implementation

## Current Loop State

- Current state: `CHANGE_PLANNED`
- Next Step 9 loop ID: `L-001`
- Rollback criteria:
  - Any new broken anchor or console error
  - Any requirement for unapproved external services or assets
  - Any repeated deployment visibility mismatch
- Human-check items:
  - Exact OneUI asset/source choice
  - Whether the user wants literal Samsung-branded icons or OneUI-inspired equivalents
  - Final approval of project imagery style

## Execution Snapshot

- Overall implementation status: `HITL_REQUIRED`
- Verification summary:
  - `node --check script.js`: passed
  - `node --check game.js`: passed
  - Local self-fetch HTTP checks for `/`, `/index.html`, `/styles.css`, `/script.js`, `/game.js`, and SVG assets: passed
  - Snake engine smoke test: passed
  - Script bootstrap smoke test in a stub DOM: passed after fixing a real `loopState` reference bug
  - Browser-based local file and localhost viewing: blocked by browser URL policy in this environment

### Change Item Status

- `CR-001`: `HITL_REQUIRED`
- `CR-002`: `PASSED`
- `CR-003`: `PASSED`
- `CR-004`: `PASSED`
- `CR-005`: `PASSED`
- `CR-006`: `PASSED`
- `CR-007`: `PASSED`
- `CR-008`: `PASSED`
- `CR-009`: `HITL_REQUIRED`
- `CR-010`: `PASSED`

### Game Start Hotfix

- The Games Start and Restart controls now force a fresh game start and are handled through overlay delegation, so regenerated buttons remain active.
- Verified in the script smoke test that the game transitions to `running` after invoking the start flow.

### Files Updated In This Pass

- `index.html`
- `styles.css`
- `script.js`
- `CHANGE_REQUEST.md`
- `AORR.md`
- `MEMORY.md`
- `assets/icon-profile.svg`
- `assets/icon-about.svg`
- `assets/icon-projects.svg`
- `assets/icon-experience.svg`
- `assets/icon-games.svg`
- `assets/icon-contact.svg`
- `assets/project-cancer.svg`
- `assets/project-artifact.svg`

### Remaining Human-Check Items

- Browser-side visual approval of the OneUI-inspired redesign
- Mobile and desktop viewport confirmation in a real browser
- Final approval of the project image style
