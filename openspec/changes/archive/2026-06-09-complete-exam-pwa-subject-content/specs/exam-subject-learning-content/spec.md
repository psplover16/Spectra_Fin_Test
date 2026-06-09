## ADDED Requirements

### Requirement: Complete five-subject learning content

The system SHALL provide complete learning content for all five subject routes: Computer Principles, Networking, Information Management, Programming, and Language.

#### Scenario: all subject routes are complete

- **WHEN** a learner opens each subject route after this change is implemented
- **THEN** each route SHALL display completed learning content instead of an empty page, skeleton-only page, summary-only page, or pending-content state

##### Example: required subject coverage

| Subject | Route | Completion Stage |
| ----- | ----- | ----- |
| Computer Principles | `/computer-principles` | stage 1 |
| Networking | `/networking` | stage 1 |
| Information Management | `/information-management` | stage 2 |
| Programming | `/programming` | stage 2 |
| Language | `/language` | stage 3 |

### Requirement: Source order for content completion

The content completion workflow SHALL follow the declared source order: first the Computer Principles and Networking PDFs, then the Information Management and Programming source files, then the Language source files.

#### Scenario: stage order is preserved

- **WHEN** the implementation processes learning content sources
- **THEN** it SHALL complete `_private/計算機原理、網路概論/` before `@/_private/資訊管理、程式設計/`, and complete `@/_private/資訊管理、程式設計/` before `@/_private/國文、英文/`

### Requirement: Parallel subagent synthesis

The content completion workflow SHALL create at least one subagent work item per source file and at least one consolidation work item per subject to process source material by subject, source file, year, question type, exam point, or chapter.

#### Scenario: subagent outputs are merged

- **WHEN** source material has been processed
- **THEN** the final subject content SHALL be merged from subagent outputs that include summaries, exam points, key points, question-to-topic mappings, and learning content

### Requirement: Subject content structure

Each completed subject route SHALL include a subject overview, high-frequency exam points, yearly source index, thematic lecture content, review checklist, mistake-prone concepts, and mappings between source questions, exam points, and key points.

#### Scenario: learner reviews one subject

- **WHEN** a learner opens any completed subject route
- **THEN** the route SHALL expose all required content sections for that subject

### Requirement: Source traceability

Each completed subject content item SHALL preserve enough source context to trace the item back to its source folder and source file.

#### Scenario: reviewer checks a learning item source

- **WHEN** a reviewer inspects a learning item, exam point, or yearly source entry
- **THEN** the item SHALL identify the source folder and source file used to produce it
